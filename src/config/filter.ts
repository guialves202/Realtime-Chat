class Filter {
  forbiddenWords: { id: string; word: string }[];

  constructor(forbiddenWords: { id: string; word: string }[]) {
    this.forbiddenWords = forbiddenWords;
  }

  filterWords(words: string[]) {
    const messageForbiddenWords: { id: string; word: string }[] = [];
    words.map((word) => {
      this.forbiddenWords.map((forbiddenWord) => {
        if (forbiddenWord.word === word) messageForbiddenWords.push(forbiddenWord);
      });
    });
    return messageForbiddenWords;
  }

  filterPhrases() {}
}

export default (forbiddenWords: { id: string; word: string }[]) => {
  return new Filter(forbiddenWords);
};
