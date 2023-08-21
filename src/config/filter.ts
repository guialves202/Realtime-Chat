class Filter {
  forbiddenWords: { id: string; word: string }[];

  constructor(forbiddenWords: { id: string; word: string }[]) {
    // Save the list of all forbidden words
    this.forbiddenWords = forbiddenWords;
  }

  filterWords(words: string[]) {
    const messageForbiddenWords: { id: string; word: string }[] = [];

    // Compare each word of the message and see if it is forbidden
    words.map((word) => {
      this.forbiddenWords.map((forbiddenWord) => {
        if (forbiddenWord.word === word) messageForbiddenWords.push(forbiddenWord);
      });
    });

    // Return an array of all forbidden words found in the message
    return messageForbiddenWords;
  }

  filterPhrases(phrase: string) {
    const messageForbiddenPhrases: { id: string; word: string }[] = [];

    // Search for forbidden phrases in the message
    this.forbiddenWords.map((word) => {
      if (word.word.includes(' ')) {
        if (phrase.includes(word.word)) messageForbiddenPhrases.push(word);
      }
    });

    // Return the forbidden phrases found in the message
    return messageForbiddenPhrases;
  }
}

export default (forbiddenWords: { id: string; word: string }[]) => {
  return new Filter(forbiddenWords);
};
