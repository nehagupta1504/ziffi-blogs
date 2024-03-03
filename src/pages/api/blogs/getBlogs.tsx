import { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";
import redisClient from "@/services/redis";

export default async function handler (req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    if (req.method !== "GET") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }
    // Check for authorisation here
    // TODO: authroisationMiddleware(req, res);
    // Add the blog to the database
    const redisKey = "blogs";
    const redisValue = await redisClient.get(redisKey);
    if(redisValue){
      console.log("getting the redis value", redisValue);
      return res.status(201).json(redisValue);
    }else{
      console.log("not getting redis value need to get from db", redisValue);
      const result = await sql`SELECT * FROM blogs`;
      redisClient.set(redisKey, JSON.stringify(result.rows), {"ex": 60});
      // Send the blog as a response
      return res.status(201).json(result.rows);
    }
  } catch (error: any) {
    console.error("Error fetching blog: ", error.message);
     res.status(500).json({ error: "Error fetching blog", message: error.message });
     return;
  }
};


