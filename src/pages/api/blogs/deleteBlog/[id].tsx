import { deleteBlogService } from "@/services/blogs.services";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler (req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    console.log("coming inside this---")
    if (req.method !== "DELETE") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }
    // Check for authorisation here
    // TODO: authroisationMiddleware(req, res);
    // Add the blog to the database
    console.log(req.query.id)
    await deleteBlogService(req.query.id as string);
    // Send the blog as a response
    res.status(201).json({message:'Blog deleted successfully'});
  } catch (error: any) {
    console.error("Error fetching blog: ", error.message);
    res.status(500).json({ error: "Error fetching blog", message: error.message });
  }
};


