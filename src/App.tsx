import { lazy } from 'react';

import { QueryClient } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';

// Import the generated route tree
import React from 'react';
import { routeTree } from './routeTree.gen';
import { LoadingSpinner } from './shared/components/loadingSpinner';

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
