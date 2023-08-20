import prisma from '../database/prisma';

class ForbiddenWordsRepository {
  async findAll() {
    const words = await prisma.forbiddenWord.findMany();
    return words;
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
}

export default new ForbiddenWordsRepository();
