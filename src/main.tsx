import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import './i18n.ts';

import QueryProvider from './shared/providers/queryProvider';
import { UserProvider } from './shared/providers/authProvider';
import App from './App';

// Render the app
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <UserProvider>
        <QueryProvider>
          <App />
        </QueryProvider>
      </UserProvider>
    </StrictMode>
  );
}
