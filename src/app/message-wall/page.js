import { createClient } from "@/utils/supabase/server";
import MessageWallDisplay from "@/components/message-wall/MessageWallDisplay";

export default async function MessageWallPage() {
  const supabase = await createClient();
  const { data: messages, error } = await supabase
    .from("Messages")
    .select()
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  return <MessageWallDisplay messages={messages || []} />;
}
