import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Navbar } from '@/shared/navigation/navbar';
import { Footer } from '@/shared/navigation/footer';
import Page404 from '@/shared/navigation/page404';
import { QueryClient } from '@tanstack/react-query';
import ErrorHandler from '@/shared/navigation/errorHandler';

interface QueryClientProvider {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<QueryClientProvider>()({
  component: RootComponent,
  errorComponent: ErrorHandler,
  notFoundComponent: Page404,
});

function RootComponent() {
  return (
    <>
      <Navbar />
      <div className="isolate">
        <Outlet />
      </div>
      <Footer />
      {(import.meta.env.DEV || localStorage.getItem('dev') === 'true') && (
        <>
          <TanStackRouterDevtools />
          <ReactQueryDevtools />
        </>
      )}
    </>
  );
}
