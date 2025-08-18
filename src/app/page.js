import { createClient } from "@/utils/supabase/server";
import MapDynamicWrapper from "../components/MapDynamicWrapper";
import JournalArchive from "@/components/JournalArchive";
import Link from 'next/link';
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
        <h2>Latest Update ↓</h2>
        <JournalArchive posts={posts || []} />
        
        <h1>Welcome to My Voyage!</h1>
        <p>
          Explore the world with me as I document my travels on my Semester at
          Sea journey.
        </p>
        <h3 style={{ textAlign: 'center' }}>{`Over the next 100 days, I'll be visiting 11 countries across three continents. `}<Link style={{ color: '#fb6962', textDecoration: 'underline' }} href="/itinerary">Explore the full itinerary.</Link></h3>
        <br /><br />
        {/* <div className={styles.JournalCards}>
        <JournalCard />
        <JournalCard />
        <JournalCard />
      </div> */}
      </div>
    </>
  );
}
