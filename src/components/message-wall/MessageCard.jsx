import styles from "./MessageCard.module.css";

const MessageCard = (message) => {
  const date = new Date(message.created_at);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const formattedDate = date.toLocaleDateString('en-US', options);

  return (
    <div className={styles.MessageCard}>
      <h6>{message.content || "This is a preview of a message post..."}</h6>
      <p>- {message.author_name || "Unknown"} ({message.relation || "Unknown"})</p>
      <p>{formattedDate || "2024-01-01"}</p>
    </div>
  );
};

export default MessageCard;
