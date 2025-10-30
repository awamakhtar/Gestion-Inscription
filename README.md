🎓 Système de Gestion des Inscriptions Scolaires en Ligne

Un système complet de gestion des inscriptions scolaires permettant aux parents d'inscrire leurs enfants en ligne et à l'administration de gérer les demandes via un panel moderne.

Table des matières
Aperçu
Fonctionnalités
Technologies utilisées
Prérequis
Installation
Configuration
Utilisation
Structure du projet
API Documentation
Contribution
Licence

🎯 Aperçu
Ce projet est une solution moderne et complète pour digitaliser le processus d'inscription scolaire. Il se compose de deux parties principales :
Frontend (React) : Interface parent pour l'inscription en ligne
Backend (Laravel + Filament) : API RESTful et panel d'administration
Captures d'écran


✨ Fonctionnalités
Côté Parents (Frontend React)
✅ Création de compte parent
✅ Connexion sécurisée
✅ Formulaire d'inscription multi-étapes

Informations de l'élève
Informations du parent/tuteur
Téléchargement de documents (acte de naissance, photo, etc.)
Récapitulatif et validation

✅ Création de compte parent
✅ Connexion sécurisée
✅ Formulaire d'inscription multi-étapes
Informations de l'élève
Informations du parent/tuteur
Téléchargement de documents (acte de naissance, photo, etc.)
Récapitulatif et validation
✅ Suivi du statut de l'inscription en temps réel
✅ Tableau de bord parent
✅ Historique des inscriptions
✅ Gestion des documents
✅ Notifications toast
✅ Design responsive (mobile-friendly)

Côté Administration (Filament)
✅ Dashboard avec statistiques en temps réel
✅ Graphiques d'évolution des inscriptions
✅ Gestion complète des inscriptions
Approuver/Rejeter
Marquer comme incomplet
Assigner à une classe
Envoyer des messages aux parents
✅ Gestion des élèves
✅ Gestion des niveaux scolaires (CI, CP, CE1, etc.)
✅ Gestion des classes et capacités
✅ Gestion des années scolaires
✅ Gestion des utilisateurs (parents et admins)
✅ Visualisation des documents uploadés
✅ Filtres et recherche avancés
✅ Timeline de progression des dossiers
✅ Notifications système

🛠️ Technologies utilisées
Frontend

React 18 - Framework JavaScript
Vite - Build tool moderne
Tailwind CSS - Framework CSS utility-first
React Router DOM - Routing
Axios - Client HTTP
React Hook Form - Gestion des formulaires
Yup - Validation de schémas
Lucide React - Icônes
React Hot Toast - Notifications
React DatePicker - Sélecteur de dates

Backend

Laravel 10 - Framework PHP
MySQL - Base de données
Laravel Sanctum - Authentification API
Filament 3 - Panel d'administration
Intervention Image - Manipulation d'images

📦 Prérequis

PHP >= 8.1
Composer >= 2.0
Node.js >= 18.0
NPM ou Yarn
MySQL >= 8.0
Git

🚀 Installation
1. Créer le repository
git init
git add .
git commit -m "commentaire"
git remote add origin https://github.com/awamakhtar/Gestion-Inscription.git
git push origin 
2. Installation du Backend (Laravel)
# Aller dans le dossier backend
cd backend

# Installer les dépendances PHP
composer install

# Copier le fichier d'environnement
cp .env.example .env

# Générer la clé d'application
php artisan key:generate

# Configurer la base de données dans .env
# DB_DATABASE=school_registration
# DB_USERNAME=root
# DB_PASSWORD=

# Créer la base de données
mysql -u root -p -e "CREATE DATABASE school_registration CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Exécuter les migrations
php artisan migrate

# Insérer les données de test
php artisan db:seed

# Créer le lien symbolique pour le stockage
php artisan storage:link

# Installer Filament
composer require filament/filament:"^3.0"
php artisan filament:install --panels

3. Installation du Frontend (React)
# Aller dans le dossier frontend
cd ../frontend

# Installer les dépendances Node
npm install

# Copier le fichier d'environnement
cp .env.example .env

# Configurer l'URL de l'API dans .env
# VITE_API_URL=http://localhost:8000/api

⚙️ Configuration
Backend (.env)
APP_NAME="École Excellence"
APP_ENV=local
APP_KEY=base64:...
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=school_registration
DB_USERNAME=root
DB_PASSWORD=

SESSION_DRIVER=cookie
SESSION_DOMAIN=localhost

SANCTUM_STATEFUL_DOMAINS=localhost:3000,127.0.0.1:3000

FRONTEND_URL=http://localhost:3000

# Démarrer le Backend
cd backend
php artisan serve
# Le serveur démarre sur http://localhost:8000

# Démarrer le Frontend
cd frontend
npm run dev
# Le serveur démarre sur http://localhost:3000