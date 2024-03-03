    import { Redis } from "@upstash/redis";

const redisClient = new Redis({
  url:'' ,
  token:''
});

export default redisClient;