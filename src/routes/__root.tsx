import ErrorHandler from '@/shared/navigation/errorHandler';
import { Footer } from '@/shared/navigation/footer';
import { Navbar } from '@/shared/navigation/navbar';
import Page404 from '@/shared/navigation/page404';
import { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

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
