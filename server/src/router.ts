import { router, publicProcedure } from './trpc.js';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
const needAuth = publicProcedure.use(async ({ ctx, next }) => {
    if (!ctx.authenticated) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    return next({ ctx });
})

const appRouter = router({
    hello: publicProcedure.input(z.string()).query(({ input }) => {
        return `Hello, ${input}!`
    }),
    hello2: needAuth.input(z.string()).query(({ input }) => {
        return `Hello, ${input}!`
    }),
    login: publicProcedure.input(z.object({
        username: z.string(),
        password: z.string()
    })).mutation(({ input }) => {
        if(input.username === 'admin' && input.password === '123456') {
            return {
                success: true,
                token: '123456'
            }
        } else {
            return {
                success: false,
            }
        }
    }),
})
export default appRouter;
export type AppRouter = typeof appRouter;