import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const AuthForm = (props) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (setter) => (e) => setter(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    // ...logique d'authentification...
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>{t('email')}</label>
      <input type="email" value={email} onChange={handleChange(setEmail)} />
      <label>{t('password')}</label>
      <input type="password" value={password} onChange={handleChange(setPassword)} />
      <button type="submit">{t('login')}</button>
      <button type="button">{t('register')}</button>
    </form>
  );
};

export default AuthForm;