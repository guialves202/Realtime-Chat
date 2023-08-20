import prisma from '../database/prisma';

class MessageRecordsRepository {
  async findAll() {
    const records = await prisma.messageRecord.findMany();
    return records;
  }

  async create(data: { userId: string; message: string; wordArray: { id: string; word: string }[] }) {
    const message = await prisma.messageRecord.create({
      data: {
        userId: data.userId,
        message: data.message,
      },
    });

    const wordsInsertData: { messageId: string; wordId: string }[] = [];
    data.wordArray.forEach((word) => {
      wordsInsertData.push({ messageId: message.id, wordId: word.id });
    });

    await prisma.messageWordRecord.createMany({
      data: [...wordsInsertData],
    });
  }
}

export default new MessageRecordsRepository();
