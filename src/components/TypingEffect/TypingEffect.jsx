import React, { useState, useEffect } from 'react';

const TypingAnimation = ({ words, delay }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const currentWord = words[currentWordIndex];

    let currentIndex = 0;
    const intervalId = setInterval(() => {
      setDisplayText(currentWord.slice(0, currentIndex + 1));
      currentIndex++;

      if (currentIndex === currentWord.length) {
        clearInterval(intervalId);

        setTimeout(() => {
          setCurrentWordIndex((currentWordIndex + 1) % words.length);
        }, delay);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [currentWordIndex, delay, words]);

  return <span className="overflow-hidden whitespace-no-wrap text-red-500">
      <div className="inline-block">{displayText}</div>
  </span>;
};

export default TypingAnimation;
