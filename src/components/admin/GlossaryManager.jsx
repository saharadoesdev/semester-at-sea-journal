'use client';
import { useState } from "react";
import { approveMessageAction } from "@/app/actions";

export default function GlossaryManager({ initialGlossary }) {
  const [glossary, setGlossary] = useState(initialGlossary || []);

  const handleAdd = async (term, definition) => {
    const result = await approveMessageAction({ term, definition });
    if (result.success) {
      setGlossary((prev) => [...prev, { term, definition }]);
    } else {
      alert("Failed to add glossary term: " + result.error);
    }
  };

  return (
    <div>
      {/* <table style={{ borderSpacing: "18px" }} className="messages-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Author</th>
            <th>Relation</th>
            <th>Content</th>
            <th>Status</th>
          </tr>
        </thead> */}
        {/* <tbody>
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
        </tbody> */}
      {/* </table> */}
    </div>
  );
}