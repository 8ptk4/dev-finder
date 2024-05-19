"use server";

import { db } from "@/db";
import { Room, room } from "./../../db/schema";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { createRoom } from "@/data-access/rooms";

export async function createRoomAction(roomData: Omit<Room, "id" | "userId">) {
	const session = await getSession();

	if (!session) {
		throw new Error("You must be logged in to create this room");
	}

	await createRoom(roomData, session.user.id);

	revalidatePath("/");
}
