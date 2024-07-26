import { signal, computed } from "@preact/signals";
import { UndoManager } from "./UndoManager";

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
  matchedWords: Set<number>;
  progressPercentage: number;
  undoManager: UndoManager;
}

// Game Management
export const games = signal<GameData[]>([]);
export const selectedGameIndex = signal<number | null>(null);
export const language = signal<string>("en-CA");

export const canAddGame = computed(() => games.value.length < 20);
export const canDeleteGame = computed(() => games.value.length > 0);
export const canClearGames = computed(() => games.value.length > 0);
export const canUndo = computed(() => {
  const game = games.value[selectedGameIndex.value!];
  return game ? game.undoManager.canUndo() : false;
});
export const canRedo = computed(() => {
  const game = games.value[selectedGameIndex.value!];
  return game ? game.undoManager.canRedo() : false;
});

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
      progressPercentage: 0, // Initialize progress percentage
      undoManager: new UndoManager(), // Initialize UndoManager
    };
    games.value = [...games.value, newGame];
  }
};

export const updateNumWords = async (gameId: number, numWords: number) => {
  const gameIndex = games.value.findIndex((game) => game.id === gameId);
  if (gameIndex !== -1) {
    const game = games.value[gameIndex];
    const prevNumWords = game.numWords;
    const words = await fetchRandomWords(numWords);

    game.undoManager.addAction({
      undo: () => {
        game.words = game.words.slice(0, prevNumWords);
        game.numWords = prevNumWords;
        games.value = [...games.value];
      },
      redo: () => {
        game.words = words;
        game.numWords = numWords;
        games.value = [...games.value];
      }
    });

    game.words = words;
    game.numWords = numWords;
    game.matchedWords = new Set(); // Reset matched words on updating numWords
    game.progressPercentage = 0; // Reset progress percentage
    games.value = [...games.value]; // Trigger reactivity
  }
};

export const updateFontSize = (gameId: number, fontSize: number) => {
  const gameIndex = games.value.findIndex((game) => game.id === gameId);
  if (gameIndex !== -1) {
    const game = games.value[gameIndex];
    const prevFontSize = game.fontSize;

    game.undoManager.addAction({
      undo: () => {
        game.fontSize = prevFontSize;
        games.value = [...games.value];
      },
      redo: () => {
        game.fontSize = fontSize;
        games.value = [...games.value];
      }
    });

    game.fontSize = fontSize;
    games.value = [...games.value]; // Trigger reactivity
  }
};

export const resetGame = async (gameId: number) => {
  const gameIndex = games.value.findIndex((game) => game.id === gameId);
  if (gameIndex !== -1) {
    const game = games.value[gameIndex];
    const prevWords = game.words;
    const prevNumWords = game.numWords;
    const prevMatchedWords = new Set(game.matchedWords);
    const prevFontSize = game.fontSize;
    const words = await fetchRandomWords(10); // Reset with default 10 words

    game.undoManager.addAction({
      undo: () => {
        game.words = prevWords;
        game.numWords = prevNumWords;
        game.matchedWords = prevMatchedWords;
        game.fontSize = prevFontSize;
        games.value = [...games.value];
      },
      redo: async () => {
        const newWords = await fetchRandomWords(10);
        game.words = newWords;
        game.numWords = 10;
        game.matchedWords = new Set();
        game.fontSize = 16;
        games.value = [...games.value];
      }
    });

    game.words = words;
    game.numWords = 10; // Default value
    game.fontSize = 16; // Default value
    game.matchedWords = new Set(); // Reset matched words on reset
    game.progressPercentage = 0; // Reset progress percentage
    games.value = [...games.value]; // Trigger reactivity
  }
};

export const matchWord = (gameId: number, word: string, index: number) => {
  const gameIndex = games.value.findIndex((game) => game.id === gameId);
  if (gameIndex !== -1) {
    const game = games.value[gameIndex];
    if (!game.matchedWords.has(index)) {
      const prevMatchedWords = new Set(game.matchedWords);

      game.undoManager.addAction({
        undo: () => {
          game.matchedWords = prevMatchedWords;
          game.progressPercentage = (prevMatchedWords.size / game.words.length) * 100;
          games.value = [...games.value];
        },
        redo: () => {
          game.matchedWords.add(index);
          game.progressPercentage = (game.matchedWords.size / game.words.length) * 100;
          games.value = [...games.value];
        }
      });

      game.matchedWords.add(index);
      game.progressPercentage = (game.matchedWords.size / game.words.length) * 100;
      games.value = [...games.value]; // Trigger reactivity
    }
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
