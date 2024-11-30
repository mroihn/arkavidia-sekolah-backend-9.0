import { eq } from 'drizzle-orm';
import type { Database } from '../db/drizzle';
import { todo } from '../db/schema/todo.schema';

export const getTodoById = async (db: Database, id: string) => {
	return await db.select().from(todo).where(eq(todo.id, id));
};

export const insertTodo = async (db: Database, authorId: string, name: string, description: string | null | undefined) => {
	const [insertedTodo] = await db.insert(todo).values({
		authorId,       
		name,           
		description,    
		isCompleted: false,
		createdAt: new Date(), 
		updatedAt: new Date(),
	}).returning();
	return insertedTodo;
};