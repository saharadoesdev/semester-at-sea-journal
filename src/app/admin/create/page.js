import PostEditor from '@/components/PostEditor';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import styles from "@/app/page.module.css";

export default function CreatePostPage() {
  const handleCreatePost = async (formData) => {
    'use server';
    const supabase = createClient();
    
    const { data, error } = await supabase.from('posts').insert([formData]).select();
    
    if (!error) {
      redirect(`/admin`);
    }
  };

  return (
    <div className={styles.page}>
      <h1>Create New Journal Entry</h1>
      <PostEditor onSubmit={handleCreatePost} />
    </div>
  );
}