import { prisma, redis } from "@/config";
import { Event } from "@prisma/client";

async function findFirst() {
  const redisEvent = await redis.get("event");
  let event: Event = JSON.parse(redisEvent);
  if(event) {
    console.log("peguei do redis");
  }
  if (!event) {
    event = await prisma.event.findFirst();
    await redis.set("event", JSON.stringify(event));
  }
  return event;
}

const eventRepository = {
  findFirst,
};

export default eventRepository;
