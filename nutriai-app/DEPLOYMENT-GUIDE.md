# Guide de Déploiement NutriAI

## Prérequis

1. **Node.js** (version 14 ou supérieure)
2. **Compte Netlify** (gratuit sur https://netlify.com)
3. **Compte PayPal Business** (pour les paiements)

## Étape 1 : Configuration de Netlify

1. **Créer un compte Netlify** :
   - Rendez-vous sur https://netlify.com
   - Cliquez sur "Sign up" et créez un compte

2. **Installer Netlify CLI** :
   ```bash
   npm install -g netlify-cli
   ```

3. **Se connecter à Netlify** :
   ```bash
   npx netlify login
   ```

## Étape 2 : Configuration du Repository

1. **Initialiser Git** (si ce n'est pas déjà fait) :
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Pousser vers GitHub/GitLab/Bitbucket** :
   - Créez un repository sur votre plateforme préférée
   - Suivez les instructions pour pousser votre code

## Étape 3 : Déploiement Initial

1. **Déploiement de test** :
   ```bash
   npx netlify deploy
   ```
   - Choisissez votre repository
   - Définissez "build" comme dossier de publication
   - Définissez "npm run build" comme commande de build

2. **Déploiement en production** :
   ```bash
   npx netlify deploy --prod
   ```

## Étape 4 : Configuration des Variables d'Environnement

1. **Dans Netlify** :
   - Allez dans "Site settings" > "Build & deploy" > "Environment"
   - Ajoutez les variables suivantes :
     - `REACT_APP_PAYPAL_CLIENT_ID` : Votre clé PayPal
     - `REACT_APP_API_URL` : URL de votre API (si différente)

## Étape 5 : Configuration PayPal

1. **Créer un compte PayPal Business** :
   - Rendez-vous sur https://paypal.com/business
   - Créez un compte Business (gratuit)
   - Vérifiez votre email et votre identité

2. **Obtenir les clés d'API** :
   - Allez dans "Mes outils" > "Intégration API"
   - Activez PayPal Checkout
   - Copiez votre "Client ID"

3. **Ajouter la clé à Netlify** :
   - Dans les variables d'environnement, ajoutez :
     - Nom : `REACT_APP_PAYPAL_CLIENT_ID`
     - Valeur : Votre Client ID PayPal

## Étape 6 : Déploiement Mobile

### Pour Android :
1. **Installer Capacitor** :
   ```bash
   npm install @capacitor/core @capacitor/cli
   npx cap init
   ```

2. **Ajouter la plateforme Android** :
   ```bash
   npx cap add android
   ```

3. **Générer l'application** :
   ```bash
   npm run build
   npx cap copy
   npx cap open android
   ```

### Pour iOS (nécessite un Mac) :
1. **Ajouter la plateforme iOS** :
   ```bash
   npx cap add ios
   ```

2. **Générer l'application** :
   ```bash
   npm run build
   npx cap copy
   npx cap open ios
   ```

## Étape 7 : Surveillance et Maintenance

1. **Configurer les domaines personnalisés** (optionnel) :
   - Dans Netlify, allez dans "Domain settings"
   - Ajoutez votre domaine personnalisé
   - Configurez les DNS selon les instructions

2. **Configurer SSL** :
   - Netlify gère automatiquement SSL pour les sites sur netlify.app
   - Pour les domaines personnalisés, Netlify provisionne automatiquement un certificat

3. **Surveillance des performances** :
   - Utilisez Netlify Analytics
   - Intégrez Google Analytics pour le suivi utilisateur

## Problèmes Courants et Solutions

### Problème : "Something is already running on port 3000"
**Solution** :
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :3000
kill -9 <PID>
```

### Problème : Erreurs de build
**Solution** :
1. Vérifiez que toutes les dépendances sont installées :
   ```bash
   npm install
   ```
2. Nettoyez le cache :
   ```bash
   npm run build -- --reset-cache
   ```

### Problème : Erreurs PayPal
**Solution** :
1. Vérifiez que votre `REACT_APP_PAYPAL_CLIENT_ID` est correct
2. Assurez-vous que votre compte PayPal Business est vérifié
3. Testez avec le mode sandbox de PayPal

## Commandes Utiles

```bash
# Développement local
npm start

# Construction pour la production
npm run build

# Déploiement sur Netlify (test)
npx netlify deploy

# Déploiement sur Netlify (production)
npx netlify deploy --prod

# Mise à jour des dépendances
npm update

# Vérification des vulnérabilités
npm audit
```

## Support

Pour toute question ou problème :
1. Consultez la documentation officielle de Netlify
2. Consultez la documentation officielle de PayPal
3. Contactez le support NutriAI