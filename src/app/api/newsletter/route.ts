import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email required" },
        { status: 400 }
      );
    }

    // Check if already subscribed
    const { data: existing } = await supabaseAdmin
      .from("newsletter_subscribers")
      .select("id")
      .eq("email", email.toLowerCase())
      .single();

    if (existing) {
      return NextResponse.json({ message: "Already subscribed" });
    }

    // Add subscriber
    const { error } = await supabaseAdmin
      .from("newsletter_subscribers")
      .insert({ email: email.toLowerCase() });

    if (error) {
      throw error;
    }

    return NextResponse.json({ message: "Subscribed successfully" });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}
