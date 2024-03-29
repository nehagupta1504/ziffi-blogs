import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { getBlogsService, deleteBlogService } from "@/services/blogs.services";
import { IBlog } from "@/interfaces/blogs.interface";
import { NextApiRequest, NextApiResponse } from "next";
import { renderPartialText } from "@/utils/helper";
import restProvider from "@/lib/restProvider";
import { useState } from "react";
import { onOverlay, offOverlay } from "@/utils/styleHelpers";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ blogs }: { readonly blogs: IBlog[] }) {
  const [blogData, setBlogData] = useState(blogs);
  const [loading, setLoading] = useState(false);

  const deleteBlog = async (e: React.MouseEvent<HTMLButtonElement>) => {
    onOverlay(document);
    setLoading(true);
    let blogId = (e.target as HTMLButtonElement).id;
    blogId = blogId.split("_")[1];
    await restProvider.delete(`/api/blogs/deleteBlog/${blogId}`);
    const updatedBlogs = blogData.filter((blog: any) => blog.id.toString() !== blogId.toString());
    setBlogData(updatedBlogs);
    setLoading(false);
    offOverlay(document);
  };
  return (
    <>
      <Head>
        <title>Ziffi-Blogs</title>
      </Head>
      <div id='overlay' className={styles.overlay}>
        <div className='overlay-content'>
          <i className={`fa fa-spinner fa-spin ${styles["spinner"]}`}></i>
        </div>
      </div>
      <main className={styles["blog-container"]}>
        <h1 className={styles["page-heading"]}>Welcome to Ziffi Blogs</h1>
        <div className={styles["data-container"]}>
          {blogData?.map((blog: any) => {
            const { id, content, title, author } = blog;
            return (
              <div key={id} className={styles["blog-card"]}>
                <div className={styles["card-heading"]}>
                  <div className={styles["card-title"]}>
                    <h2>{title}</h2>
                    <p>By: {author}</p>
                  </div>
                  <div className={styles["user-options"]}>
                    <div>
                      <button onClick={deleteBlog} id={`delete_${id}`} name=''>
                        <span className='icon icon-delete' id={`span_${id}`}></span>
                      </button>
                    </div>
                    <div>
                      <Link href={`/blog/${id}`} className={styles["read-more-link"]} target='_blank'>
                        <span className='icon icon-new-tab'></span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className={styles["card-content"]}>
                  <div dangerouslySetInnerHTML={{ __html: renderPartialText(content.toString(), 3, "...") }}></div>
                  {/* <Link href={`/blog/${id}`} className={styles["read-more-link"]} target='_blank'>
                      Open
                    </Link> */}
                </div>
              </div>
            );
          })}
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
