import { createClient } from "@/utils/supabase/server";
import MessageWallDisplay from "@/components/message-wall/MessageWallDisplay";
import styles from "../page.module.css";

export default async function MessageWallPage() {
  const supabase = await createClient();
  const { data: messages, error } = await supabase.from("Messages").select();

  return (
    // <div className={styles.page}>
    //   <h1 style={{ marginTop: "500px" }}>Message Wall</h1>
      <MessageWallDisplay messages={messages || []} />
    // </div>
  );
}
