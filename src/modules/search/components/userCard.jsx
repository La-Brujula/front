import { NavLink } from 'react-router-dom';
import { getTitle } from '@shared/utils/areaUtils';

export const UserCard = ({ user }) => {
  return (
    <NavLink
      to={`/usuarios/${user.email}`}
      className="grid grid-cols-[5rem_1fr_1fr] lg:grid-cols-[5rem_5fr_4fr] lg:gap-4
      gap-4 border-b-black border-b border-opacity-40 pb-6 gap-y-4 items-center"
    >
      {!!user.profilePictureUrl ? (
        <img
          src={user.profilePictureUrl}
          alt={`${user.nickname || user.name} profile picture`}
          className="w-20 h-20 rounded-full shrink-0 row-span-2 object-cover object-center"
        />
        ) : (
          <img
          src={user.type == "moral" ? "/guias/fotoDePerfil/casita.png" : "/guias/fotoDePerfil/Monito.jpg"} 
          alt="ImagenPreminada"
          className="h-20 w-20 rounded-full bg-white shrink-0 row-span-2"
          loading="eager"
          />
        )}
      <div
        className="flex flex-row gap-8 text-left w-full border-b-black
        border-opacity-40 col-span-2"
      >
        <div className="w-full">
          <h2 className="font-normal text-xl lg:text-lg">
            {!!user.nickname ? user.nickname : `${user.name} ${user.lastname}`}
          </h2>
          {!!user.nickname && (
            <p className="font-normal text-sm opacity-80">
              {user.name} {user.lastname}
            </p>
          )}
        </div>
      </div>
      <div className="">
        {user.subareas?.map((subarea, i) => (
          <p className={["text-sm opacity-80", i == 0 && "font-bold"].join(' ')} key={subarea}>
            {getTitle(subarea, user.gender)}
          </p>
        ))}
        <p className="text-xs mt-2 font-medium">{[user.city, user.state].filter(a => !!a).join(', ')}</p>
      </div>
      <div className="grid lg:grid-cols-[4rem_1fr] lg:gap-4 items-center justify-center">
        <img src={import.meta.env.BASE_URL + 'img/LogoBlue.svg'} alt="" className='max-h-[2rem] w-full' />
        <p className='text-black'>
          <span className="block text-xl font-bold">
            {!!user.reviews ? user.reviews.length : '0'}
          </span>
          <span className="text-xs leading-3 block">Brujula(s) de recomendación</span>
        </p>
      </div>
      {!!user.headline && <p className="text-sm opacity-70 text-black col-span-2">
        {user.headline}
      </p>}
    </NavLink>
  );
};
