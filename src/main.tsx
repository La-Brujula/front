import { LoadingSpinner } from '@shared/components/loadingSpinner';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { AppRouter } from './routes';
import { FireAuthProvider } from './shared/context/auth';
import { FirestoreProvider } from './shared/context/database';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <FireAuthProvider>
      <FirestoreProvider>
        <FirestoreProvider>
          <Suspense
            fallback={
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <LoadingSpinner />
              </div>
            }
          >
            <RouterProvider router={AppRouter} />
          </Suspense>
        </FirestoreProvider>
      </FirestoreProvider>
    </FireAuthProvider>
  </React.StrictMode>,
);
