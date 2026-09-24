import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { reviews as staticReviews } from "@/lib/data/reviews";

export async function GET() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .order("order_index", { ascending: true });

  if (error || !data || data.length === 0) {
    const mapped = staticReviews.map((r, idx) => ({
      id: r.id,
      author_en: r.author,
      author_bn: r.author,
      city_en: "Dhaka",
      city_bn: "ঢাকা",
      text_en: r.text.en,
      text_bn: r.text.bn,
      stars: 5,
      treatment_en: "Consultation & Surgery",
      treatment_bn: "পরামর্শ ও সার্জারি",
      is_featured: true,
      order_index: idx + 1,
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
      .from("reviews")
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
      .from("reviews")
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
      return NextResponse.json({ success: false, error: "Missing review ID" }, { status: 400 });
    }

    const { error } = await supabase
      .from("reviews")
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
