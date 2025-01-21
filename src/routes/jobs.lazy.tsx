import StatsBar from '@/modules/jobs/components/statsBar';
import { useLoggedInAccount } from '@/shared/hooks/useLoggedInAccount';
import { createLazyFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/jobs')({
  component: JobsLayout,
});

export default function JobsLayout() {
  const loggedInAccount = useLoggedInAccount();
  return (
    <>
      {loggedInAccount !== null && <StatsBar />}
      <Outlet />
    </>
  );
}
