import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  process.env.SUPABASE_URL || "https://gpcysgnoblvcudnuabdg.supabase.co",
  process.env.SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwY3lzZ25vYmx2Y3VkbnVhYmRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAwNjUwNjYsImV4cCI6MjAxNTY0MTA2Nn0.S3l89YiGN6SH6hdH_3KnE9LMpuSg95xe5qOHjjfASDk"
);

export const addOwnedWallet = async (address: string, owned_wallet: any[]) => {
  try {
    const { data: data1 } = await supabase
      .from("accounts")
      .select("*")
      .eq("address", address);
    if (!data1) {
      const { data: data2 } = await supabase.from("accounts").insert([
        {
          address: address,
          owned_wallet: [owned_wallet],
        },
      ]);
      return data2;
    }
    const arr = data1.owned_wallet.push(owned_wallet);
    const { data } = await supabase
      .from("accounts")
      .update({
        owned_wallet: arr,
      })
      .eq("address", address);

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const fetchWallet = async (address: string) => {
  try {
    const { data } = await supabase
      .from("accounts")
      .select("*")
      .eq("address", address);
    return data;
  } catch (e) {
    console.log(e);
  }
};
