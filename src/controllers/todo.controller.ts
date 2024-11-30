import { db } from '../db/drizzle';
import { getTodoById, insertTodo, updateTodo, deleteTodo } from '../repositories/todo.repository';
import { getTodoRoute, postTodoRoute, putTodoRoute, deleteTodoRoute } from "../routes/todo.route";
import { createRouter } from '../utils/router-factory';

export const todoRouter = createRouter();

todoRouter.openapi(getTodoRoute, async (c) => {
	const { id } = c.req.valid('param');
	const todo = await getTodoById(db, id);
	if (todo.length === 0)
		return c.json({ error: 'Todo not found' }, 404);
	return c.json(todo, 200);
});

todoRouter.openapi(postTodoRoute, async (c) => {
	const data = c.req.valid('json');
	const newTodo = await insertTodo(db, data)
	return c.json(newTodo, 201);
});

todoRouter.openapi(putTodoRoute, async (c) => {
	const data = c.req.valid('json');
	const { id } = c.req.valid('param');
	const todo = await updateTodo(db, data, id);

	if (!todo) return c.json({ error: 'Todo not found' }, 404);
	return c.json(todo, 200);
});

todoRouter.openapi(deleteTodoRoute, async (c) => {
	const { id } = c.req.valid('param');
	const todo = await deleteTodo(db, id);

	if (todo.length === 0)
		return c.json({ error: 'Todo not found' }, 404);
	return c.json(todo, 200);
});
