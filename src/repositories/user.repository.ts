import { eq, and } from 'drizzle-orm';
import type { Database } from '../db/drizzle';
import { user } from '../db/schema/user.schema';
import type { PostUserBodySchema, PutUserBodySchema, GetListUserQuerySchema } from '../types/user.type'
import type { z } from 'zod';

export const getListUser = async (db: Database, q: z.infer<typeof GetListUserQuerySchema>) => {
    const userNameQ = q.name
        ? eq(user.name, q.name)
        : undefined;

    const where = and(
        userNameQ,
    );
    return await db.query.user.findMany({
        where
    });
};


export const getUserById = async (db: Database, id: string) => {
    return await db.select().from(user).where(eq(user.id, id));
};

export const insertUser = async (db: Database, data: z.infer<typeof PostUserBodySchema>) => {
    const [insertedUser] = await db.insert(user).values({
        ...data
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

export async function deleteUser(db: Database, userId: string) {
    const deletedUser = await db
        .delete(user)
        .where(eq(user.id, userId))
        .returning();
    return deletedUser;
}