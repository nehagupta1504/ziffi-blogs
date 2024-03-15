import { createClient, sql } from "@vercel/postgres";

export const getBlogsService = async () => {
  try {
    return await sql`SELECT * FROM blogs ORDER BY created_at DESC`;
  } catch (err) {
    console.log("err", err);
    throw err;
  }
};
export const getBlogService = async (id: string) => {
  try {
    return await sql`SELECT * FROM blogs where id = ${id}`;
  } catch (err) {
    console.log("err", err);
    throw err;

  }
};
export const postBlogService = async (title: string, author: string, content: string, createdAt: string) => {
  try {
    return await sql`INSERT INTO blogs (title, author, content, created_at) VALUES (${title}, ${author}, ${content}, ${createdAt}) RETURNING *`;
  } catch (err) {
    console.log("err", err);
    throw err;

  }
};
export const deleteBlogService = async (id: string) => {
  try {
    return await sql`DELETE FROM blogs WHERE id = ${id}`;
  } catch (err) {
    console.log("err", err);
    throw err;
  }
};
