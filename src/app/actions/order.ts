"use server";

import { supabase } from "@/lib/supabase";
import { headers } from "next/headers";

export async function submitOrder(orderData: any) {
  try {
    let ip = "unknown";
    try {
      const headersList = await headers();
      const forwardedFor = headersList.get("x-forwarded-for");
      ip = forwardedFor ? forwardedFor.split(",")[0] : "unknown";
    } catch (e) {
      console.error("Error fetching headers:", e);
    }

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
          return { success: true, data: { id: "shadow-blocked", ...orderData } };
        }
      } catch (dbErr) {
        console.error("IP Block Check Error (continuing):", dbErr);
      }
    }

    const GOOGLE_SHEETS_WEBHOOK = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK;
    
    // STRICT DATA MAPPING: Only send columns that are definitely in the Supabase schema
    // We omit product_name and has_bump as they might not exist in the database and cause inserts to fail.
    const finalData = {
      name: orderData.name,
      phone: orderData.phone,
      city: orderData.city,
      bundle_type: orderData.bundle_type,
      total_price: orderData.total_price,
      status: "new",
      ip_address: ip
    };

    // 2. Insert into Supabase
    const { data, error } = await supabase.from("orders").insert([finalData]).select();

    if (error) {
      console.error("Supabase error detail:", error);
      // Fallback: If ip_address column doesn't exist, try again without it
      if (error.code === 'PGRST204' || error.message.includes('ip_address')) {
          const { ip_address, ...fallbackData } = finalData;
          const retry = await supabase.from("orders").insert([fallbackData as any]).select();
          if (retry.error) {
             return { success: false, error: "فشل في تسجيل الطلب (مشكلة في قاعدة البيانات).", details: retry.error.message };
          }
          return { success: true, data: retry.data?.[0] };
      }
      return { success: false, error: "فشل في تسجيل الطلب، المرجو المحاولة مرة أخرى.", details: error.message };
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
      }
    }

    return { success: true, data: data?.[0] };
  } catch (err: any) {
    console.error("Server Action Error:", err);
    return { success: false, error: "حدث خطأ في السيرفر.", details: err?.message };
  }
}
