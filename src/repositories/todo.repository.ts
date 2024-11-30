import { eq } from 'drizzle-orm';
import type { Database } from '../db/drizzle';
import { todo } from '../db/schema/todo.schema';
import type { PostTodoBodySchema, PutTodoBodySchema } from '../types/todo.type'
import type { z } from 'zod';

export const getTodoById = async (db: Database, id: string) => {
	return await db.select().from(todo).where(eq(todo.id, id));
};

export const insertTodo = async (db: Database, data: z.infer<typeof PostTodoBodySchema>) => {
	const [insertedTodo] = await db.insert(todo).values({
		...data
	}).returning();
	return insertedTodo;
};

export const updateTodo = async (db: Database, data: z.infer<typeof PutTodoBodySchema>, todoId: string) => {
	const [updatedTodo] = await db.update(todo)
		.set({
			...data
		})
		.where(eq(todo.id, todoId))
		.returning();
	return updatedTodo;
};