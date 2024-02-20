import { LoadingSpinner } from '@shared/components/loadingSpinner';
import {
  FireAuthProvider,
  firestorage,
  firestore,
  StorageContext,
  StoreContext,
} from '@shared/context/firebaseContext';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { AppRouter } from './routes';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FireAuthProvider>
      <StorageContext.Provider value={firestorage}>
        <StoreContext.Provider value={firestore}>
          <Suspense
            fallback={
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <LoadingSpinner />
              </div>
            }
          >
            <RouterProvider router={AppRouter} />
          </Suspense>
        </StoreContext.Provider>
      </StorageContext.Provider>
    </FireAuthProvider>
  </React.StrictMode>,
);
