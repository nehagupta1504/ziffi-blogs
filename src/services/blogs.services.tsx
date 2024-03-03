import { sql } from "@vercel/postgres";

export const getBlogsService =async()=>{
    return await sql`SELECT * FROM blogs`;
}
export const getBlogService = async (id: string)=>{
    return await sql`SELECT * FROM blogs where id = ${id}`;
}
export const postBlogService = async (title: string, author: string, content: string, createdAt:string)=>{
    return await sql`INSERT INTO blogs (title, author, content) VALUES (${title}, ${author}, ${content})`;
}