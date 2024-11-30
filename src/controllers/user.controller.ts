import { db } from '../db/drizzle';
import { getUserById, insertUser, updateUser, deleteUser, getListUser } from '../repositories/user.repository';
import { getUserRoute, postUserRoute, putUserRoute, deleteUserRoute, getListUserRoute } from "../routes/user.route";
import { createRouter } from '../utils/router-factory';

export const userRouter = createRouter();

userRouter.openapi(getListUserRoute, async (c) => {
    const user = await getListUser(db, c.req.valid('query'));
    return c.json({
        user,
    }, 200,
    );
});

userRouter.openapi(getUserRoute, async (c) => {
    const { id } = c.req.valid('param');
    const user = await getUserById(db, id);
    if (user.length === 0)
        return c.json({ error: 'User not found' }, 404);
    return c.json(user, 200);
});

userRouter.openapi(postUserRoute, async (c) => {
    const data = c.req.valid('json');
    const newTodo = await insertUser(db, data)
    return c.json(newTodo, 201);
});

userRouter.openapi(putUserRoute, async (c) => {
    const data = c.req.valid('json');
    const { id } = c.req.valid('param');
    const user = await updateUser(db, data, id);

    if (!user) return c.json({ error: 'User not found' }, 404);
    return c.json(user, 200);
});

userRouter.openapi(deleteUserRoute, async (c) => {
    const { id } = c.req.valid('param');
    const user = await deleteUser(db, id);

    if (user.length === 0)
        return c.json({ error: 'User not found' }, 404);
    return c.json(user, 200);
});