// api/base44Client.js (version démo)
export const base44 = {
  auth: {
    me: async () => ({
      id: 'demo-user-123',
      email: 'demo@nutriai.com',
      name: 'Utilisateur Démo'
    }),
    logout: async () => {
      console.log('Déconnexion simulée');
      window.location.reload();
    }
  },
  entities: {
    HealthProfile: {
      filter: async () => [
        {
          id: 'demo-profile',
          user_id: 'demo-user-123',
          weight: 70,
          height: 175,
          age: 30,
          gender: 'male',
          activity_level: 'moderate',
          health_conditions: [],
          allergies: ['lactose'],
          goal: 'weight_loss',
          bmi: 22.9,
          bmi_category: 'Normal weight',
          language: 'fr'
        }
      ],
      create: async (data) => {
        console.log('Création profil:', data);
        return { ...data, id: 'new-profile-' + Date.now() };
      },
      update: async (id, data) => {
        console.log('Mise à jour profil:', id, data);
        return { ...data, id };
      }
    },
    DailyLog: {
      filter: async () => [
        {
          id: 'demo-log',
          user_id: 'demo-user-123',
          date: new Date().toISOString().split('T')[0],
          weight: 70.5,
          water_intake: 2.0,
          mood: 'good',
          notes: 'Bonne journée !',
          meals: [
            {
              id: '1',
              type: 'breakfast',
              name: 'Omelette aux légumes',
              calories: 350,
              time: '08:00'
            }
          ],
          exercises: [
            {
              id: '1',
              name: 'Course à pied',
              duration: 30,
              calories_burned: 300
            }
          ],
          total_calories: 1850
        }
      ],
      create: async (data) => {
        console.log('Création log:', data);
        return { ...data, id: 'new-log-' + Date.now() };
      },
      update: async (id, data) => {
        console.log('Mise à jour log:', id, data);
        return { ...data, id };
      }
    },
    SavedRecipe: {
      filter: async () => [],
      create: async (data) => {
        console.log('Création recette:', data);
        return { ...data, id: 'new-recipe-' + Date.now() };
      },
      delete: async (id) => {
        console.log('Suppression recette:', id);
        return { success: true };
      }
    },
    SavedExercise: {
      filter: async () => [],
      create: async (data) => {
        console.log('Création exercice:', data);
        return { ...data, id: 'new-exercise-' + Date.now() };
      },
      delete: async (id) => {
        console.log('Suppression exercice:', id);
        return { success: true };
      }
    }
  },
  integrations: {
    Core: {
      InvokeLLM: async ({ prompt }) => {
        // Simulation de réponse IA
        console.log('Prompt IA:', prompt);
        
        if (prompt.includes('recipe')) {
          return `Nom: Omelette aux légumes healthy
Temps: 15 minutes
Portions: 1

Ingrédients:
- 2 œufs
- 50g d'épinards
- 1/4 de poivron rouge
- 30g de fromage feta
- 1 c.à.s d'huile d'olive

Instructions:
1. Battre les œufs dans un bol
2. Faire revenir les légumes 3 minutes
3. Ajouter les œufs et cuire 5 minutes
4. Saupoudrer de feta avant de servir

Nutrition:
Calories: 280
Protéines: 22g
Glucides: 8g
Lipides: 18g`;
        } else if (prompt.includes('workout')) {
          return `Nom: Entraînement complet débutant
Durée: 30 minutes
Calories: 250

Échauffement:
- 5 min de marche sur place
- Étirements dynamiques

Exercices:
1. Squats: 3 séries de 12 répétitions, repos 60s
2. Pompes (sur les genoux): 3 séries de 10, repos 45s
3. Fentes: 3 séries de 10 par jambe, repos 60s
4. Planche: 3 séries de 30 secondes, repos 45s

Retour au calme:
- Étirements statiques 5 minutes`;
        } else {
          return "Continuez vos efforts ! Chaque petit pas vous rapproche de vos objectifs de santé. Vous faites du bon travail !";
        }
      }
    }
  }
};