import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ProfileForm = (props) => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [disease, setDisease] = useState('none');
  const [bmi, setBmi] = useState('');

  const handleChange = (setter) => (e) => setter(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    // ...logique de sauvegarde...
    // Calcul BMI
    if (weight && height) {
      const bmiValue = (parseFloat(weight) / ((parseFloat(height) / 100) ** 2)).toFixed(2);
      setBmi(bmiValue);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>{t('name')}</label>
      <input type="text" value={name} onChange={handleChange(setName)} />
      <label>{t('weight')}</label>
      <input type="number" value={weight} onChange={handleChange(setWeight)} />
      <label>{t('height')}</label>
      <input type="number" value={height} onChange={handleChange(setHeight)} />
      <label>{t('chronicDisease')}</label>
      <select value={disease} onChange={handleChange(setDisease)}>
        <option value="none">-</option>
        <option value="diabetic">{t('diabetic')}</option>
        <option value="hypertensive">{t('hypertensive')}</option>
        <option value="other">{t('other')}</option>
      </select>
      <div>{t('bmi')}: {bmi}</div>
      <button type="submit">{t('saveProfile')}</button>
    </form>
  );
};

export default ProfileForm;