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

  async findAllWords(messageId: string) {
    const messageWords = await prisma.messageWordRecord.findMany({
      where: {
        messageId: messageId,
      },
    });

    const words: string[] = [];

    messageWords.forEach((word) => words.push(` ${word.word}`));

    return words;
  }

  async create(data: { username: string; message: string; wordArray: { id: string; word: string }[] }) {
    const message = await prisma.messageRecord.create({
      data: {
        username: data.username,
        message: data.message,
      },
    });

    const wordsInsertData: { messageId: string; word: string }[] = [];
    data.wordArray.forEach((word) => {
      wordsInsertData.push({ messageId: message.id, word: word.word });
    });

    await prisma.messageWordRecord.createMany({
      data: [...wordsInsertData],
    });
  }

  async mostBlockedWord() {
    const words = await prisma.messageWordRecord.groupBy({
      by: ['word'],
      _count: {
        _all: true,
      },
    });
    return words;
  }
}

export default new MessageRecordsRepository();
