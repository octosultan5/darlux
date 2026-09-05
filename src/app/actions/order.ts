"use server";

import { supabase } from "@/lib/supabase";
import { headers } from "next/headers";

export async function submitOrder(orderData: any) {
  try {
    const headersList = await headers();
    const forwardedFor = headersList.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0] : "unknown";

    // Check if IP is blocked in Supabase
    if (ip !== "unknown") {
      try {
        const { data: isBlocked } = await supabase
          .from("blocked_ips")
          .select("ip_address")
          .eq("ip_address", ip)
          .maybeSingle();

        if (isBlocked) {
          console.warn(`Order from blocked IP ${ip} shadow-banned.`);
          // Shadow ban: pretend it succeeded so the spammer doesn't bypass it
          return { success: true, data: { id: "shadow-blocked", ...orderData } };
        }
      } catch (dbErr) {
        // Log error and continue if the blocked_ips table doesn't exist yet or has schema mismatch
        console.error("IP Block Check Error (continuing):", dbErr);
      }
    }

    // 1. Optional: Add your Google Sheets Webhook URL here if you want direct sync
    const GOOGLE_SHEETS_WEBHOOK = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK;
    
    // Prepare data
    const finalData = {
      ...orderData,
      ip_address: ip
    };

    // 2. Insert into Supabase
    const { data, error } = await supabase.from("orders").insert([finalData]).select();

    if (error) {
      console.error("Supabase error:", error);
      return { success: false, error: "فشل في تسجيل الطلب، المرجو المحاولة مرة أخرى." };
    }

    // 3. Sync to Google Sheets (if webhook exists)
    if (GOOGLE_SHEETS_WEBHOOK) {
      try {
        await fetch(GOOGLE_SHEETS_WEBHOOK, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(finalData),
        });
      } catch (sheetError) {
        console.error("Google Sheets Sync Error:", sheetError);
        // We don't fail the order if sheet fails
      }
    }

    return { success: true, data: data?.[0] };
  } catch (err) {
    console.error("Server Action Error:", err);
    return { success: false, error: "حدث خطأ في السيرفر." };
  }
}
