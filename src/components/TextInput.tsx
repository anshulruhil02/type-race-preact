import { h } from 'preact';
import { useState } from 'preact/hooks';
import { matchWord, games, selectedGameIndex, language } from '../state';

const TextInput = ({ disabled }: { disabled?: boolean }) => {
  const [inputValue, setInputValue] = useState('');
  const currentLanguage = language.value;
  const currentGame = games.value[selectedGameIndex.value!];

  const handleChange = (e: Event) => {
    setInputValue((e.target as HTMLInputElement).value);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && selectedGameIndex.value !== null && !disabled) {
      const wordIndex = currentGame.words.findIndex((word, index) => word[currentLanguage] === inputValue.trim() && !currentGame.matchedWords.has(index));
      if (wordIndex !== -1) {
        matchWord(currentGame.id, inputValue.trim(), wordIndex);
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
      disabled={disabled}
    />
  );
};

export default TextInput;
