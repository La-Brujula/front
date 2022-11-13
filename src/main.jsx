import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { AppRouter } from './routes';
import {
  fireauth,
  firestorage,
  firestore,
  AuthContext,
  StorageContext,
  StoreContext,
} from './shared/context/firebaseContext';
import { LoadingSpinner } from '@shared/components/loadingSpinner';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContext.Provider value={fireauth}>
      <StorageContext.Provider value={firestorage}>
        <StoreContext.Provider value={firestore}>
          <Suspense fallback={<LoadingSpinner />}>
            <RouterProvider router={AppRouter} />
          </Suspense>
        </StoreContext.Provider>
      </StorageContext.Provider>
    </AuthContext.Provider>
  </React.StrictMode>
);
