import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "../../styles/addBlog.module.css";
import restProvider from "@/lib/restProvider";
import { apiUrls } from "@/utils/constants";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function BlogDetail(props: any) {
  let initialState = {
    title: "",
    author: "",
    content: "",
  };
  const [post, setPost] = useState(initialState);
  const { title, author, content } = post;
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  
  useEffect(() => {
    if (title && author && content) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  })
  // function to handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  //  functions that calls the post api to create blog
  const addPost = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    try {
      e.preventDefault();
      setLoading(true);
      const url = apiUrls.postBlog;
      const response = await restProvider.post(url, { ...post });
      setPost(initialState);
      alert("Blog added successfully");
      setLoading(false);
    } catch (error: any) {
      alert("Error adding blog");
    }
  };

  return (
    <>
      <Head>
        <title>Ziffi-Blogs</title>
      </Head>
      <main className={styles["add-blog"]}>
        <div className={styles.container}>
          <h1>Create a New Blog Post</h1>
        </div>
        <div>
          <form className={styles["blog-form"]}>
            <label htmlFor='title' className={styles["form-label"]}>
              Title:
            </label>
            <input type='text' id='title' name='title' value={title} className={styles["form-input"]} required onChange={handleChange} />

            <label htmlFor='author' className={styles["form-label"]}>
              Author:
            </label>
            <input type='text' id='author' name='author' value={author} className={styles["form-input"]} required onChange={handleChange} />

            <label htmlFor='content' className={styles["form-label"]}>
              Content:
            </label>
            <textarea id='content' name='content' value={content} className={styles["form-textarea"]} rows={8} required onChange={handleChange}></textarea>

            <button type='submit' value='Submit' className={styles["submit-button"]} onClick={addPost} disabled={buttonDisabled}>
              {loading ? <i className='fa fa-spinner fa-spin'></i> : "Submit"}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
