import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '../configs/env.config';
import { todo } from './schema/todo.schema';
import { user } from './schema/user.schema';

const client = postgres(env.DATABASE_URL);

const schema = {
    todo,
    user,
};

export const db = drizzle(client, { schema });
export type Database = typeof db;
