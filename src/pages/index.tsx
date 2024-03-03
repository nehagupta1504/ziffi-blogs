import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getBlogsService } from "@/services/blogs.services";
import { IBlog } from "@/interfaces/blogs.interface";
import { NextApiRequest, NextApiResponse } from "next";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ blogs }: { blogs: IBlog[] }) {
  return (
    <>
      <Head>
        <title>Ziffi-Blogs</title>
      </Head>
      <main className={styles["blog-container"]}>
        <h1 className={styles["page-heading"]}>Welcome to Ziffi Blogs</h1>
        <div className={styles["data-container"]}>
          {blogs?.map((blog: any) => (
            <div key={blog.id} className={styles["blog-card"]}>
              <div className={styles["card-title"]}>
                <h2>{blog.title}</h2>
                <p>By: {blog.author}</p>
              </div>
              <div className={styles["card-content"]}>
                <p>
                  {blog.content.split(" ").slice(0, 40).join(" ")}
                  {blog.content.split(" ").length > 40 ? "..." : ""}
                </p>
                {blog.content.split(" ").length > 40 && (
                  <Link href={`/blog/${blog.id}`} className={styles["read-more-link"]} target='_blank'>
                    Read More
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps({ req, res }: { req: NextApiRequest; res: NextApiResponse }) {
  let blogs = await getBlogsService();
  const serializedBlogData = blogs.rows.map((blog) => ({
    ...blog,
    created_at: blog.created_at.toString(), // Convert Date object to string
  }));

  return {
    props: {
      blogs: serializedBlogData,
    },
  };
}
