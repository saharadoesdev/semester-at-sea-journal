'use client';
import { useState } from "react";
import { handleAddTerm } from "@/app/actions";

export default function GlossaryManager({ initialGlossary }) {
  const [glossary, setGlossary] = useState(initialGlossary || []);

  const handleAddTerm = async (term, definition) => {
    const result = await approveTermAction({ term, definition });
    if (result.success) {
      setGlossary((prev) => [...prev, { term, definition }]);
    } else {
      alert("Failed to add glossary term: " + result.error);
    }
  };

  return (
    <div>
      <table style={{ borderSpacing: "18px" }} className="terms-table">
        <thead>
          <tr>
            <th>Term</th>
            <th>Definition</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {glossary.map((term) => (
            <tr key={term.id}>
              <td>{term.term}</td>
              <td>{term.definition}</td>
              <td>
                Edit and Delete Buttons will go here
                {/* {term.status !== "approved" && (
                  <button onClick={() => handleApprove(term.id)}>
                    Approve
                  </button>
                )} */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}