"use client";
import MessageCard from "./MessageCard";
import styles from "@/app/page.module.css";

const MessageWallDisplay = (props) => {
  const messages = props.messages || [];
  const loading = false;

  return (
    <>
      <div className={styles.page}>
        <div>
          <h1>Message Wall</h1>
          <h3>Leave a note, ask a question, or share a thought!</h3>
        </div>
        <div className={styles.MessageCards}>
          {loading ? (
            <div className="loading-spinner"></div>
          ) : messages && messages.length > 0 ? (
            [...messages]
              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // Display newest first
              .map((message, index) => (
                <MessageCard
                  key={message.id}
                  id={message.id}
                  content={message.content}
                  created_at={message.created_at}
                  author_name={message.author_name}
                  relation={message.relation}
                />
              ))
          ) : (
            <h2>{"Looks like the messages got lost at sea! 🌊"}</h2>
          )}
        </div>
      </div>
    </>
  );
};

export default MessageWallDisplay;
