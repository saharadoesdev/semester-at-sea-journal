import { createClient } from "@/utils/supabase/admin";
import { redirect } from "next/navigation";
import PostEditor from "@/components/admin/PostEditor";
import styles from "@/app/page.module.css";

export const metadata = {
  title: "Edit Post | Sahara at Sea",
  openGraph: {
    title: "Edit Post | Sahara at Sea",
  },
};

export default async function EditPostPage({ params }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: post, error: fetchError } = await supabase
    .from("JournalEntries")
    .select("*")
    .eq("slug", slug)
    .single();

  if (fetchError || !post) {
    return <div>Post not found</div>;
  }

  const handleEditPost = async (formData) => {
    "use server";
    const supabase = await createClient();

    const existingImageUrls = post.image_urls || [];
    const files = formData.getAll("images");

    const newImageUrls = [];
    for (const file of files) {
      if (file && file.size > 0) {
        const { data, error } = await supabase.storage
          .from("images")
          .upload(`public/${Date.now()}_${file.name}`, file, {
            contentType: file.type,
          });
        if (error) {
          console.error("Image upload error:", error);
          continue;
        }
        const { data: publicUrlData } = supabase.storage
          .from("images")
          .getPublicUrl(data.path);
        newImageUrls.push(publicUrlData.publicUrl);
      }
    }
    const image_urls = [...existingImageUrls, ...newImageUrls];

    const tagsString = formData.get('tags') || "";
    const tags = tagsString
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    const updatedPost = {
      title: formData.get("title") || "",
      slug: formData.get("slug") || "",
      content: formData.get("content") || "",
      display_date: formData.get("displayDate") || null,
      image_urls,
      tags: tags,
    };

    const { data, error } = await supabase
      .from("JournalEntries")
      .update([updatedPost])
      .eq("id", post.id);

    if (!error) {
      await revalidatePath('/');
      await revalidatePath('/journal');
      // await revalidatePath('/country/[countrys slug]'); // need to figure out how to do this
      if (post.slug !== updatedPost.slug) { // if slug changed
        await revalidatePath(`/journal/${post.slug}`);
      }
      await revalidatePath(`/journal/${updatedPost.slug}`);
      redirect(`/admin`);
    }
  };

  return (
    <div className={styles.page}>
      <h1>Edit Journal Entry</h1>
      <PostEditor initialData={post} action={handleEditPost} />
    </div>
  );
}
