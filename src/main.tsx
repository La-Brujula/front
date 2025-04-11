import { StrictMode } from 'react';

import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import ReactDOM from 'react-dom/client';

import { UserProvider } from '@shared/providers/authProvider';
import QueryProvider from '@shared/providers/queryProvider';

import App from './App';
import { Toaster } from './components/ui/sonner';
import './i18n.ts';
import './index.css';

!import.meta.env.DEV &&
  posthog.init('phc_T1b8Jh0gnQ6NsNQeqxBKiWCrYW5UygDG2n5RlTQbWBA', {
    api_host: 'https://us.i.posthog.com',
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
            <Toaster />
          </QueryProvider>
        </UserProvider>
      </PostHogProvider>
    </StrictMode>
  );
}
