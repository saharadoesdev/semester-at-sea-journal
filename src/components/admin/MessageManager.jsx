'use client';
import { useState } from "react";
import { approveMessageAction } from "@/app/actions";

export default function MessageManager({ initialMessages }) {
  const [messages, setMessages] = useState(initialMessages || []);

  const handleApprove = async (id) => {
    const result = await approveMessageAction({ messageId: id });
    if (result.success) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === id ? { ...msg, status: "approved" } : msg
        )
      );
    } else {
      alert("Failed to approve message: " + result.error);
    }
  };

  return (
    <div>
      <table style={{ borderSpacing: "18px" }} className="messages-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Author</th>
            <th>Relation</th>
            <th>Content</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <tr key={message.id}>
              <td>
                {new Date(message.created_at).toLocaleDateString()}{" "}
                {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </td>
              <td>{message.author_name}</td>
              <td>{message.relation}</td>
              <td>{message.content}</td>
              <td>{message.status}</td>
              <td>
                {message.status !== "approved" && (
                  <button onClick={() => handleApprove(message.id)}>
                    Approve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}