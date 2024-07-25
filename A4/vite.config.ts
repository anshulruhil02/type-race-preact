/**
 * Modified Vite Server to Mock API calls
 * DO NOT CHANGE THIS FILE IN ANY WAY POSSIBLE!!!
 *
 * You can call generateRandomWords via the following fetch url:
 * fetch(/myWordsApi/i18nwords?numWords=N) 
 *     where N is a number >=0 representing the number of
 *     words you want to recieve back from the API.
 *
 * You are allowed to copy the interface for I18nWord into your own code.
 */

import { defineConfig, Plugin } from 'vite';
import preact from '@preact/preset-vite'

// You can copy-paste this I18nWord interface into your own model
interface I18nWord {
  "en-CA": string;
  "fr-CA": string;
  [key: string]: string; // Index signature to allow dynamic key access
}

/**
 * The top 100 most common words in english with their non-accented french counterparts!
 * https://www.espressoenglish.net/the-100-most-common-words-in-english/
 */
const i18nWords: I18nWord[] = [
  { "en-CA": "hello", "fr-CA": "bonjour" },
  { "en-CA": "time", "fr-CA": "temps" },
  { "en-CA": "year", "fr-CA": "an" },
  { "en-CA": "people", "fr-CA": "gens" },
  { "en-CA": "way", "fr-CA": "maniere" },
  { "en-CA": "day", "fr-CA": "jour" },
  { "en-CA": "man", "fr-CA": "homme" },
  { "en-CA": "thing", "fr-CA": "chose" },
  { "en-CA": "woman", "fr-CA": "femme" },
  { "en-CA": "life", "fr-CA": "vie" },
  { "en-CA": "child", "fr-CA": "enfant" },
  { "en-CA": "world", "fr-CA": "monde" },
  { "en-CA": "school", "fr-CA": "ecole" },
  { "en-CA": "state", "fr-CA": "etat" },
  { "en-CA": "family", "fr-CA": "famille" },
  { "en-CA": "student", "fr-CA": "etudiant" },
  { "en-CA": "group", "fr-CA": "groupe" },
  { "en-CA": "country", "fr-CA": "pays" },
  { "en-CA": "problem", "fr-CA": "probleme" },
  { "en-CA": "hand", "fr-CA": "main" },
  { "en-CA": "part", "fr-CA": "partie" },
  { "en-CA": "place", "fr-CA": "lieu" },
  { "en-CA": "case", "fr-CA": "cas" },
  { "en-CA": "week", "fr-CA": "semaine" },
  { "en-CA": "company", "fr-CA": "entreprise" },
  { "en-CA": "system", "fr-CA": "systeme" },
  { "en-CA": "program", "fr-CA": "programme" },
  { "en-CA": "question", "fr-CA": "question" },
  { "en-CA": "work", "fr-CA": "travail" },
  { "en-CA": "government", "fr-CA": "gouvernement" },
  { "en-CA": "number", "fr-CA": "nombre" },
  { "en-CA": "night", "fr-CA": "nuit" },
  { "en-CA": "point", "fr-CA": "point" },
  { "en-CA": "home", "fr-CA": "maison" },
  { "en-CA": "water", "fr-CA": "eau" },
  { "en-CA": "room", "fr-CA": "chambre" },
  { "en-CA": "mother", "fr-CA": "mere" },
  { "en-CA": "area", "fr-CA": "zone" },
  { "en-CA": "money", "fr-CA": "argent" },
  { "en-CA": "story", "fr-CA": "histoire" },
  { "en-CA": "fact", "fr-CA": "fait" },
  { "en-CA": "month", "fr-CA": "mois" },
  { "en-CA": "lot", "fr-CA": "beaucoup" },
  { "en-CA": "right", "fr-CA": "droit" },
  { "en-CA": "study", "fr-CA": "etude" },
  { "en-CA": "book", "fr-CA": "livre" },
  { "en-CA": "eye", "fr-CA": "oeil" },
  { "en-CA": "job", "fr-CA": "emploi" },
  { "en-CA": "word", "fr-CA": "mot" },
  { "en-CA": "business", "fr-CA": "affaires" },
  { "en-CA": "issue", "fr-CA": "probleme" },
  { "en-CA": "side", "fr-CA": "cote" },
  { "en-CA": "kind", "fr-CA": "genre" },
  { "en-CA": "head", "fr-CA": "tete" },
  { "en-CA": "house", "fr-CA": "maison" },
  { "en-CA": "service", "fr-CA": "service" },
  { "en-CA": "friend", "fr-CA": "ami" },
  { "en-CA": "father", "fr-CA": "pere" },
  { "en-CA": "power", "fr-CA": "pouvoir" },
  { "en-CA": "hour", "fr-CA": "heure" },
  { "en-CA": "game", "fr-CA": "jeu" },
  { "en-CA": "line", "fr-CA": "ligne" },
  { "en-CA": "end", "fr-CA": "fin" },
  { "en-CA": "member", "fr-CA": "membre" },
  { "en-CA": "law", "fr-CA": "loi" },
  { "en-CA": "car", "fr-CA": "voiture" },
  { "en-CA": "city", "fr-CA": "ville" },
  { "en-CA": "community", "fr-CA": "communaute" },
  { "en-CA": "name", "fr-CA": "nom" },
  { "en-CA": "president", "fr-CA": "president" },
  { "en-CA": "team", "fr-CA": "equipe" },
  { "en-CA": "minute", "fr-CA": "minute" },
  { "en-CA": "idea", "fr-CA": "idee" },
  { "en-CA": "kid", "fr-CA": "gamin" },
  { "en-CA": "body", "fr-CA": "corps" },
  { "en-CA": "information", "fr-CA": "information" },
  { "en-CA": "back", "fr-CA": "arriere" },
  { "en-CA": "parent", "fr-CA": "parent" },
  { "en-CA": "face", "fr-CA": "visage" },
  { "en-CA": "others", "fr-CA": "autres" },
  { "en-CA": "level", "fr-CA": "niveau" },
  { "en-CA": "office", "fr-CA": "bureau" },
  { "en-CA": "door", "fr-CA": "porte" },
  { "en-CA": "health", "fr-CA": "sante" },
  { "en-CA": "person", "fr-CA": "personne" },
  { "en-CA": "art", "fr-CA": "art" },
  { "en-CA": "war", "fr-CA": "guerre" },
  { "en-CA": "history", "fr-CA": "histoire" },
  { "en-CA": "party", "fr-CA": "fete" },
  { "en-CA": "result", "fr-CA": "resultat" },
  { "en-CA": "change", "fr-CA": "changement" },
  { "en-CA": "morning", "fr-CA": "matin" },
  { "en-CA": "reason", "fr-CA": "raison" },
  { "en-CA": "research", "fr-CA": "recherche" },
  { "en-CA": "girl", "fr-CA": "fille" },
  { "en-CA": "guy", "fr-CA": "gars" },
  { "en-CA": "moment", "fr-CA": "moment" },
  { "en-CA": "air", "fr-CA": "air" },
  { "en-CA": "teacher", "fr-CA": "professeur" },
  { "en-CA": "force", "fr-CA": "force" },
  { "en-CA": "education", "fr-CA": "education" },
  { "en-CA": "goose", "fr-CA": "oie" },
  { "en-CA": "waterloo", "fr-CA": "waterloo" },
  { "en-CA": "honk", "fr-CA": "klaxon" },
];

/**
 * Creates a list of n random english words.
 * @param n number of words to generate
 * @returns a list of n random words
 */
function generateRandomWords(n: number): I18nWord[] {
  const randomWords: I18nWord[] = [];

  for (let i = 0; i < n; i++) {
    const randomIndex = Math.floor(Math.random() * i18nWords.length);
    randomWords.push(i18nWords[randomIndex]);
  }

  return randomWords;
}

// A custom Vite server plugin that you can fetch data from
// via the url "/myWordsApi/i18nwords?numWords=N"
const apiPlugin: Plugin = {
  name: 'vite-plugin-api',
  configureServer(server) {
    server.middlewares.use('/myWordsApi/i18nwords', (req, res) => {
      const url = new URL(req.originalUrl, `http://localhost`);
      const count = parseInt(url.searchParams.get('numWords') || '20', 10);
      // Artificial delay, it is okay to set this to 0 while testing
      const delay = parseInt(url.searchParams.get('delay') || '100', 10);

      setTimeout(() => {
        const words = generateRandomWords(count);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(words));
      }, delay);
    });
  }
};

export default defineConfig({
  plugins: [preact(), apiPlugin],
  server: {
    port: 3000,
    open: true
  }
});