import { router, publicProcedure } from './trpc';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { PORT } from './config';
import cors from 'cors';
import { z } from 'zod';
import { createContext } from './context';
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
export type AppRouter = typeof appRouter;
const server = createHTTPServer({
    router: appRouter,
    createContext,
    middleware: cors()
})
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})