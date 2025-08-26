'use client'
import { useState } from "react";
import styles from "../page.module.css";

export const metadata = {
  title: "About | Sahara at Sea",
  openGraph: {
    title: "About | Sahara at Sea",
  },
};

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