import { useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../../../context/firebaseContext';
import { brujulaUtils } from '../../../shared/utils/brujulaUtils';
import { ProfileBadge } from '../../profile/components/profileBadge';

export const BaseStepPage = () => {

  const brujula = brujulaUtils()
  const [profilePictureUrl, setProfilePictureUrl] = useState("")
  const [userName, setUserName] = useState("")
  const [location, setLocation] = useState("")

  useEffect(() => {
    const getPicture = async () => {
      const url = await brujula.getProfilePictureUrl()
      setProfilePictureUrl(url)
    }
    const getUserData = async() => {
      const data = await brujula.getUserInfo()
      setUserName(data.nickname)
      setLocation(data.city+", "+data.state)
    }
    getPicture()
    getUserData()
  }, [])
  

  return (
    <>
      <ProfileBadge
        user={{
          profilePicture: profilePictureUrl,
          username: userName,
          location: location,
        }}
      />
      <div className="mb-8"></div>
      <Outlet />
    </>
  );
};
