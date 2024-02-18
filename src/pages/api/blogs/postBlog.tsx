import { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    const { title, author, content } = req.body;
    // We can expect author name from session if we're creating one
    if (!title || !content || !author) {
      throw new Error("Title,author & content are required.");
    }
    const createdAt = new Date().toISOString();
    // Check for authorisation here
    // TODO: authroisationMiddleware(req, res);
    // Add the blog to the database
    const result = await sql`INSERT INTO blogs (title, author, content, created_at) VALUES (${title}, ${author}, ${content}, ${createdAt}) RETURNING *`;
    // Send the blog as a response
    res.status(201).json({ blog: result.rows[0] });
  } catch (error) {
    console.error("Error adding blog: ", error);
    res.status(500).json({ error: "Error adding blog" });
  }
}
