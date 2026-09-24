import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { services as staticServices } from "@/lib/data/services";

export async function GET() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("order_index", { ascending: true });

  if (error) {
    // Transform static services to DB format for consistent display
    const mapped = staticServices.map((s, idx) => ({
      id: `service-${idx + 1}`,
      slug: s.slug,
      name_en: s.name.en,
      name_bn: s.name.bn,
      short_en: s.short.en,
      short_bn: s.short.bn,
      image_url: s.image,
      stat_label_en: s.stat?.label.en,
      stat_label_bn: s.stat?.label.bn,
      stat_val_en: s.stat?.value.en,
      stat_val_bn: s.stat?.value.bn,
      tags_en: s.tags?.en || [],
      tags_bn: s.tags?.bn || [],
      intro_en: s.detail.intro.en,
      intro_bn: s.detail.intro.bn,
      who_label_en: s.detail.whoLabel.en,
      who_label_bn: s.detail.whoLabel.bn,
      who_en: s.detail.who.en,
      who_bn: s.detail.who.bn,
      how_label_en: s.detail.howLabel.en,
      how_label_bn: s.detail.howLabel.bn,
      how_en: s.detail.how.en,
      how_bn: s.detail.how.bn,
      steps: s.detail.steps || [],
      note_label_en: s.detail.noteLabel?.en,
      note_label_bn: s.detail.noteLabel?.bn,
      note_en: s.detail.note?.en,
      note_bn: s.detail.note?.bn,
      cta_en: s.detail.cta.en,
      cta_bn: s.detail.cta.bn,
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
      .from("services")
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
    const { id, slug, ...updates } = body;

    const query = id
      ? supabase.from("services").update(updates).eq("id", id)
      : supabase.from("services").update(updates).eq("slug", slug);

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
    const slug = searchParams.get("slug");

    if (!id && !slug) {
      return NextResponse.json({ success: false, error: "Missing id or slug" }, { status: 400 });
    }

    const query = id
      ? supabase.from("services").delete().eq("id", id)
      : supabase.from("services").delete().eq("slug", slug);

    const { error } = await query;

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
