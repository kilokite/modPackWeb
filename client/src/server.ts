import type{ AppRouter } from '@zkit/server';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
const server = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({ url: `http://localhost:${4000}` }),
  ],
})
export {
    server,
}