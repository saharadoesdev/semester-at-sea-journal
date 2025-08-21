"use client";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
const supabase = createClient();

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
      setSuccess(false);
    } else {
      setSuccess(true);
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleLogin} style={{ maxWidth: 300, margin: "2rem auto" }}>
      <h2>Admin Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ display: "block", width: "100%", marginBottom: 8 }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{ display: "block", width: "100%", marginBottom: 8 }}
      />
      <button type="submit" disabled={loading} style={{ width: "100%" }}>
        {loading ? "Logging in..." : "Login"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Login successful!</p>}
    </form>
  );
}
