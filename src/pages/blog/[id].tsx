import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/blogDetail.module.css";
import restProvider from "@/lib/restProvider";
import { apiUrls } from "@/utils/constants";
import { getBlogService } from "@/services/blogs.services";
import { IBlog } from "@/interfaces/blogs.interface";

const inter = Inter({ subsets: ["latin"] });

export default function BlogDetail({ blog }: { readonly blog: IBlog }) {
  const { author, title, content } = blog;
  return (
    <>
      <Head>
        <title>Ziffi-Blogs</title>
      </Head>
      <main className={styles["blog-container"]}>
        <div className={styles["blog-detail"]}>
          <div className={styles["heading"]}>
            <h1>{title}</h1>
            <p>By: {author}</p>
          </div>
          <div className={styles["content-details"]}>
            <p>{content}</p>
          </div>
        </div>
      </main>
    </>
  );
}



export const getServerSideProps = async (context: any) => {
  const id = context.query.id;
  const data = await getBlogService(id);
  const serializedBlogData = data.rows.map((blog: any) => ({
    ...blog,
    created_at: blog.created_at.toString(), // Convert Date object to string
  }));
  return {
    props: { blog: serializedBlogData[0]},
  };
}