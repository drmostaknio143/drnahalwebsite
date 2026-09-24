import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { faqs as staticFaqs } from "@/lib/data/faq";

export async function GET() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .order("order_index", { ascending: true });

  if (error) {
    const mapped = staticFaqs.map((f, idx) => ({
      id: `faq-${idx + 1}`,
      faq_code: f.id,
      category_en: f.category.en,
      category_bn: f.category.bn,
      question_en: f.question.en,
      question_bn: f.question.bn,
      answer_en: f.answer.en,
      answer_bn: f.answer.bn,
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
      .from("faqs")
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
    const { id, faq_code, ...updates } = body;

    const query = id
      ? supabase.from("faqs").update(updates).eq("id", id)
      : supabase.from("faqs").update(updates).eq("faq_code", faq_code);

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
    const faq_code = searchParams.get("faq_code");

    if (!id && !faq_code) {
      return NextResponse.json({ success: false, error: "Missing id or faq_code" }, { status: 400 });
    }

    const query = id
      ? supabase.from("faqs").delete().eq("id", id)
      : supabase.from("faqs").delete().eq("faq_code", faq_code);

    const { error } = await query;

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
