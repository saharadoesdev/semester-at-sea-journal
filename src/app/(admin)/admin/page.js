'use client'
import Link from 'next/link';
import styles from "../../page.module.css";
import { createClient } from "@/utils/supabase/client";
const supabase = createClient();

export default function AdminPage() {
  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }
  return (
    <div className={styles.page}>
        <br /><br /><br /><br /><br />
      <h1>Admin</h1>
      {/* <h2>Create Post</h2> */}
      <Link href="/admin/create">Create Post</Link>
      <br /><br />
      <Link href="/admin/edit">Edit Post</Link>
      <br /><br />
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}