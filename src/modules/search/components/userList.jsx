import { UserCard } from './userCard';

export const UsersList = ({ users }) => {
  return (!!users ? (
    <div className="flex flex-col gap-8
    text-left bg-black bg-opacity-20 rounded-l-3xl p-8 w-full">
      {users.map((e) => (
        <UserCard user={e} key={e.email} />
      ))}
    </div>
  ) : (
    <p>Sin resultados</p>
  ))
};
