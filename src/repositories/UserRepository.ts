import prisma from '../database/prisma';

class UserRepository {
  async findByUsername(username: string) {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    return user;
  }

  async create(userData: { username: string; password: string }) {
    const user = await prisma.user.create({
      data: {
        username: userData.username,
        password: userData.password,
      },
    });
    return user;
  }
}

export default new UserRepository();