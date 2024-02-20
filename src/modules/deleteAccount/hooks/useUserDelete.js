import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../shared/context/firebaseContext';
import { brujulaUtils } from '../../../shared/utils/brujulaUtils';

export function useDeleteMyUser() {
  const { deleteUser, getCurrentUserEmail, deleteUserPictures } =
    brujulaUtils();
  const auth = useAuth();
  const navigate = useNavigate();

  const deleteMyAccount = async () => {
    if (
      confirm(`Estás a punto de borrar tu cuenta ${getCurrentUserEmail()}, esto no se puede deshacer.
        
        ¿Quieres continuar?`)
    ) {
      await deleteUser(getCurrentUserEmail());
      await deleteUserPictures();
      auth.logout();
      navigate('/');
    }
  };

  return deleteMyAccount;
}
