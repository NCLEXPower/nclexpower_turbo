import { Dispatch, SetStateAction } from 'react';
import DOMPurify from 'dompurify';
import { ParsedHtml } from 'core-library/components';

export type selectedWordType = {
  word: string;
  wordIndex: number;
};

export const sortByWordIndex = (words: selectedWordType[]): selectedWordType[] => {
  // Sort words by wordIndex
  return words.sort((a, b) => a.wordIndex - b.wordIndex);
};

export const groupedByConsecutiveIndex = (words: selectedWordType[]): selectedWordType[][] => {
  const sortedWords = sortByWordIndex(words);

  const groupedByConsecutiveIndex: selectedWordType[][] = sortedWords.reduce<selectedWordType[][]>(
    (groups, current, index, array) => {
      if (index === 0 || current.wordIndex !== array[index - 1]?.wordIndex + 1) {
        // Create array for storing current
        groups.push([current]);
      } else {
        // Append current value to the groups that contain the word indices before
        groups[groups.length - 1].push(current);
      }
      return groups;
    },
    [],
  );

  return groupedByConsecutiveIndex;
};

export const mergeArrayString = (value: string | string[]): string => {
  return Array.isArray(value) ? value.join(' \n \n ') : value;
};

export const removeArrayDuplication = (item: selectedWordType[]): selectedWordType[] => {
  const removedDuplication = item.filter(
    (ele, index, array) =>
      // Filter out duplicate items based on wordIndex
      index === array.findIndex(elem => elem?.wordIndex === ele?.wordIndex),
  );

  const sortedItems = sortByWordIndex(removedDuplication);
  return sortedItems;
};

export const getHighlightedValues = (wordsInItem: string[]): selectedWordType[] => {
  const selectedHighlight = window.getSelection();
  if (!selectedHighlight) return [];

  const ariaLabel = selectedHighlight?.anchorNode?.parentElement?.ariaLabel;
  const parseAriaLabel = parseInt(ariaLabel ?? '');

  if (ariaLabel && selectedHighlight.toString()) {
    const selectedWord = selectedHighlight.toString().trim().replace(/\n/g, '');
    const wordsInSelectedWord = selectedWord.split(' ');

    const filteredWord = wordsInItem.flatMap((word, index) =>
      wordsInSelectedWord.filter(selectedWord => word === selectedWord).map(() => ({ word, wordIndex: index })),
    );

    const sortedFiltererWord = sortByWordIndex(filteredWord);

    const removedDuplication = removeArrayDuplication(sortedFiltererWord);
    const wordGroup = groupedByConsecutiveIndex(removedDuplication);

    const filterBySelectedAriaLabel = wordGroup.find(group => group.some(g => g.wordIndex === parseAriaLabel)) ?? [];

    return filterBySelectedAriaLabel;
  }

  return [];
};

export const handleHighlight = (
  wordsInItem: string[],
  setHighlightedWords: Dispatch<SetStateAction<selectedWordType[]>>,
): (() => void) => {
  const handleMouse = () => {
    const highlightedValue = getHighlightedValues(wordsInItem);

    setHighlightedWords(prevValues => {
      const combinedValues = [...prevValues, ...highlightedValue];

      // remove all highlighted words in combined values
      const filterCombinedValues = combinedValues.filter(
        values =>
          !prevValues
            .filter(value => highlightedValue.some(hValue => hValue.wordIndex === value.wordIndex))
            .some(prevValue => prevValue.wordIndex === values.wordIndex),
      );

      return filterCombinedValues;
    });
  };

  document.addEventListener('mouseup', handleMouse);
  return () => {
    document.removeEventListener('mouseup', handleMouse);
  };
};

export const renderHighlightText = (values: string[], highlightedWords: selectedWordType[]) => {
  const highlightedIndices = highlightedWords.map(w => w.wordIndex);

  return values.map((word, index) => {
    const isHighlighted = highlightedIndices.includes(index); // Check if the word should be highlighted
    const htmlContent = word.replace(/\n/g, '<br/>') + ' ';
    const sanitizeContent = DOMPurify.sanitize(htmlContent);

    return word.includes('<br/>') ? (
      <span key={index}>
        <ParsedHtml html={sanitizeContent} />
      </span>
    ) : (
      <span key={index} style={{ background: isHighlighted ? '#ffff00' : '' }} aria-label={`${index}`}>
        <ParsedHtml html={sanitizeContent} />
      </span>
    );
  });
};
