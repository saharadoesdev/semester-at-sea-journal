'use client'
import { useState } from "react";
import styles from "../page.module.css";

function CounterButton() {
    const [count, setCount] = useState(0);

    return (
        <button onClick={() => setCount(count + 1)}>
            Count: {count}
        </button>
    );
}

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <h1>About Me</h1>
      <CounterButton />
    </div>
  );
}