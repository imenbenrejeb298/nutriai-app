import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './AIEperts.css';

// Données des experts avec des traductions
const AIEperts = () => {
  const { t, i18n } = useTranslation();
  const [conversations, setConversations] = useState({});

  // Données des experts avec des traductions
  const expertData = [
    {
      id: 1,
      name: t('expert_name_nutritionist'),
      title: t('expert_role_nutritionist'),
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=1',
      description: t('expert_desc_nutritionist'),
      prompt: t('expert_prompt_nutritionist')
    },
    {
      id: 2,
      name: t('expert_name_coach'),
      title: t('expert_role_coach'),
      avatar: 'https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=1',
      description: t('expert_desc_coach'),
      prompt: t('expert_prompt_coach')
    },
    {
      id: 3,
      name: t('expert_name_chef'),
      title: t('expert_role_chef'),
      avatar: 'https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=1',
      description: t('expert_desc_chef'),
      prompt: t('expert_prompt_chef')
    }
  ];

  // Fonction pour générer une réponse simulée de l'expert
  const generateExpertResponse = (expertId, question) => {
    const responses = {
      1: [ // Nutritionniste
        t('expert_response_nutritionist_1'),
        t('expert_response_nutritionist_2'),
        t('expert_response_nutritionist_3')
      ],
      2: [ // Coach sportif
        t('expert_response_coach_1'),
        t('expert_response_coach_2'),
        t('expert_response_coach_3')
      ],
      3: [ // Chef cuisinier
        t('expert_response_chef_1'),
        t('expert_response_chef_2'),
        t('expert_response_chef_3')
      ]
    };
    
    const expertResponses = responses[expertId] || [t('expert_default_response')];
    return expertResponses[Math.floor(Math.random() * expertResponses.length)];
  };

  // Gérer l'envoi d'une question à un expert
  const handleAskExpert = (expertId, question) => {
    if (!question.trim()) return;
    
    const newConversations = { ...conversations };
    if (!newConversations[expertId]) {
      newConversations[expertId] = [];
    }
    
    // Ajouter la question de l'utilisateur
    newConversations[expertId].push({ 
      sender: 'user', 
      text: question,
      timestamp: new Date()
    });
    
    // Simuler une réponse de l'expert après un court délai
    setTimeout(() => {
      const response = generateExpertResponse(expertId, question);
      setConversations(prev => ({
        ...prev,
        [expertId]: [
          ...(prev[expertId] || []),
          { sender: 'expert', text: response, timestamp: new Date() }
        ]
      }));
    }, 1000);
    
    setConversations(newConversations);
  };

  return (
    <div className="ai-experts-container">
      <h1>{t('aiExperts')}</h1>
      <p className="experts-subtitle">{t('experts_subtitle')}</p>
      <div className="experts-grid">
        {expertData.map((expert) => (
          <div key={expert.id} className="expert-card">
            <div className="expert-header">
              <img src={expert.avatar} alt={`${t('expert_avatar_alt')} ${expert.name}`} className="expert-avatar" />
              <div className="expert-info">
                <h2>{expert.name}</h2>
                <p>{expert.title}</p>
              </div>
            </div>
            <div className="expert-body">
              <p>{expert.description}</p>
            </div>
            <div className="expert-chat">
              <input 
                type="text" 
                placeholder={expert.prompt} 
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAskExpert(expert.id, e.target.value);
                    e.target.value = '';
                  }
                }}
              />
              <button onClick={(e) => {
                const input = e.target.previousSibling;
                handleAskExpert(expert.id, input.value);
                input.value = '';
              }}>
                {t('send')}
              </button>
            </div>
            {/* Afficher la conversation */}
            {conversations[expert.id] && (
              <div className="expert-conversation">
                {conversations[expert.id].map((msg, index) => (
                  <div key={index} className={`message ${msg.sender}`}>
                    <p>{msg.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIEperts;