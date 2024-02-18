import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/blogDetail.module.css";
import Link from "next/link";
import restProvider from "@/lib/restProvider";
import { apiUrls } from "@/utils/constants";
import { NextApiRequest, NextApiResponse } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function BlogDetail(props: any) {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    if (!id) return;
    fetchData(String(id)).then((data) => {
      setData(data[0]);
    });
  }, [id]);
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
        {!loading && (
          <div className={styles["blog-detail"]}>
            <div className={styles["heading"]}>
              <h1>{data.title}</h1>
              <p>By: {data.author}</p>
            </div>
            <div className={styles["content-details"]}>
              <p>{data.content}</p>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

async function fetchData(id: string) {
  const data = await restProvider.get(`${apiUrls.getblog}?id=${id}`);
  return data;
}
