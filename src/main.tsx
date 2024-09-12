import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import './i18n.ts';

import QueryProvider from './shared/providers/queryProvider';
import { UserProvider } from './shared/providers/authProvider';
import App from './App';

import { PostHogProvider } from 'posthog-js/react';
import posthog from 'posthog-js';

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
          </QueryProvider>
        </UserProvider>
      </PostHogProvider>
    </StrictMode>
  );
}
