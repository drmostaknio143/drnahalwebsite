import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { galleryItems as staticGallery } from "@/lib/data/gallery";

export async function GET() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("gallery_items")
    .select("*")
    .order("order_index", { ascending: true });

  if (error || !data || data.length === 0) {
    const mapped = staticGallery.map((g, idx) => ({
      id: g.id,
      src: g.src,
      category: g.category,
      caption_en: g.caption.en,
      caption_bn: g.caption.bn,
      chamber_name_en: g.chamber?.en,
      chamber_name_bn: g.chamber?.bn,
      order_index: idx + 1,
      is_published: true,
    }));
    return NextResponse.json({ success: true, data: mapped, source: "fallback" });
  }

  return NextResponse.json({ success: true, data, source: "database" });
}

export async function POST(request: Request) {
  try {
    const supabase = createServerClient();
    const body = await request.json();

    const { data, error } = await supabase
      .from("gallery_items")
      .insert([body])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = createServerClient();
    const body = await request.json();
    const { id, ...updates } = body;

    const { data, error } = await supabase
      .from("gallery_items")
      .update(updates)
      .eq("id", id)
      .select();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = createServerClient();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing id" }, { status: 400 });
    }

    const { error } = await supabase
      .from("gallery_items")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
