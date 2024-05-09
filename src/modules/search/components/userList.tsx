import { UserDTO } from '../queries/searchQuery';
import { UserCard } from './userCard';
import { useTranslation } from 'react-i18next';

export const UsersList = ({ users }: { users?: UserDTO[] }) => {
  const { t } = useTranslation('search');
  return users != undefined && users.length > 0 ? (
    <div className="divide-y-2 divide-black divide-opacity-40 space-y-4">
      {users.map((e) => (
        <UserCard
          user={e}
          key={e.primaryEmail}
        />
      ))}
    </div>
  ) : (
    <p>{t('Sin resultados')}</p>
  );
};
