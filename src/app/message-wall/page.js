import MessageWallDisplay from "@/components/message-wall/MessageWallDisplay"
import styles from "../page.module.css";

export default function MessageWallPage() {
  return (
    <div className={styles.page}>
      <h1 style={{marginTop: '500px'}} >Message Wall</h1>
      <MessageWallDisplay />
    </div>
  );
}