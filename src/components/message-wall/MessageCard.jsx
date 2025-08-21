import styles from "./MessageCard.module.css";

const MessageCard = (message) => {
  return (
    <div className={styles.MessageCard}>
      <h6>{message.content || "This is a preview of a message post..."}</h6>
      <p>- {message.author_name || "Unknown"} ({message.relation || "Unknown"})</p>
      <p>{message.date || "2024-01-01"}</p>
    </div>
  );
};

export default MessageCard;
