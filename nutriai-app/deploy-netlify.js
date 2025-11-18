#!/usr/bin/env node

// Script de déploiement pour Netlify
const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Préparation du déploiement Netlify...');

try {
  // 1. Construire l'application
  console.log('🏗️  Construction de l\'application...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // 2. Vérifier que le build existe
  if (!fs.existsSync('build')) {
    throw new Error('Le dossier build n\'existe pas après la construction');
  }
  
  // 3. Vérifier que les fonctions Netlify existent
  if (!fs.existsSync('netlify/functions')) {
    throw new Error('Le dossier netlify/functions n\'existe pas');
  }
  
  // 4. Déployer avec Netlify CLI
  console.log('📡 Déploiement sur Netlify...');
  execSync('npx netlify deploy --prod', { stdio: 'inherit' });
  
  console.log('✅ Déploiement terminé avec succès!');
  
} catch (error) {
  console.error('❌ Erreur lors du déploiement:', error.message);
  process.exit(1);
}