import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Master password check: allows immediate access with predefined admin key
    const masterPass = process.env.ADMIN_PASSWORD || "drnehal2026";
    if (password === masterPass || (username === "admin" && password === "drnehal2026")) {
      const response = NextResponse.json({
        success: true,
        user: { username: "admin", role: "superadmin" },
      });
      // Set secure cookie
      response.cookies.set("dr_admin_session", "authenticated_master", {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
      return response;
    }

    // Attempt Supabase Auth email login
    if (username && username.includes("@")) {
      const supabase = createServerClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: username,
        password: password,
      });

      if (!error && data?.user) {
        const response = NextResponse.json({
          success: true,
          user: { email: data.user.email, role: "admin" },
        });
        response.cookies.set("dr_admin_session", data.session?.access_token || "authenticated", {
          httpOnly: false,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        });
        return response;
      }
    }

    return NextResponse.json({ success: false, error: "Invalid username or password" }, { status: 401 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || "Authentication failed" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: "Auth service ready" });
}
