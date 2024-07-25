import { h } from 'preact';

interface GameProgressMatchedWordsProps {
  matchedWords: number;
  totalWords: number;
}

const GameProgressMatchedWords = ({ matchedWords, totalWords }: GameProgressMatchedWordsProps) => {
  const displayText = matchedWords === totalWords
    ? "All words matched"
    : `${matchedWords} / ${totalWords} Words Matched`;

  return (
    <div style={{ textAlign: 'center' }}>
      {displayText}
    </div>
  );
};

export default GameProgressMatchedWords;
