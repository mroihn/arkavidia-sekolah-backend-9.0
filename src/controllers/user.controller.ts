import { db } from '../db/drizzle';
import { getUserById, insertUser } from '../repositories/user.repository';
import { getUserRoute, postUserRoute } from "../routes/user.route";
import { createRouter } from '../utils/router-factory';

export const userRouter = createRouter();

userRouter.openapi(getUserRoute, async (c) => {
    const { id } = c.req.valid('param');
    const todo = await getUserById(db, id);
    return c.json(todo, 200);
});

userRouter.openapi(postUserRoute, async (c) => {
    const body = c.req.valid('json');
    const { name, age } = body;
    const newTodo = await insertUser(db, name, age)
    return c.json(newTodo, 201);
});