import PostEditor from '@/components/PostEditor';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import styles from "@/app/page.module.css";

export default function CreatePostPage() {
  const handleCreatePost = async (formData) => {
    'use server';
    const supabase = await createClient();
    const post = {
        title: formData.get('title') || "",
        slug: formData.get('slug') || "",
        content: formData.get('content') || "",
        display_date: formData.get('displayDate') || null,
        image_urls: formData.getAll('imageURLs'),
        tags: formData.getAll('tags'),
    };
    console.log(post)
    const { data, error } = await supabase.from('JournalEntries').insert([post]).select();
    console.log("Supabase insert result:", { data, error });
    if (!error) {
      redirect(`/admin`);
    }
  };

  return (
    <div className={styles.page}>
      <h1>Create New Journal Entry</h1>
      <PostEditor action={handleCreatePost} />
    </div>
  );
}