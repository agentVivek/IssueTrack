import { createClient } from 'redis';

export const redisClient = createClient({ url: 'redis://redis:6379' });

redisClient.on('error', (err) => console.error('Redis Client Error:', err));

export const connectToRedis = async () => {
  try {
    await redisClient.connect();
    console.log("Connected to Redis cache.");
  } catch (error) {
    console.error("Failed to connect to Redis:", error);
  }
};