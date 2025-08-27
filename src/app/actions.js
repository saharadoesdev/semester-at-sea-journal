"use server";

import { createClient as createPublicClient } from "@/utils/supabase/server";
import { createClient as createAdminClient } from "@/utils/supabase/admin";
import { revalidatePath } from "next/cache";

export async function submitMessageAction(formData) {
  const supabase = await createPublicClient();

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

  revalidatePath("/admin");

  return { success: true };
}

export async function approveMessageAction({ messageId }) {
  const supabase = await createAdminClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return {
      success: false,
      error: "You must be logged in to approve messages.",
    };
  }

  const { error } = await supabase
    .from("Messages")
    .update({ status: "approved" })
    .eq("id", messageId);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/admin");
  revalidatePath("/message-wall");

  return { success: true };
}

export async function submitGlossaryTerm(formData) {
  const supabase = await createAdminClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, error: "You must be logged in to add terms." };
  }

  const { error, data } = await supabase
    .from("Glossary")
    .insert([{ term: formData.term, definition: formData.definition }]);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/glossary");

  return { success: true };
}

export async function deletePostAction({ postId, postSlug }) {
  const supabase = await createAdminClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, error: "You must be logged in to delete posts." };
  }

  const { error } = await supabase
    .from("JournalEntries")
    .delete()
    .eq("id", postId);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/journal");
  revalidatePath(`/journal/${postSlug}`);

  return { success: true };
}