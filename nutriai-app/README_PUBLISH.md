# Build & Publish Notes (NutriAI)

Ce document explique comment produire une PWA, des builds natifs (Capacitor) et un bundle desktop (Electron) à partir du projet Create React App contenu dans ce dossier.

Pré-requis
- Node.js (>=16), npm
- Android Studio pour builder Android
- Xcode / macOS pour builder iOS

1) PWA
- Le projet contient déjà `public/manifest.json` et `public/sw.js`.
- Pour tester localement :

```pwsh
cd nutriai-app
npm install
npm run build
npx serve -s build
# ouvrir http://localhost:5000 et vérifier le service worker dans DevTools > Application
```

2) Capacitor (Android / iOS)

Initialisation (une seule fois):

```pwsh
cd nutriai-app
npx @capacitor/cli@latest init
# ou utiliser les scripts ajoutés : npm run cap:copy puis npm run cap:open:android
```

Après `npm run build`, copier le build vers les projets natifs :

```pwsh
npm run build
npm run cap:copy
npm run cap:open:android
# ou npm run cap:open:ios (macOS requise pour ouvrir Xcode)
```

Remarque : la compilation iOS nécessite macOS/Xcode.

3) Electron (desktop)

- En développement, lancer l'app web puis lancer Electron :

```pwsh
cd nutriai-app
npm install
npm run dev:electron
```

- Pour builder un installable (Windows/macOS/linux) :

```pwsh
npm run build
npm run electron:build
```

Notes finales
- Ces scripts ajoutent des dépendances utiles (`@capacitor/cli`, `electron`, `electron-builder`). Installez-les via `npm install` avant de lancer les scripts.
- Pour une intégration CI (Android/iOS builds), il est recommandé d'utiliser des runners macOS pour iOS.
