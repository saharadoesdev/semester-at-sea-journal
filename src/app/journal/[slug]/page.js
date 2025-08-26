import { createClient } from "@/utils/supabase/server";
import Link from 'next/link';
import styles from "@/app/page.module.css";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("JournalEntries")
    .select("title")
    .eq("slug", slug)
    .single();

  return {
    title: post?.title ? `${post.title} | Sahara at Sea` : "Post Not Found | Sahara at Sea",
  };
}

const DetailPage = async ({ params }) => {
  const { slug } = await params;
    const supabase = await createClient();
    const { data: post, error: fetchError } = await supabase
      .from("JournalEntries")
      .select("*")
      .eq("slug", slug)
      .single();
  
    if (fetchError || !post) {
      return <div className={styles.page}><br /><h1>Post not found</h1></div>;
    }

  return (
    <>
      <div className={styles.page}>
        <br /><h2>{post.title}</h2>
        {post.image_urls && <img src={post.image_urls[0]} alt={post.title} />}

        <p>{post.content}</p>

        <p>{post.tags}</p>
        
        <br />
        <br />
        <Link href="/journal">Back to all posts</Link>
      </div>
    </>
  );
};

export default DetailPage;