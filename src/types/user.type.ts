import { type createRoute, z } from '@hono/zod-openapi';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { user } from '../db/schema/user.schema';

/** RESPONSE SCHEMAS */
export const UserSchema = createSelectSchema(user, {
    createdAt: z.union([z.string(), z.date()]),
}).openapi('User');

export const ListUserSchema = z.array(UserSchema);

/** RESPONSE SCHEMAS */
export const GetListUserQuerySchema = z.object({
    name: z.string().optional().openapi({
        param: {
            in: 'query',
            example: 'arpjv19i',
        },
    }),
});

export const IdUserPathSchema = z.object({
    id: z.string().openapi({
        param: {
            in: 'path',
            example: 'arpjv19i',
        },
    }),
});

export const PostUserBodySchema = createInsertSchema(user).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

export const PutUserBodySchema = createInsertSchema(user)
    .omit({
        id: true,
        createdAt: true,
        updatedAt: true,
    })
    .partial();
