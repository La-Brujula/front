import { UserCard } from './userCard';

export const UsersList = ({ users }) => {
  return users != undefined && users.length > 0 ? (
    <>
      {users.map((e) => (
        <UserCard user={e} key={e.email} />
      ))}
    </>
  ) : (
    <p>Sin resultados</p>
  );
};
