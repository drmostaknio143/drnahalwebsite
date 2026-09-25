import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";
import { blogPosts as staticBlogs } from "@/lib/data/blogs";

function revalidateBlogCache() {
  try {
    revalidatePath("/[lang]/blog", "page");
    revalidatePath("/[lang]/blog/[slug]", "page");
    revalidatePath("/", "layout");
  } catch (e) {
    // ignore
  }
}

export async function GET() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("publish_date", { ascending: false });

  if (error) {
    const mapped = staticBlogs.map((b, idx) => ({
      id: `blog-${idx + 1}`,
      slug: b.slug,
      title_en: b.title.en,
      title_bn: b.title.bn,
      meta_description_en: b.metaDescription.en,
      meta_description_bn: b.metaDescription.bn,
      category_en: b.category.en,
      category_bn: b.category.bn,
      read_time_en: b.readTime.en,
      read_time_bn: b.readTime.bn,
      publish_date: b.date,
      image_url: b.image,
      sections: b.sections,
      emergency_callout_en: b.emergencyCallout?.en,
      emergency_callout_bn: b.emergencyCallout?.bn,
      related_service_slug: b.relatedServiceSlug,
      related_condition_slug: b.relatedConditionSlug,
      is_published: true,
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
      .from("blog_posts")
      .insert([body])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    revalidateBlogCache();
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
      ? supabase.from("blog_posts").update(updates).eq("id", id)
      : supabase.from("blog_posts").update(updates).eq("slug", slug);

    const { data, error } = await query.select();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    revalidateBlogCache();
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
      ? supabase.from("blog_posts").delete().eq("id", id)
      : supabase.from("blog_posts").delete().eq("slug", slug);

    const { error } = await query;

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    revalidateBlogCache();
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
