import { Container } from '@shared/layout/container';
import { NavLink } from 'react-router-dom';
import { useDeleteMyUser } from './hooks/useUserDelete';

function DeleteUserPage() {
  const deleteMyAccount = useDeleteMyUser();
  return (
    <Container>
      <h1>Borrar mi usuario</h1>
      <p className="text-lg">
        ¿Estás seguro de que quieres eliminar tu usuario de La Brújula?
      </p>
      <p className="text-slate-500 my-8">
        Si eliminas tu cuenta: Eliminaremos tu dirección de correo electrónico,
        contraseña y toda la información que hayas dado de alta en nuestra
        plataforma se perderá y no podrás recupeparla. Ya no podrás acceder a tu
        usuario. Se perderá tu cuenta y el acceso a sus métodos de autenticación
      </p>
      <NavLink
        to="/usuarios"
        className="button mb-4 block w-fit mx-auto"
      >
        Regresar
      </NavLink>
      <div
        className="px-4 py-2 text-slate-400 cursor-pointer"
        onClick={deleteMyAccount}
      >
        Deseo eliminar mi cuenta de manera definitiva
      </div>
    </Container>
  );
}

export default DeleteUserPage;
