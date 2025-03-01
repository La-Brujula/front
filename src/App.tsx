import { lazy, useMemo } from 'react';

import { RouterProvider, createRouter } from '@tanstack/react-router';
import { QueryClient } from '@tanstack/react-query';

// Import the generated route tree
import { routeTree } from './routeTree.gen';
import { LoadingSpinner } from './shared/components/loadingSpinner';
import React from 'react';

const ErrorHandler = lazy(() => import('./shared/navigation/errorHandler'));
const queryClient = new QueryClient();

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: 'intent',
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
  defaultErrorComponent: ErrorHandler,
  defaultPendingComponent: LoadingSpinner,
  scrollRestoration: true,
});

export type AppRouter = typeof router;

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return <RouterProvider router={router} />;
}

export default React.memo(App);
