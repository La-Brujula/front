import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import './i18n.ts';

import QueryProvider from './shared/providers/queryProvider';
import { UserProvider } from './shared/providers/authProvider';
import App from './App';

import { PostHogProvider } from 'posthog-js/react';
import posthog from 'posthog-js';

posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
  api_host: import.meta.env.VITE_POSTHOG_HOST,
  person_profiles: 'identified_only',
});

// Render the app
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <PostHogProvider client={posthog}>
        <UserProvider>
          <QueryProvider>
            <App />
          </QueryProvider>
        </UserProvider>
      </PostHogProvider>
    </StrictMode>
  );
}
