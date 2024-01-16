# Technical test

## What bugs did you find ? 

Voici les 3 bugs : 

Bug 1 : Quand on crée un user dans "People" on est redirigé sur la page mais le name de l'user n'est pas affiché et quand on clique sur l'user pour l'update le champs n'est pas pré-rempli , à cause de l'attribut disabled sur l'input.

Bug 2 : Le bouton update ne fonctionne pas , car le bouton utilise un évent onChange au lieu d'un onClick.

Bug 3 : TypeError quand on clique sur un projet , car dans le back-end dans le controller pour rechcher un projet on utilise la méthod find alors qu'il faudrait utiliser la méthode findOne , le back renvoyait plusieurs projets au lieu d'un objet.

## Which feature did you develop and why ?

## Nouvelle Fonctionnalité la Chatroom :

J'ai décidé d'implémenter comme nouvelle fonctionnalité la Chatroom afin de créer des room sur les différents projets pour facilité l'échange sur la plateforme.  

J'ai utilisé scoket.io que j'ai configuré dans le front et dans le back j'ai créé le model Message afin d'enregistrer les messages dans la base de donnée et d'afficher les anciens messages dans le chat. C'est la première fois que j'implémente la bibliothèque socket.io et je suis contente du résultat.

## Do you have any feedback about the code / architecture of the project and what was the difficulty you encountered while doing it 

Je n'ai pas rencontré de difficulté au niveau de l'architecture du code , L'API REST est claire, mais personellement je préfere séparer les routes du controllers en créant un dossier routes dans lequel j'appel les fonctions du controllers et dans le front le nom des fichiers dans chacune des scenes (index ,list ,utils ,view) lorsque les fichiers sont ouvert le nom des onglets sont les même pour se retrouver peut être ajouter le nom de la scène comme activityList.js , ActivityView.js.

## Introduction

Fabien just came back from a meeting with an incubator and told them we have a platform “up and running” to monitor people's activities and control the budget for their startups !

All others developers are busy and we need you to deliver the app for tomorrow.
Some bugs are left and we need you to fix those. Don't spend to much time on it.

We need you to follow these steps to understand the app and to fix the bug : 
 - Sign up to the app
 - Create at least 2 others users on people page ( not with signup ) 
 - Edit these profiles and add aditional information 
 - Create a project
 - Input some information about the project
 - Input some activities to track your work in the good project
  
Then, see what happens in the app and fix the bug you found doing that.

## Then
Time to be creative, and efficient. Do what you think would be the best for your product under a short period.

### The goal is to fix at least 3 bugs and implement 1 quick win feature than could help us sell the platform

## Setup api

- cd api
- Run `npm i`
- Run `npm run dev`

## Setup app

- cd app
- Run `npm i`
- Run `npm run dev`

## Finally

Send us the project and answer to those simple questions : 
- What bugs did you find ? How did you solve these and why ? 
- Which feature did you develop and why ? 
- Do you have any feedback about the code / architecture of the project and what was the difficulty you encountered while doing it ? 

