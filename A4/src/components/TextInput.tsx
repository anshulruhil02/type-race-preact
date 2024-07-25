import { h } from 'preact';
import { useState } from 'preact/hooks';
import { matchWord, games, selectedGameIndex, language } from '../state';

const TextInput = () => {
  const [inputValue, setInputValue] = useState('');
  const currentLanguage = language.value;
  const currentGame = games.value[selectedGameIndex.value!];

  const handleChange = (e: Event) => {
    setInputValue((e.target as HTMLInputElement).value);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && selectedGameIndex.value !== null) {
      const nextWordToMatch = currentGame.words.find(word => !currentGame.matchedWords.has(currentGame.words.indexOf(word)));
      if (nextWordToMatch && inputValue.trim() === nextWordToMatch[currentLanguage]) {
        matchWord(currentGame.id, inputValue.trim());
        setInputValue('');
      }
    }
  };

  return (
    <input
      type="text"
      value={inputValue}
      onInput={handleChange}
      onKeyPress={handleKeyPress}
      className="w-full p-2 border border-gray-300 rounded"
    />
  );
};

export default TextInput;
