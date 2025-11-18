import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function ChefAssistant({ profile }) {
  const { t } = useTranslation();
  const [question, setQuestion] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    // Ajouter la question de l'utilisateur à la conversation
    const userMessage = { role: 'user', content: question };
    setConversation(prev => [...prev, userMessage]);
    setIsLoading(true);
    setQuestion('');

    try {
      // Simulation d'une réponse de l'IA (dans une vraie application, cela appellerait une API)
      setTimeout(() => {
        const aiResponse = {
          role: 'assistant',
          content: generateChefResponse(question, profile)
        };
        setConversation(prev => [...prev, aiResponse]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage = {
        role: 'assistant',
        content: t('aiError')
      };
      setConversation(prev => [...prev, errorMessage]);
      setIsLoading(false);
    }
  };

  // Fonction pour générer une réponse simulée du chef
  const generateChefResponse = (question, profile) => {
    const responses = [
      t('chef_response_1'),
      t('chef_response_2'),
      t('chef_response_3'),
      t('chef_response_4'),
      t('chef_response_5')
    ];
    
    // Retourner une réponse aléatoire
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">{t('menu_chef')}</h1>
        <p className="text-gray-600 mt-1">{t('chef_assistant_subtitle')}</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col h-[600px]">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {conversation.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('chef_welcome')}</h3>
              <p className="text-gray-500 max-w-md">{t('chef_welcome_desc')}</p>
            </div>
          ) : (
            conversation.map((message, index) => (
              <div 
                key={index} 
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === 'user' 
                      ? 'bg-emerald-500 text-white rounded-br-none' 
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  <p>{message.content}</p>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-800 rounded-2xl rounded-bl-none px-4 py-3">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 p-4">
          <form onSubmit={handleSubmit} className="flex space-x-3">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder={t('chef_question_placeholder')}
              className="flex-1 rounded-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !question.trim()}
              className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full p-3 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChefAssistant;