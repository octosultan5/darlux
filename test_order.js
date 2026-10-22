const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://qzogweizczdbktfhuefn.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6b2d3ZWl6Y3pkYmt0Zmh1ZWZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxMDgzOTcsImV4cCI6MjA5MjY4NDM5N30.06vXaJJV3S5IzLVVFL1vTrmlqaxz52I3LkFMqluVJoM";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  const { data, error } = await supabase.from("orders").insert([
    {
      name: "Test",
      phone: "0600000000",
      city: "Test",
      bundle_type: 1,
      total_price: 169,
      has_bump: false,
      product_name: "Test Product",
      ip_address: "127.0.0.1"
    }
  ]).select();

  console.log("Insert result:", { data, error });
}

test();
