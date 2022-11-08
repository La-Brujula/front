import { useState } from 'react';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/firebaseContext';
export const LoginForm = () => {
  const { t } = useTranslation('auth');
  const navigate = useNavigate()
  
  const auth = useContext(AuthContext)
  const [errorMsg, setErrorMsg] = useState("")

  const onError = (err)=>{
    switch(err.code){
      case "auth/user-not-found":
        setErrorMsg("Las credenciales estan erroneas.")
        break;
    }
  }

  const login = async () => {
    const email = document.getElementById("email").value
    const pwd = document.getElementById("password").value
    if(await auth.login(email, pwd, onError)){
      navigate("/")
    }
  }

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-baseline gap-8 justify-center items-stretch w-full">
        <div className="flex flex-col gap-2 items-start">
          <label htmlFor="email" className="block">
            {t('email')}
          </label>
          <input
            id="email"
            type="email"
            placeholder={t('email')}
            autoComplete="email"
            className="w-full"
          />
        </div>
        <div className="flex flex-col gap-2 items-start">
          <label htmlFor="email">{t('password')}</label>
          <input
            id="password"
            type="password"
            placeholder={t('email')}
            autoComplete="password"
            className="w-full"
          />
        </div>
      </div>
      {errorMsg===""? <></>: <p style={{color:"red"}}>{errorMsg}</p>}
      <button className="max-w-xs mx-auto mt-8 bg-primary" onClick={login}>{t('login')}</button>
      <div className="flex flex-col gap-2 mt-4 text-primary">
        <NavLink to={import.meta.env.BASE_URL + 'crear-usuario'}>
          {t('createUser')}
        </NavLink>
        <NavLink to={import.meta.env.BASE_URL + 'reiniciar-contraseña'}>
          {t('forgotPassword')}
        </NavLink>
      </div>
    </>
  );
};
