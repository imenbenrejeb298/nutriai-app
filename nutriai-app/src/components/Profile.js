import React from 'react';
import { useTranslation } from 'react-i18next';

function Profile() {
  const { t } = useTranslation();
  return <h1 className="text-2xl font-bold text-gray-800">{t('menu_profile')}</h1>;
}

export default Profile;
