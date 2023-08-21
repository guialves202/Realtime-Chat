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
    // Create an admin account if the username is 'admin'
    if (userData.username == 'admin') {
      const user = await prisma.user.create({
        data: {
          username: userData.username,
          password: userData.password,
          role: 'ADMIN',
        },
      });
      return user;
    }

    // Create normal accounts
    const user = await prisma.user.create({
      data: {
        username: userData.username,
        password: userData.password,
      },
    });
    return user;
  }

  async addActiveUser(userId: string) {
    // Check if this user is already saved as active in database
    const user = await this.findOneActiveUser(userId);
    if (user) return;

    await prisma.activeUsers.create({
      data: {
        userId: userId,
      },
    });
  }

  async removeActiveUser(userId: string) {
    // Check if active users table contain this user before remove it
    const user = await this.findOneActiveUser(userId);
    if (!user) return;

    await prisma.activeUsers.delete({
      where: {
        userId: userId,
      },
    });
  }

  async findAllActiveUsers() {
    const users = await prisma.activeUsers.findMany();
    return users.length;
  }

  async findOneActiveUser(userId: string) {
    const user = await prisma.activeUsers.findUnique({
      where: {
        userId: userId,
      },
    });
    return user;
  }
}

export default new UserRepository();
