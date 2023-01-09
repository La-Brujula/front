import { UserCard } from './userCard';

export const UsersList = ({ users, getNext }) => {
  return (
    <div
      className="flex flex-col gap-8
    text-left bg-black bg-opacity-20 rounded-l-3xl p-8 w-full"
    >
      {users != undefined && users.length > 0 ? (
        <>
          {users.map((e) => (
            <UserCard user={e} key={e.email} />
          ))}
          <div
            className="px-4 py-2 text-white bg-secondary
            cursor-pointer rounded-md text-c"
            onClick={getNext}
          >
            Cargar más
          </div>
        </>
      ) : (
        <p>Sin resultados</p>
      )}
    </div>
  );
};
