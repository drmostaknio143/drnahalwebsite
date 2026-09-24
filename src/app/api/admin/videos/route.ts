import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { videos as staticVideos } from "@/lib/data/videos";

export async function GET() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("videos")
    .select("*")
    .order("order_index", { ascending: true });

  if (error) {
    const mapped = staticVideos.map((v, idx) => ({
      id: `vid-${idx + 1}`,
      video_code: v.id,
      url: v.url,
      youtube_id: v.youtubeId || "dQw4w9WgXcQ",
      category: v.category,
      title_en: v.title.en,
      title_bn: v.title.bn,
      tag_en: v.tag.en,
      tag_bn: v.tag.bn,
      description_en: v.description?.en || "",
      description_bn: v.description?.bn || "",
      is_featured: idx < 3,
      order_index: idx + 1,
    }));
    return NextResponse.json({ success: true, data: mapped, source: "fallback" });
  }

  return NextResponse.json({ success: true, data: data || [], source: "database" });
}


export async function POST(request: Request) {
  try {
    const supabase = createServerClient();
    const body = await request.json();

    const { data, error } = await supabase
      .from("videos")
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
    const { id, video_code, ...updates } = body;

    const query = id
      ? supabase.from("videos").update(updates).eq("id", id)
      : supabase.from("videos").update(updates).eq("video_code", video_code);

    const { data, error } = await query.select();

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
    const video_code = searchParams.get("video_code");

    if (!id && !video_code) {
      return NextResponse.json({ success: false, error: "Missing id or video_code" }, { status: 400 });
    }

    const query = id
      ? supabase.from("videos").delete().eq("id", id)
      : supabase.from("videos").delete().eq("video_code", video_code);

    const { error } = await query;

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
