import { eq, and } from 'drizzle-orm';
import type { Database } from '../db/drizzle';
import { todo } from '../db/schema/todo.schema';
import type { GetListTodoQuerySchema, PostTodoBodySchema, PutTodoBodySchema } from '../types/todo.type'
import type { z } from 'zod';

export const getListTodo = async (db: Database, q: z.infer<typeof GetListTodoQuerySchema>) => {
	const userIdQ = q.userId
		? eq(todo.authorId, q.userId)
		: undefined;
	const isCompletedQ = q.isCompleted ? eq(todo.isCompleted, q.isCompleted) : undefined;

	const where = and(
		userIdQ,
		isCompletedQ
	);
	return await db.query.todo.findMany({
		where
	});
};

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

export async function deleteTodo(db: Database, todoId: string) {
	const deletedTodo = await db
		.delete(todo)
		.where(eq(todo.id, todoId))
		.returning();
	return deletedTodo;
}