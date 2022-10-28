import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const BasicInfo = () => {
  const { register, handleSubmit } = useForm();
  const { t } = useTranslation('auth');
  const navigate = useNavigate();

  return (
    <form
      onSubmit={handleSubmit(() => {
        try {
          navigate('../area');
        } catch {}
      })}
      className="flex flex-col gap-4"
    >
      <p>*{t('requiredInformation')}</p>
      <label htmlFor="picture">{t('selectOrUploadPicture')}</label>
      <input type="hidden" {...register('profilePicture')} required />
      <div className="grid grid-cols-[min-content_minmax(12rem,_24rem)] text-right gap-4 mx-auto">
        <label htmlFor="name" className="col-span-1">
          {t('name')}*
        </label>
        <input
          type="text"
          id="name"
          {...register('name')}
          autoComplete="given-name"
          required
        />
        <label htmlFor="lastname" className="col-span-1">
          {t('lastname')}*
        </label>
        <input
          type="text"
          id="lastName"
          {...register('lastname')}
          autoComplete="family-name"
          required
        />
        <label htmlFor="gender">{t('gender')}*</label>
        <select id="gender" {...register('gender')} required>
          <option value="" disabled selected></option>
          <option value="male">{t('male')}</option>
          <option value="female">{t('female')}</option>
          <option value="other">{t('other')}</option>
          <option value="not">{t('preferNotToSay')}</option>
        </select>
        <div className="col-span-2 flex flex-col gap-4 text-center">
          <label htmlFor="nickname" className="col-span-1">
            {t('nickname')}*
          </label>
          <input
            type="text"
            id="nickname"
            {...register('nickname')}
            autoComplete="nickname"
            required
          />
        </div>
        <p className="col-span-2 text-center">{t('currentResidence')}</p>
        <label htmlFor="city" className="col-span-1">
          {t('city')}*
        </label>
        <input type="text" id="city" {...register('city')} required />
        <label htmlFor="state" className="col-span-1">
          {t('state')}*
        </label>
        <input type="text" id="state" {...register('state')} required />
        <label htmlFor="country" className="col-span-1">
          {t('country')}*
        </label>
        <input type="text" id="country" {...register('country')} required />
        <label htmlFor="phone" className="col-span-1">
          {t('phone')}*
        </label>
        <input type="phone" id="phone" {...register('phone')} required />
      </div>
      <div className="flex flex-row gap-4 self-center">
        <NavLink to="../">
          <div className="button font-bold">{t('back')}</div>
        </NavLink>
        <input type="submit" className="border-none" value={t('next')} />
      </div>
    </form>
  );
};
