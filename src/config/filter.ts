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
      word = this.cleanWord(word);
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
    this.forbiddenWords.map((forbiddenWord) => {
      forbiddenWord.word = this.cleanWord(forbiddenWord.word);
      if (forbiddenWord.word.includes(' ')) {
        if (phrase.includes(forbiddenWord.word)) messageForbiddenPhrases.push(forbiddenWord);
      }
    });

    // Return the forbidden phrases found in the message
    return messageForbiddenPhrases;
  }

  cleanWord(word: string) {
    word = word.trim().toLowerCase().replace('.', '');
    word = word.replace('3', 'e');
    word = word.replace('0', 'o');
    word = word.replace('4', 'a');
    word = word.replace('1', 'i');
    word = word.replace('@', 'a');
    word = word.replace('&', 'e');

    return word;
  }
}

export default (forbiddenWords: { id: string; word: string }[]) => {
  return new Filter(forbiddenWords);
};
