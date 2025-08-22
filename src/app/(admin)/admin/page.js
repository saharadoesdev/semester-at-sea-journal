// import Link from 'next/link';
import styles from "../../page.module.css";
import { createClient } from "@/utils/supabase/client";
import PostsManager from '@/components/admin/PostsManager';
import MessageManager from '@/components/admin/MessageManager';

export default async function AdminPage() {
  const supabase = createClient();
  const { data: posts, error: postsError } = await supabase
    .from('JournalEntries')
    .select('id, title, slug, display_date')
    .order('created_at', { ascending: false });

  const { data: messages, error: messagesError } = await supabase
    .from('Messages')
    .select('id, content, created_at, author_name, relation, status')
    .order('created_at', { ascending: false });

  // async function handleLogout() {
  //   await supabase.auth.signOut();
  //   window.location.href = "/login";
  // }

  return (
    <div className={styles.page}>
        <br /><br /><br /><br /><br />
      <h1>Manage Posts</h1>
      {/* <h2>Create Post</h2> */}
      {/* <Link href="/admin/create">Create Post</Link>
      <br /><br />
      <Link href="/admin/edit">Edit Post</Link>
      <br /><br /> */}
      {/* <button onClick={handleLogout}>Log Out</button> */}
      <PostsManager initialPosts={posts} />
      < br />< br />
      <MessageManager initialMessages={messages} />
      <br /><br /><br />
    </div>
  );
}