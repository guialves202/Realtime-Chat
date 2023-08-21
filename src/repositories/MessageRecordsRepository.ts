import prisma from '../database/prisma';

class MessageRecordsRepository {
  async findAll() {
    const records = await prisma.messageRecord.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return records;
  }

  async create(data: { username: string; message: string; wordArray: { id: string; word: string }[] }) {
    const message = await prisma.messageRecord.create({
      data: {
        username: data.username,
        message: data.message,
      },
    });

    const wordsInsertData: { messageId: string; word: string }[] = [];

    // Format the data for save the forbidden words found in the message
    data.wordArray.forEach((word) => {
      wordsInsertData.push({ messageId: message.id, word: word.word });
    });

    // Save each forbidden word found in the message separately
    await prisma.messageWordRecord.createMany({
      data: [...wordsInsertData],
    });
  }

  async findAllWords(messageId: string) {
    // Find the words that were blocked in this message
    const messageWords = await prisma.messageWordRecord.findMany({
      where: {
        messageId: messageId,
      },
    });

    const words: string[] = [];

    // Save just the words in an array and exclude the id and other informations
    messageWords.forEach((word) => words.push(` ${word.word}`));

    return words;
  }

  async mostBlockedWord() {
    const words = await prisma.messageWordRecord.groupBy({
      by: ['word'],
      _count: {
        _all: true,
      },
    });

    // Return an array with the blocked words and how many times they were blocked
    return words;
  }
}

export default new MessageRecordsRepository();
