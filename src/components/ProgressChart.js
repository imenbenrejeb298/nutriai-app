import { useTranslation } from 'react-i18next';

const ProgressChart = (props) => {
  const { t } = useTranslation();

  return (
    <div>
      <h2>{t('progress')}</h2>
      {/* ...chart code... */}
    </div>
  );
}

export default ProgressChart;