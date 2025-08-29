import { createClient } from "@/utils/supabase/server";
import JournalArchive from "@/components/journal/JournalArchive";

export const metadata = {
  title: "The Voyage Logs | Sahara at Sea",
  openGraph: {
    title: "The Voyage Logs | Sahara at Sea",
  },
};

export default async function JournalsPage() {
  const supabase = await createClient();
  const { data: posts, error } = await supabase
    .from("JournalEntries")
    .select()
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1>The Voyage Logs</h1>
      <JournalArchive posts={posts || []} />
    </div>
  );
}
