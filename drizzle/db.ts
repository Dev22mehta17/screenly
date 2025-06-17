// import { drizzle } from "drizzle-orm/xata-http";
import { drizzle } from "@/node_modules/drizzle-orm/xata-http";
import { getXataClient } from "../xata";
const xata = getXataClient();
export const db = drizzle(xata);