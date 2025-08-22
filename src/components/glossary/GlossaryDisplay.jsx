"use client";
// import { useState } from "react";
// import GlossaryCard from "./GlossaryCard";
import styles from "@/app/page.module.css";

const GlossaryDisplay = (props) => {
  const terms = props.terms || [];

  return (
    <>
      <div className={styles.page}>
        <div>
          <h1>Ship Lingo</h1>
          <h3>
            A quick guide to the common terms and slang used during a Semester
            at Sea.
          </h3>
        </div>

        <div>
          {terms && terms.length > 0 ? (
            <dl>
              {terms.map((glossary) => (
                <div key={glossary.id}>
                  <dt style={{ display: "inline", fontWeight: "bold" }}>
                    {glossary.term}:{" "}
                  </dt>
                  <dd style={{ display: "inline" }}>
                    {glossary.definition}
                  </dd>
                </div>
              ))}
            </dl>
          ) : (
            <h2>{"Looks like the glossary terms got lost at sea! 🌊"}</h2>
          )}
        </div>
      </div>
    </>
  );
};

export default GlossaryDisplay;
