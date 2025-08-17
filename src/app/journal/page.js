import { createClient } from "@/utils/supabase/server";
import JournalArchive from "@/components/JournalArchive";
import styles from "../page.module.css";

export default async function JournalsPage() {
  const supabase = await createClient();
  const { data: posts, error } = await supabase.from('JournalEntries').select();

  return (
    <div className={styles.page}>
      <h1>The Voyage Logs</h1>
      <JournalArchive posts={posts || []} />
    </div>
  );
}