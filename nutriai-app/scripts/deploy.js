#!/usr/bin/env node

// Script de déploiement automatisé pour NutriAI
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Couleurs pour la console
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',
  
  fg: {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m'
  },
  
  bg: {
    black: '\x1b[40m',
    red: '\x1b[41m',
    green: '\x1b[42m',
    yellow: '\x1b[43m',
    blue: '\x1b[44m',
    magenta: '\x1b[45m',
    cyan: '\x1b[46m',
    white: '\x1b[47m'
  }
};

// Fonctions utilitaires
const log = {
  info: (msg) => console.log(`${colors.fg.cyan}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.fg.green}✔${colors.reset} ${msg}`),
  warn: (msg) => console.log(`${colors.fg.yellow}⚠${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.fg.red}✖${colors.reset} ${msg}`),
  title: (msg) => console.log(`\n${colors.bright}${colors.fg.blue}${msg}${colors.reset}\n`)
};

const exec = (command, options = {}) => {
  try {
    const result = execSync(command, { 
      stdio: 'inherit', 
      ...options 
    });
    return result;
  } catch (error) {
    throw new Error(`Command failed: ${command}\n${error.message}`);
  }
};

// Fonction principale de déploiement
async function deploy() {
  try {
    log.title('🚀 NutriAI - Déploiement Automatisé');
    
    // Vérifier les prérequis
    log.info('Vérification des prérequis...');
    
    // Vérifier Node.js
    try {
      execSync('node --version', { stdio: 'ignore' });
      log.success('Node.js trouvé');
    } catch {
      throw new Error('Node.js n\'est pas installé. Veuillez l\'installer depuis https://nodejs.org');
    }
    
    // Vérifier npm
    try {
      execSync('npm --version', { stdio: 'ignore' });
      log.success('npm trouvé');
    } catch {
      throw new Error('npm n\'est pas installé. Veuillez l\'installer depuis https://nodejs.org');
    }
    
    // Vérifier Netlify CLI
    try {
      execSync('npx netlify --version', { stdio: 'ignore' });
      log.success('Netlify CLI trouvé');
    } catch {
      log.info('Installation de Netlify CLI...');
      exec('npm install -g netlify-cli');
      log.success('Netlify CLI installé');
    }
    
    // Nettoyer les builds précédents
    log.info('Nettoyage des builds précédents...');
    if (fs.existsSync('build')) {
      fs.rmSync('build', { recursive: true, force: true });
      log.success('Dossier build supprimé');
    }
    
    // Installer les dépendances
    log.title('📦 Installation des dépendances');
    exec('npm install');
    log.success('Dépendances installées');
    
    // Construire l'application
    log.title('🏗️  Construction de l\'application');
    exec('npm run build');
    
    // Vérifier que le build existe
    if (!fs.existsSync('build')) {
      throw new Error('Le dossier build n\'existe pas après la construction');
    }
    
    log.success('Application construite avec succès');
    
    // Déployer avec Netlify
    log.title('📡 Déploiement sur Netlify');
    
    // Vérifier si l'utilisateur est connecté à Netlify
    try {
      execSync('npx netlify status', { stdio: 'ignore' });
      log.success('Déjà connecté à Netlify');
    } catch {
      log.info('Connexion à Netlify requise');
      log.warn('Veuillez vous connecter à Netlify dans le navigateur qui va s\'ouvrir');
      await new Promise(resolve => setTimeout(resolve, 3000));
      exec('npx netlify login');
    }
    
    // Déploiement
    log.info('Déploiement en cours...');
    exec('npx netlify deploy --prod');
    
    log.title('🎉 Déploiement terminé avec succès!');
    log.success('Votre application NutriAI est maintenant en ligne!');
    
    // Instructions supplémentaires
    log.title('📋 Prochaines étapes');
    console.log(`
${colors.fg.yellow}1. Configuration PayPal:${colors.reset}
   - Créez un compte PayPal Business sur https://paypal.com/business
   - Obtenez votre Client ID dans le tableau de bord PayPal
   - Ajoutez la variable d'environnement REACT_APP_PAYPAL_CLIENT_ID dans Netlify

${colors.fg.yellow}2. Configuration du domaine personnalisé (optionnel):${colors.reset}
   - Dans Netlify, allez dans "Domain settings"
   - Ajoutez votre domaine personnalisé
   - Configurez les DNS selon les instructions

${colors.fg.yellow}3. Déploiement mobile:${colors.reset}
   - Pour Android: npx cap add android && npx cap open android
   - Pour iOS: npx cap add ios && npx cap open ios
    `);
    
  } catch (error) {
    log.error(`Erreur lors du déploiement: ${error.message}`);
    process.exit(1);
  }
}

// Exécuter le déploiement
if (require.main === module) {
  deploy();
}

module.exports = { deploy };