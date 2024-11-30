import { db } from '../db/drizzle';
import { getTodoById, insertTodo } from '../repositories/todo.repository';
import { getTodoRoute, postTodoRoute } from "../routes/todo.route";
import { createRouter } from '../utils/router-factory';

export const todoRouter = createRouter();

todoRouter.openapi(getTodoRoute, async (c) => {
	const { id } = c.req.valid('param');
	const todo = await getTodoById(db, id);
	return c.json(todo, 200);
});

todoRouter.openapi(postTodoRoute, async (c) => {
	const body = c.req.valid('json');
	const { authorId, name, description } = body;
	const newTodo = await insertTodo(db, authorId, name, description)
	return c.json(newTodo, 201);
});
