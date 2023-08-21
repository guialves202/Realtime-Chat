import prisma from '../database/prisma';

class ForbiddenWordsRepository {
  async findAll() {
    const words = await prisma.forbiddenWord.findMany();
    return words;
  }

  async findOne(id: string) {
    const word = await prisma.forbiddenWord.findUnique({
      where: {
        id: id,
      },
    });
    return word;
  }

  async createOne(word: string) {
    await prisma.forbiddenWord.create({
      data: {
        word: word,
      },
    });
  }

  async createMany(wordsArray: { word: string }[]) {
    const words = [...wordsArray];
    await prisma.forbiddenWord.createMany({
      data: [...words],
    });
  }

  async deleteOne(id: string) {
    await prisma.forbiddenWord.delete({
      where: {
        id: id,
      },
    });
  }
}

export default new ForbiddenWordsRepository();
