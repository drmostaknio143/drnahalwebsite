import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { services as staticServices } from "@/lib/data/services";
import { conditions as staticConditions } from "@/lib/data/conditions";
import { faqs as staticFaqs } from "@/lib/data/faq";
import { videos as staticVideos } from "@/lib/data/videos";
import { galleryItems as staticGallery } from "@/lib/data/gallery";
import { blogPosts as staticBlogs } from "@/lib/data/blogs";
import { reviews as staticReviews } from "@/lib/data/reviews";

export async function GET() {
  const supabase = createServerClient();

  try {
    const [
      servicesRes,
      conditionsRes,
      chambersRes,
      faqsRes,
      videosRes,
      galleryRes,
      blogsRes,
      reviewsRes,
      appointmentsRes,
      pendingApptRes,
    ] = await Promise.all([
      supabase.from("services").select("id", { count: "exact", head: true }),
      supabase.from("conditions").select("id", { count: "exact", head: true }),
      supabase.from("chambers").select("id", { count: "exact", head: true }),
      supabase.from("faqs").select("id", { count: "exact", head: true }),
      supabase.from("videos").select("id", { count: "exact", head: true }),
      supabase.from("gallery_items").select("id", { count: "exact", head: true }),
      supabase.from("blog_posts").select("id", { count: "exact", head: true }),
      supabase.from("reviews").select("id", { count: "exact", head: true }),
      supabase.from("appointments").select("id", { count: "exact", head: true }),
      supabase.from("appointments").select("id", { count: "exact", head: true }).eq("status", "Pending"),
    ]);

    // Fetch recent 5 appointments
    const { data: recentAppointments } = await supabase
      .from("appointments")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);

    return NextResponse.json({
      success: true,
      counts: {
        services: servicesRes.count ?? staticServices.length,
        conditions: conditionsRes.count ?? staticConditions.length,
        chambers: chambersRes.count ?? 3,
        faqs: faqsRes.count ?? staticFaqs.length,
        videos: videosRes.count ?? staticVideos.length,
        gallery: galleryRes.count ?? staticGallery.length,
        blogs: blogsRes.count ?? staticBlogs.length,
        reviews: reviewsRes.count ?? staticReviews.length,
        appointments: appointmentsRes.count ?? 0,
        pendingAppointments: pendingApptRes.count ?? 0,
      },
      recentAppointments: recentAppointments || [],
      supabaseStatus: !servicesRes.error ? "connected" : "fallback",
    });
  } catch (err: any) {
    return NextResponse.json({
      success: true,
      counts: {
        services: staticServices.length,
        conditions: staticConditions.length,
        chambers: 3,
        faqs: staticFaqs.length,
        videos: staticVideos.length,
        gallery: staticGallery.length,
        blogs: staticBlogs.length,
        reviews: staticReviews.length,
        appointments: 0,
        pendingAppointments: 0,
      },
      recentAppointments: [],
      supabaseStatus: "fallback",
    });
  }
}
