import { useParams } from "react-router-dom";
import { UserProfilePage } from "../../profile/pages/landing";
import { useUserInfo } from '@shared/hooks/useUserInfo';
import { LoadingSpinner } from '@shared/components/loadingSpinner';
import { ErrorMessage } from '@shared/components/errorMessage';

export const SearchUserProfilePage = () => {
    const {userId} = useParams()
    if (!userId) return <div className="bg-red-500 text-white">Nambre pa, errorzaso</div>

    const {user, loading, error} = useUserInfo(userId)

    return loading ? (
        <LoadingSpinner />
      ) : error || !user ? (
        <ErrorMessage message={error?.toString() || 'No user found'} />
      ) : (
        <UserProfilePage user={user} />
      );
}

export default SearchUserProfilePage;