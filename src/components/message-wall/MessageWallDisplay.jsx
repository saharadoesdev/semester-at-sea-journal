"use client";
import { useState } from "react";
import MessageCard from "./MessageCard";
import MessageFormModal from "./MessageFormModal";
// import styles from "@/app/page.module.css";

const MessageWallDisplay = (props) => {
  const messages = props.messages || [];
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* <div className={styles.page}> */}
      <div>
        <div>
          <h1>Message Wall</h1>
          <h3>Leave a note, ask a question, or share a thought!</h3>
          <button onClick={() => setIsModalOpen(true)}>
            + Add Your Message
          </button>

          {isModalOpen && (
            <MessageFormModal onClose={() => setIsModalOpen(false)} />
          )}
        </div>

        {/* <div className={styles.MessageCards}> */}
        <div>
          {messages && messages.length > 0 ? (
            [...messages].map((message, index) => (
              <MessageCard
                key={message.id}
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
