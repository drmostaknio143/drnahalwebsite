import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import path from "path";
import fs from "fs";

// Allowed image MIME types
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "image/avif",
];

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "gallery";

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid file type. Please upload a valid image (JPEG, PNG, WebP, AVIF, SVG).",
        },
        { status: 400 }
      );
    }

    // Limit size to 10MB
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { success: false, error: "Image size exceeds 10MB limit." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Sanitize filename
    const originalName = file.name || "image.jpg";
    const extension = path.extname(originalName) || `.${file.type.split("/")[1] || "jpg"}`;
    const baseName = path
      .basename(originalName, extension)
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .substring(0, 50);
    const uniqueFilename = `${baseName}-${Date.now()}${extension.toLowerCase()}`;
    const storagePath = `${folder}/${uniqueFilename}`;

    // 1. Try uploading to Supabase Storage first
    try {
      const supabase = createServerClient();
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("gallery")
        .upload(storagePath, buffer, {
          contentType: file.type,
          upsert: true,
        });

      if (!uploadError && uploadData) {
        const { data: publicUrlData } = supabase.storage
          .from("gallery")
          .getPublicUrl(storagePath);

        return NextResponse.json({
          success: true,
          url: publicUrlData.publicUrl,
          filename: uniqueFilename,
          storage: "supabase",
          message: "Uploaded successfully to Supabase Storage",
        });
      } else if (uploadError) {
        console.warn("Supabase storage upload error, falling back to local:", uploadError.message);
      }
    } catch (sbErr: any) {
      console.warn("Supabase storage exception, falling back to local:", sbErr.message);
    }

    // 2. Fallback: Save to local public/uploads directory
    const targetDir = path.join(process.cwd(), "public", "uploads", folder);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const localFilePath = path.join(targetDir, uniqueFilename);
    fs.writeFileSync(localFilePath, buffer);

    const localUrl = `/uploads/${folder}/${uniqueFilename}`;

    return NextResponse.json({
      success: true,
      url: localUrl,
      filename: uniqueFilename,
      storage: "local",
      message: "Uploaded successfully to local storage",
    });
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to upload file" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const images: Array<{
      src: string;
      name: string;
      category?: string;
      source: "supabase" | "upload" | "system";
    }> = [];

    const seenUrls = new Set<string>();

    const addImage = (src: string, name: string, source: "supabase" | "upload" | "system", category?: string) => {
      if (src && !seenUrls.has(src)) {
        seenUrls.add(src);
        images.push({ src, name, source, category });
      }
    };

    // 1. Check Supabase Storage if bucket exists
    try {
      const supabase = createServerClient();
      const { data: storageFiles } = await supabase.storage.from("gallery").list("gallery", {
        limit: 100,
        sortBy: { column: "created_at", order: "desc" },
      });

      if (storageFiles && storageFiles.length > 0) {
        for (const file of storageFiles) {
          if (file.name && !file.name.startsWith(".")) {
            const { data } = supabase.storage.from("gallery").getPublicUrl(`gallery/${file.name}`);
            if (data?.publicUrl) {
              addImage(data.publicUrl, file.name, "supabase", "Uploaded");
            }
          }
        }
      }
    } catch (e) {
      // Storage bucket might not exist yet
    }

    // 2. Scan public/uploads/gallery
    try {
      const uploadDir = path.join(process.cwd(), "public", "uploads", "gallery");
      if (fs.existsSync(uploadDir)) {
        const files = fs.readdirSync(uploadDir);
        for (const f of files) {
          if (/\.(jpe?g|png|webp|avif|gif|svg)$/i.test(f)) {
            addImage(`/uploads/gallery/${f}`, f, "upload", "Uploaded");
          }
        }
      }
    } catch (e) {
      console.warn("Could not read upload directory:", e);
    }

    // 3. Scan existing items from database
    try {
      const supabase = createServerClient();
      const { data: dbItems } = await supabase
        .from("gallery_items")
        .select("src, caption_en, category")
        .order("order_index", { ascending: true });

      if (dbItems) {
        for (const item of dbItems) {
          if (item.src) {
            addImage(item.src, item.caption_en || path.basename(item.src), "system", item.category);
          }
        }
      }
    } catch (e) {
      console.warn("Could not fetch DB gallery items:", e);
    }

    // 4. Also scan default hero and services images in public/
    const defaultDirs = [
      { dir: path.join(process.cwd(), "public", "images", "hero"), prefix: "/images/hero", cat: "Chambers" },
      { dir: path.join(process.cwd(), "public", "images", "services"), prefix: "/images/services", cat: "Equipment" },
    ];

    for (const d of defaultDirs) {
      try {
        if (fs.existsSync(d.dir)) {
          const files = fs.readdirSync(d.dir);
          for (const f of files) {
            if (/\.(jpe?g|png|webp|avif)$/i.test(f)) {
              addImage(`${d.prefix}/${f}`, f, "system", d.cat);
            }
          }
        }
      } catch (e) {
        // ignore
      }
    }

    return NextResponse.json({ success: true, data: images });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to list media" },
      { status: 500 }
    );
  }
}
