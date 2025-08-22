"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function submitMessageAction(formData) {
  const supabase = await createClient();

  const messageData = {
    author_name: formData.author_name,
    relation: formData.relation,
    content: formData.content,
    status: "pending", // for moderation
  };

  const { error } = await supabase.from("Messages").insert(messageData);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/messages");

  return { success: true };
}

export async function approveMessageAction(formData) {
  const supabase = await createClient();

  const messageId = formData.get("messageId");

  const { error } = await supabase
    .from("Messages")
    .update({ status: "approved" })
    .eq("id", messageId);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}
