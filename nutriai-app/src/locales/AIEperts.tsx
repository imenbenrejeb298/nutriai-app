import React from 'react';
import { useTranslation } from 'react-i18next';
import './AIEperts.css';

// Vous pouvez trouver des avatars libres de droits sur des sites comme pexels.com, unsplash.com, etc.
// Pour cet exemple, j'utilise des placeholders.
const expertData = [
  {
    id: 1,
    name: 'Dr. Olivia Dubois',
    title: 'Nutritionniste IA',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=1',
    description: 'Spécialisée dans la nutrition personnalisée. Je peux vous aider à créer des plans de repas adaptés à vos objectifs et restrictions.',
    prompt: 'Posez-moi une question sur votre alimentation...'
  },
  {
    id: 2,
    name: 'Alexandre Moreau',
    title: 'Coach Sportif IA',
    avatar: 'https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=1',
    description: 'Expert en fitness et performance. Je conçois des programmes d\'exercices pour tous les niveaux, de la perte de poids à la prise de masse.',
    prompt: 'Quel est votre objectif sportif ?'
  },
  {
    id: 3,
    name: 'Chef Antoine',
    title: 'Chef Cuisinier IA',
    avatar: 'https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=1',
    description: 'Maître des saveurs saines. Transformons vos ingrédients en plats délicieux et nutritifs. Demandez-moi une recette !',
    prompt: 'Quels ingrédients avez-vous ?'
  }
];

const AIEperts: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="ai-experts-container">
      <h1>{t('aiExperts')}</h1>
      <p className="experts-subtitle">Discutez avec notre équipe d'experts virtuels pour des conseils personnalisés.</p>
      <div className="experts-grid">
        {expertData.map((expert) => (
          <div key={expert.id} className="expert-card">
            <div className="expert-header">
              <img src={expert.avatar} alt={`Avatar de ${expert.name}`} className="expert-avatar" />
              <div className="expert-info">
                <h2>{expert.name}</h2>
                <p>{expert.title}</p>
              </div>
            </div>
            <div className="expert-body">
              <p>{expert.description}</p>
            </div>
            <div className="expert-chat">
              <input type="text" placeholder={expert.prompt} />
              <button>{t('next_step')}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIEperts;