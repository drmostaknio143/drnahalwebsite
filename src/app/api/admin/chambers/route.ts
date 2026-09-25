import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";
import { staticChambers } from "@/lib/data/live";

function revalidateChambers() {
  try {
    revalidatePath("/[lang]/chambers", "page");
    revalidatePath("/", "layout");
  } catch (e) {
    // ignore
  }
}

export async function GET() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("chambers")
    .select("*")
    .order("order_index", { ascending: true });

  if (error) {
    return NextResponse.json({ success: true, data: staticChambers, source: "fallback" });
  }

  return NextResponse.json({ success: true, data, source: "database" });
}

export async function POST(request: Request) {
  try {
    const supabase = createServerClient();
    const body = await request.json();

    const { data, error } = await supabase
      .from("chambers")
      .insert([body])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    revalidateChambers();
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
      ? supabase.from("chambers").update(updates).eq("id", id)
      : supabase.from("chambers").update(updates).eq("slug", slug);

    const { data, error } = await query.select();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    revalidateChambers();
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
      ? supabase.from("chambers").delete().eq("id", id)
      : supabase.from("chambers").delete().eq("slug", slug);

    const { error } = await query;

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    revalidateChambers();
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
