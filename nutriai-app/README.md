# NutriAI - Assistant Nutritionnel Intelligent

NutriAI est un assistant nutritionnel alimenté par l'intelligence artificielle qui vous aide à atteindre vos objectifs de santé et de bien-être. L'application fournit des plans de repas personnalisés, un suivi de la progression et des conseils d'experts basés sur vos données personnelles et vos conditions de santé.

## Fonctionnalités

- 🍽️ **Plans de repas personnalisés** basés sur vos objectifs et conditions de santé
- 📊 **Suivi de la progression** avec des graphiques et des analyses détaillées
- 👨‍⚕️ **Conseils d'experts IA** dans les domaines de la nutrition, du fitness et de la cuisine
- 🌍 **Support multilingue** (Français, Anglais, Espagnol, Arabe)
- 💳 **Modèle freemium** avec options premium abordables
- 📱 **Applications mobiles** pour iOS et Android
- ☁️ **Déploiement cloud** gratuit avec Netlify

## Technologies

- **Frontend** : React 18, Tailwind CSS, i18next
- **Backend** : Node.js, Express
- **Mobile** : Capacitor pour iOS et Android
- **IA** : Modèles de nutrition personnalisés
- **Hébergement** : Netlify (gratuit)
- **Paiements** : PayPal

## Installation

1. **Cloner le repository** :
   ```bash
   git clone https://github.com/votre-username/nutriai-app.git
   cd nutriai-app
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   ```

3. **Démarrer le serveur de développement** :
   ```bash
   npm start
   ```

4. **Construire pour la production** :
   ```bash
   npm run build
   ```

## Déploiement

### Déploiement gratuit sur Netlify

1. **Créer un compte Netlify** (https://netlify.com)
2. **Installer Netlify CLI** :
   ```bash
   npm install -g netlify-cli
   ```
3. **Se connecter à Netlify** :
   ```bash
   npx netlify login
   ```
4. **Déployer** :
   ```bash
   npx netlify deploy --prod
   ```

### Configuration des paiements PayPal

1. **Créer un compte PayPal Business**
2. **Obtenir le Client ID** dans le tableau de bord PayPal
3. **Ajouter la variable d'environnement** `REACT_APP_PAYPAL_CLIENT_ID` dans Netlify

### Déploiement mobile

#### Android
```bash
npm install @capacitor/core @capacitor/cli
npx cap init
npx cap add android
npm run build
npx cap copy
npx cap open android
```

#### iOS (nécessite un Mac)
```bash
npx cap add ios
npm run build
npx cap copy
npx cap open ios
```

## Structure du projet

```
nutriai-app/
├── src/                 # Code source frontend
│   ├── components/      # Composants React
│   ├── locales/         # Fichiers de traduction
│   ├── api/             # Clients API
│   └── assets/          # Images et ressources
├── server/              # Backend Node.js
├── netlify/             # Fonctions Netlify
├── android/             # Configuration Android
├── ios/                 # Configuration iOS
├── public/              # Fichiers statiques
└── build/               # Build de production
```

## Développement

### Scripts disponibles

- `npm start` - Démarre le serveur de développement
- `npm run build` - Construit l'application pour la production
- `npm test` - Exécute les tests
- `npm run dev` - Démarre le frontend et le backend simultanément

### Internationalisation

L'application supporte 4 langues :
- Français (fr)
- Anglais (en)
- Espagnol (es)
- Arabe (ar)

Les fichiers de traduction se trouvent dans `src/locales/`.

## Contribution

Les contributions sont les bienvenues ! Veuillez lire le fichier CONTRIBUTING.md pour plus de détails.

## Licence

Ce projet est sous licence MIT - voir le fichier LICENSE.md pour plus de détails.

## Support

Pour obtenir de l'aide, veuillez :
1. Consulter la documentation
2. Ouvrir une issue sur GitHub
3. Contacter l'équipe de support NutriAI