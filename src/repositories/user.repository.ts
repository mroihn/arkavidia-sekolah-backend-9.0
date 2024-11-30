import { eq } from 'drizzle-orm';
import type { Database } from '../db/drizzle';
import { user } from '../db/schema/user.schema';
import type { PutUserBodySchema } from '../types/user.type'
import type { z } from 'zod';

export const getUserById = async (db: Database, id: string) => {
    return await db.select().from(user).where(eq(user.id, id));
};

export const insertUser = async (db: Database, name: string, age: number | undefined) => {
    const [insertedUser] = await db.insert(user).values({
        name,
        age,
        createdAt: new Date(),
        updatedAt: new Date(),
    }).returning();
    return insertedUser;
};

export const updateUser = async (db: Database, data: z.infer<typeof PutUserBodySchema>, userId: string) => {
    const [updatedUser] = await db.update(user)
        .set({
            ...data
        })
        .where(eq(user.id, userId))
        .returning();
    return updatedUser;
};