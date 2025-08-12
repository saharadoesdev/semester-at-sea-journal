'use client'
import { useState } from "react";

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
    <>
      <h1>About Me</h1>
      <CounterButton />
    </>
  );
}