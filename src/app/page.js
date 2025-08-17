import { createClient } from "@/utils/supabase/server";
import MapDynamicWrapper from "../components/MapDynamicWrapper";
import JournalArchive from "@/components/JournalArchive";
import styles from "./page.module.css";

export default async function Home() {
  const supabase = await createClient();
  const { data: posts, error } = await supabase
    .from("JournalEntries")
    .select()
    .order("created_at", { ascending: false })
    .limit(1); // probably increase later

  return (
    <>
      <MapDynamicWrapper />
      <div className={styles.page}>
        <h1>Welcome to My Voyage!</h1>
        <p>
          Explore the world with me as I document my travels on my Semester at
          Sea journey.
        </p>
        <h2>Latest Journal Entries</h2>

        <JournalArchive posts={posts || []} />

        {/* <div className={styles.JournalCards}>
        <JournalCard />
        <JournalCard />
        <JournalCard />
      </div> */}
      </div>
    </>
  );
}
