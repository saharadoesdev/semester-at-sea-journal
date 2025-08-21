import MessageCard from "@/components/message-wall/MessageCard"
import styles from "../page.module.css";

export default function MessageWallPage() {
  return (
    <div className={styles.page}>
      <h1 style={{marginTop: '500px'}} >Message Wall</h1>
      <MessageCard />
    </div>
  );
}