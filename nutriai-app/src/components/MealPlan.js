import React from 'react';
import { useTranslation } from 'react-i18next';

function MealPlan() {
  const { t } = useTranslation();
  return <h1 className="text-2xl font-bold text-gray-800">{t('menu_meal_plan')}</h1>;
}

export default MealPlan;
