import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { conditions as staticConditions } from "@/lib/data/conditions";

export async function GET() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("conditions")
    .select("*")
    .order("order_index", { ascending: true });

  if (error || !data || data.length === 0) {
    const mapped = staticConditions.map((c, idx) => ({
      id: `cond-${idx + 1}`,
      slug: c.slug,
      name_en: c.name.en,
      name_bn: c.name.bn,
      tier: c.tier,
      category_en: c.category.en,
      category_bn: c.category.bn,
      image_url: c.image,
      tags_en: c.tags?.en || [],
      tags_bn: c.tags?.bn || [],
      what_is_it_en: c.whatIsIt.en,
      what_is_it_bn: c.whatIsIt.bn,
      why_it_happens_en: c.whyItHappens.en,
      why_it_happens_bn: c.whyItHappens.bn,
      how_treated_en: c.howTreated.en,
      how_treated_bn: c.howTreated.bn,
      emergency_note_en: c.emergencyNote?.en,
      emergency_note_bn: c.emergencyNote?.bn,
      related_service_slug: c.relatedServiceSlug,
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
      .from("conditions")
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
      ? supabase.from("conditions").update(updates).eq("id", id)
      : supabase.from("conditions").update(updates).eq("slug", slug);

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
      ? supabase.from("conditions").delete().eq("id", id)
      : supabase.from("conditions").delete().eq("slug", slug);

    const { error } = await query;

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
