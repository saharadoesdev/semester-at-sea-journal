"use client";
// import { useState } from "react";

const PostEditor = ({ initialData = {}, action }) => {
//   const [post, setPost] = useState({
//     title: initialData.title || "",
//     slug: initialData.slug || "",
//     content: initialData.content || "",
//     displayDate: initialData.displayDate || "",
//     imageURLs: initialData.imageURLs || [],
//     tags: initialData.tags || [],
//   });

//   const [imageFiles, setImageFiles] = useState([]);

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setPost((prev) => {
//       return {
//         ...prev,
//         [name]: value,
//       };
//     });
//   };

//   const handleImageUpload = (event) => {
//     if (event.target.files && event.target.files.length > 0) {
//       setImageFiles((prev) => [...prev, ...event.target.files]);
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     onSubmit(post, imageFiles);

//     // let imageURL = post.imageURL;

//     // if (imageFile) {
//     //   const { data, error } = await supabase.storage
//     //     .from("images") // your bucket name
//     //     .upload(`public/${Date.now()}_${imageFile.name}`, imageFile);
//     //   if (error) {
//     //     alert("Image upload failed!");
//     //     return;
//     //   }

//     //   const { data: publicUrlData } = supabase.storage
//     //     .from("images")
//     //     .getPublicUrl(data.path);

//     //   imageURL = publicUrlData.publicUrl;
//     // }

//     // await supabase
//     //   .from("Posts")
//     //   .insert({
//     //     title: post.title,
//     //     userID: userID,
//     //     content: post.content,
//     //     imageURL: imageURL,
//     //     videoURL: post.videoURL,
//     //     flag: post.flag,
//     //     referencedPostID: post.referencedPostID ? post.referencedPostID : null,
//     //   })
//     //   .select();

//     // router.push("/admin");
//   };


  return (
    <div>
      <form action={action}>
        <label htmlFor="title">Title</label> <br />
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={initialData.title}
        //   onChange={handleChange}
        />
        <br /><br />

        <label htmlFor="slug">Slug</label>
        <br />
        <input
          type="text"
          id="slug"
          name="slug"
          defaultValue={initialData.slug}
        //   onChange={handleChange}
        />
        <br /><br />

        <label htmlFor="displayDate">Display Date</label>
        <br />
        <input
          type="date"
          id="displayDate"
          name="displayDate"
          defaultValue={initialData.displayDate}
        />
        <br /><br />

        <label htmlFor="content">Content</label>
        <br />
        <textarea
          rows="5"
          cols="50"
          id="content"
          name="content"
          defaultValue={initialData.content}
        //   onChange={handleChange}
        ></textarea>
        <br /><br />

        <label htmlFor="tags">Tags (separate with commas)</label>
        <br />
        <input
          type="text"
          id="tags"
          name="tags"
          defaultValue={initialData.tags}
        //   onChange={handleChange}
        />
        <br /><br />
        
        {/* <span>Upload images: </span>
        <br />
        <input type="file" accept="image/*" onChange={handleImageUpload} multiple />
        <br /><br />
        
        <label htmlFor="flag">Flag (optional)</label>
        <br />
        <select id="flag" name="flag" value={post.flag} onChange={handleChange}>
          <option value="">None</option>
          <option value="Question">Question</option>
          <option value="Opinion">Opinion</option>
          <option value="Discussion">Discussion</option>
          <option value="Advice">Advice</option>
        </select>
        <br /><br /> */}

        <input type="submit" value="Post" />
      </form>
    </div>
  );
};

export default PostEditor;
