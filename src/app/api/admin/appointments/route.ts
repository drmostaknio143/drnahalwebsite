import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    // Return sample mock appointments if table is empty or error
    const sample = [
      {
        id: "mock-1",
        patient_name: "Kamrul Islam",
        phone: "01712-345678",
        chamber_slug: "an-nahar",
        preferred_date: "2026-10-02",
        reason: "Cataract evaluation and blurred vision in right eye",
        status: "Pending",
        admin_notes: "Patient requested evening slot",
        created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
      },
      {
        id: "mock-2",
        patient_name: "Nasima Begum",
        phone: "01987-654321",
        chamber_slug: "aristo",
        preferred_date: "2026-10-05",
        reason: "Diabetic retinopathy checkup and retina scan",
        status: "Confirmed",
        admin_notes: "Confirmed for Tuesday 4 PM",
        created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
      },
    ];
    return NextResponse.json({ success: true, data: sample, source: "mock" });
  }

  return NextResponse.json({ success: true, data, source: "database" });
}

export async function POST(request: Request) {
  try {
    const supabase = createServerClient();
    const body = await request.json();

    const { data, error } = await supabase
      .from("appointments")
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

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing appointment ID" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("appointments")
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
      return NextResponse.json({ success: false, error: "Missing appointment ID" }, { status: 400 });
    }

    const { error } = await supabase
      .from("appointments")
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
