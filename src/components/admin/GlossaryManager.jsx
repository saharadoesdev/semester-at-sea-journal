'use client';
import { useState } from "react";
import { submitGlossaryTerm } from "@/app/actions";

export default function GlossaryManager({ initialGlossary }) {
  const [glossary, setGlossary] = useState(initialGlossary || []);
  const [formData, setFormData] = useState({ term: "", definition: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const { term, definition } = formData;
    const result = await submitGlossaryTerm(formData);
    // const result = { success: true };
    if (result.success) {
      setGlossary((prev) => [...prev, formData]);
      setFormData({ term: "", definition: "" });
    } else {
      alert("Failed to add glossary term: " + result.error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="term"
          placeholder="Term"
          value={formData.term}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="definition"
          placeholder="Definition"
          value={formData.definition}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Term</button>
      </form>
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
            <tr key={term.id || `${term.term}-${term.definition}`}>
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