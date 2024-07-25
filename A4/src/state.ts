import { signal, computed } from "@preact/signals";

export interface I18nWord {
  "en-CA": string;
  "fr-CA": string;
  [key: string]: string;
}

export interface GameData {
  id: number;
  words: I18nWord[];
  consoleContent: string;
  numWords: number;
  fontSize: number;
  matchedWords: Set<string>;
  progressPercentage: number;
}

// Game Management
export const games = signal<GameData[]>([]);
export const selectedGameIndex = signal<number | null>(null);
export const language = signal<string>("en-CA");

export const canAddGame = computed(() => games.value.length < 20);
export const canDeleteGame = computed(() => games.value.length > 0);
export const canClearGames = computed(() => games.value.length > 0);

// Fetch random words from the API
const fetchRandomWords = async (numWords: number): Promise<I18nWord[]> => {
  const response = await fetch(`/myWordsApi/i18nwords?numWords=${numWords}`);
  const words = await response.json();
  return words;
};

// Functions to handle game operations
export const addGame = async () => {
  if (canAddGame.value) {
    const words = await fetchRandomWords(10); // Initial fetch with 10 random words
    const newGame: GameData = {
      id: games.value.length + 1,
      words: words,
      consoleContent: `Content for game console ${games.value.length + 1}`,
      numWords: 10, // Default value
      fontSize: 16, // Default value
      matchedWords: new Set(), // Initialize empty set for matched words
      progressPercentage: 0 // Initialize progress percentage
    };
    games.value = [...games.value, newGame];
  }
};

export const updateNumWords = async (gameId: number, numWords: number) => {
  const gameIndex = games.value.findIndex((game) => game.id === gameId);
  if (gameIndex !== -1) {
    const words = await fetchRandomWords(numWords);
    games.value[gameIndex] = {
      ...games.value[gameIndex],
      words: words,
      numWords: numWords,
      matchedWords: new Set(), // Reset matched words on updating numWords
      progressPercentage: 0 // Reset progress percentage
    };
    games.value = [...games.value]; // Trigger reactivity
  }
};

export const updateFontSize = (gameId: number, fontSize: number) => {
  const gameIndex = games.value.findIndex((game) => game.id === gameId);
  if (gameIndex !== -1) {
    games.value[gameIndex] = {
      ...games.value[gameIndex],
      fontSize: fontSize
    };
    games.value = [...games.value]; // Trigger reactivity
  }
};

export const resetGame = async (gameId: number) => {
  const gameIndex = games.value.findIndex((game) => game.id === gameId);
  if (gameIndex !== -1) {
    const words = await fetchRandomWords(10); // Reset with default 10 words
    games.value[gameIndex] = {
      ...games.value[gameIndex],
      words: words,
      numWords: 10, // Default value
      fontSize: 16, // Default value
      matchedWords: new Set(), // Reset matched words on reset
      progressPercentage: 0 // Reset progress percentage
    };
    games.value = [...games.value]; // Trigger reactivity
  }
};

export const matchWord = (gameId: number, word: string) => {
  const gameIndex = games.value.findIndex((game) => game.id === gameId);
  if (gameIndex !== -1) {
    const game = games.value[gameIndex];
    game.matchedWords.add(word);
    game.progressPercentage = (game.matchedWords.size / game.words.length) * 100;
    games.value = [...games.value]; // Trigger reactivity
  }
};

// Computed property to calculate game completion percentage for the selected game
export const gameCompleted = computed(() => {
  if (selectedGameIndex.value === null) return 0;
  const game = games.value[selectedGameIndex.value];
  return game ? game.progressPercentage : 0;
});

export const deleteGame = () => {
  if (selectedGameIndex.value !== null) {
    games.value = games.value.filter((_, index) => index !== selectedGameIndex.value);
    selectedGameIndex.value = null;
  } else if (canDeleteGame.value) {
    games.value = games.value.slice(0, -1);
  }
};

export const clearGames = () => {
  games.value = [];
  selectedGameIndex.value = null;
};

// Language selection
export const setLanguage = (lang: string) => {
  language.value = lang;
};
