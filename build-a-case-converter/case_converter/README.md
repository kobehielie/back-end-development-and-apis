# Build a File Processor

Ce projet explore la manipulation de fichiers, les streams et les modules natifs de Node.js (`fs`, `path`, `os`, `crypto`, `buffer`, `process`) dans le cadre du cursus *Back End Development and APIs* de freeCodeCamp.

## Licence 
 
La licence est de type MIT.

## Fonctionnalités couvertes

- **Lecture et écriture de fichiers** : Utilisation des méthodes synchrones, asynchrones (callbacks) et basées sur les promesses (`fs/promises`).
- **Streams (Flux de données)** : Création de flux de lecture (`createReadStream`) et d'écriture (`createWriteStream`), ainsi que l'enchaînement avec `.pipe()`.
- **Informations système et processus** : Inspection de l'environnement d'exécution via les modules `os` et `process`.
- **Manipulation de chemins** : Analyse et résolution de chemins de fichiers avec `path` (`join`, `resolve`, `parse`, `basename`, `dirname`, `extname`).
- **Cryptographie et Buffers** : Décodage en Base64, hachage SHA-256 et génération d'identifiants uniques (UUID).

## Structure du projet

```text
build-a-file-processor/
├── assets/
│   ├── poem.txt
│   ├── output.txt
│   └── stream-output.txt
├── package.json
├── README.md
└── server.js

```js
const caseConverter = require("./index");
const str = "hello free Code Camp!";
console.log(caseConverter.getUpperCase(str)); // HELLO FREE CODE CAMP!
console.log(caseConverter.getLowerCase(str)); // hello free code camp!
console.log(caseConverter.getProperCase(str)); // Hello Free Code Camp!
console.log(caseConverter.getSentenceCase(str)); //
```