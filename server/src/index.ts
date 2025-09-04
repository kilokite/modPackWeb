import { PORT } from './config.js';
import cors from 'cors';
import { createContext } from './context.js';
import appRouter from './router.js';
import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
const app = express();
app.use(cors())
app.use('/trpc', trpcExpress.createExpressMiddleware({ router: appRouter, createContext }));
app.use(express.static('public'))
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
// const server = createHTTPServer({
//     router: appRouter,
//     createContext,
//     middleware: cors()
// })
// server.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`)
// })