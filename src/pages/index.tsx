import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import restProvider from "@/lib/restProvider";
import { apiUrls } from "../utils/constants";
import { NextApiRequest, NextApiResponse } from "next";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    fetchData().then((data) => {
      setData(data);
    });
  },[])
  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

  return (
    <>
      <Head>
        <title>Ziffi-Blogs</title>
      </Head>
      <main className={styles["blog-container"]}>
        <h1 className={styles["page-heading"]}>Welcome to Ziffi Blogs</h1>
        <div className={styles["data-container"]}>
          {loading ? (
            <div className={styles["empty-container"]}>
              <div className={styles["empty-container"]}>
                <p>There are no posts to render</p>
                <Link href='/addblog'>Create a post now</Link>
              </div>
            </div>
          ) : (
            data  &&
            data.map((blog: any) => (
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
                    <Link href={`/blog/${blog.id}`} className={styles["read-more-link"]} target="_blank">
                      Read More
                    </Link>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </>
  );
}

async function fetchData() {
  const data = await restProvider.get(apiUrls.getBlogs);
  return data;
}
