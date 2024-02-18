import { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

export default async function handler (req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    if (req.method !== "GET") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }
    // Check for authorisation here
    // TODO: authroisationMiddleware(req, res);
    // Add the blog to the database
    const result = await sql`SELECT * FROM blogs where id = ${String(req.query.id)}`;
    // Send the blog as a response
    res.status(201).json(result.rows );
  } catch (error: any) {
    console.error("Error fetching blog: ", error.message);
    res.status(500).json({ error: "Error fetching blog", message: error.message });
  }
};


