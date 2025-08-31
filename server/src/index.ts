import { router, publicProcedure } from './trpc';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { PORT } from './config';
import cors from 'cors';
import { z } from 'zod';
const appRouter = router({
    hello: publicProcedure.input(z.string()).query(({ input }) => {
        return `Hello, ${input}!`
    }),
})
export type AppRouter = typeof appRouter;
const server = createHTTPServer({
    router: appRouter,
    middleware: cors()
})
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})