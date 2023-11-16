import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_ANON_KEY || ""
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
