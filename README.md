
# Evalution STUDI  | Frontend

### Lien utile 
GIT Frontend : https://github.com/jogoldirus/jo_frontend

GIT Backend : https://github.com/jogoldirus/jo_backend

Live : https://studijo.alexiscollignon.fr/

### Prérequis 
- Avoir NodeJS
- Avoir une connexion internet
- Avoir un ordinateur 

### Documentation technique 
#### Environnement de travail

Ce projet a été développer sous `Windows` avec les technologies suivantes : 

     Serveur : 
        - MariaDB
        - Apache
        - Certificat Let's Encrypt (HTTPS)
     Backend (API) :
        - NodeJS

     Frontend : 
        - ReactJS
        - TailwindCSS
        - Javascript
    
L'application est sécurisé, et utilise différences technologies pour s'y assurer :

 - Hashage des mots de passe.
 - Utilisation de token pour identifier l'utilisateur lors des requetes importantes. (JsonWebToken)
 - Utilisation de package ne dépendant de presque aucun autre pour s'assurer la viabilité de l'application dans le temps.
 

### Manuel d'utilisation

#### Installation
- Télécharger le projet Gib

- Aller dans le dossier du projet

- Installer les dépendances avec `npm install`

- Modifier le fichier vite.config.js pour cibler vers l'API en modifiant la ligne `target: "http://localhost:3010"`: 
`
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb'],
  server: {
    proxy: {
      '/api': {
        target: "http://localhost:3010",
        changeOrigin: true,
      },
    }
  },
  resolve: {
    alias: {
      unfetch: path.resolve(__dirname, "node_modules/unfetch/dist/unfetch.mjs"),
    }
  }
})
`

- Lancer l'application avec `npm run dev`

#### Utilisation

vous pouvez

- Vous crée un compte via le bouton `Inscription`
- Se connecter via le bouton `Connexion`
- Accéder a l'espace administrateur via le compte
`
   Email : admin@admin.com
`
`
    Password : Admin1
`
- En etant administrateur, vous pouvez crée,modifier ou supprimer les offres 

- Consulter vos billets sur l'espace utilisateur disponible en etant connecté et en cliquant sur `Mon espace`, et les télécharger en cliuquant sur `Mes billets et reservations`, mettre la souri sur un billet et cliquer sur le logo `Télechargement`

