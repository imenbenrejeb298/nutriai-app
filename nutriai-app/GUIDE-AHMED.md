# Guide d'Utilisation NutriAI - Pour Ahmed

Bonjour Ahmed, ce guide vous aidera à déployer et gérer votre application NutriAI.

## Vos Informations

- **Nom** : Ahmed
- **Poids** : 112kg
- **Taille** : 172cm
- **Conditions de santé** : Diabète et Hypertension

## Étape 1 : Configuration Initiale

### 1. Installation des outils nécessaires

1. **Node.js** :
   - Téléchargez et installez Node.js depuis https://nodejs.org
   - Choisissez la version LTS (recommandée)

2. **Compte Netlify** :
   - Rendez-vous sur https://netlify.com
   - Créez un compte gratuit avec votre email

### 2. Préparation du projet

1. **Ouvrir le terminal** :
   - Appuyez sur la touche Windows
   - Tapez "PowerShell" et ouvrez "Windows PowerShell"

2. **Naviguer vers le dossier du projet** :
   ```powershell
   cd "C:\Users\Dell\Desktop\nutriai-app\nutriai-app"
   ```

## Étape 2 : Déploiement de l'Application Web

### 1. Installation des dépendances

Dans le terminal, exécutez :
```powershell
npm install
```

### 2. Construction de l'application

```powershell
npm run build
```

### 3. Déploiement sur Netlify

```powershell
npx netlify deploy --prod
```

Suivez les instructions à l'écran :
- Connectez-vous à votre compte Netlify
- Choisissez le site ou créez-en un nouveau
- Confirmez le déploiement

## Étape 3 : Configuration des Paiements PayPal

### 1. Créer un compte PayPal Business

1. Rendez-vous sur https://paypal.com/business
2. Cliquez sur "Créer un compte Business"
3. Suivez les étapes d'inscription
4. Vérifiez votre email et votre identité

### 2. Obtenir votre Client ID

1. Connectez-vous à votre compte PayPal Business
2. Allez dans "Mes outils" > "Intégration API"
3. Activez PayPal Checkout
4. Copiez votre "Client ID"

### 3. Ajouter la clé à Netlify

1. Dans Netlify, allez dans "Site settings" > "Build & deploy" > "Environment"
2. Cliquez sur "Edit variables"
3. Ajoutez une nouvelle variable :
   - Key : `REACT_APP_PAYPAL_CLIENT_ID`
   - Value : Votre Client ID PayPal
4. Cliquez sur "Save"

## Étape 4 : Déploiement Mobile

### Pour Android

1. Dans le terminal :
   ```powershell
   npm install @capacitor/core @capacitor/cli
   npx cap init
   npx cap add android
   npm run build
   npx cap copy
   npx cap open android
   ```

2. Dans Android Studio :
   - Cliquez sur "Build" > "Generate Signed Bundle / APK"
   - Suivez les étapes pour créer votre APK

### Pour iOS (nécessite un Mac)

1. Dans le terminal :
   ```powershell
   npx cap add ios
   npm run build
   npx cap copy
   npx cap open ios
   ```

## Étape 5 : Gestion Quotidienne

### Mise à jour du contenu

Pour mettre à jour les textes et traductions :
1. Modifiez les fichiers dans `src/locales/`
2. Exécutez :
   ```powershell
   npm run build
   npx netlify deploy --prod
   ```

### Surveillance des performances

1. Dans Netlify, allez dans l'onglet "Analytics"
2. Consultez les statistiques de trafic
3. Surveillez les erreurs dans "Deploys"

## Support et Maintenance

### Problèmes courants

**Problème : "Something is already running on port 3000"**
```powershell
# Trouver le processus
netstat -ano | findstr :3000
# Tuer le processus (remplacez XXXX par le PID trouvé)
taskkill /PID XXXX /F
```

**Problème : Erreurs de build**
```powershell
npm run build -- --reset-cache
```

### Contact pour assistance

Si vous rencontrez des problèmes :
1. Consultez ce guide
2. Vérifiez les logs d'erreur dans le terminal
3. Contactez le support NutriAI

## Conseils pour votre Santé

En tant qu'utilisateur avec diabète et hypertension, NutriAI vous fournira :
- Des plans de repas adaptés à votre condition
- Des recommandations pour gérer votre glycémie
- Des conseils pour contrôler votre tension
- Un suivi personnalisé de votre progression

N'oubliez pas de consulter régulièrement votre médecin et d'utiliser NutriAI comme complément, pas comme substitut, aux conseils médicaux professionnels.

## Prochaines Étapes

1. **Cette semaine** : Déployer l'application web
2. **Semaine prochaine** : Configurer les paiements PayPal
3. **Dans un mois** : Déployer les applications mobiles
4. **En continu** : Améliorer le contenu basé sur les retours utilisateurs

Bonne chance avec NutriAI, Ahmed ! L'équipe est là pour vous aider à chaque étape.