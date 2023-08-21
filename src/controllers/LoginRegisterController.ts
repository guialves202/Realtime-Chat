import { Request, Response } from 'express';
import UserRepository from '../repositories/UserRepository';
import bcrypt from 'bcryptjs';
import { io } from '../app';

class LoginRegisterController {
  async login(req: Request, res: Response) {
    const { username, password } = res.locals.data;

    const data = {
      username: username as string,
      password: password as string,
    };

    const user = await UserRepository.findByUsername(username);

    if (!user) {
      try {
        data.password = bcrypt.hashSync(data.password, 10);
        const user = await UserRepository.create(data);
        req.session.user = user;
        req.session.color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        req.flash('success_msg', 'Account created successfully, you can start chating now');
        const activeUsers = await UserRepository.findAllActiveUsers();
        io.sockets.emit('updateUserCount', activeUsers);
        await UserRepository.addActiveUser(user.id);
        return res.redirect('/chat');
      } catch (err) {
        return res.redirect('/404');
      }
    }

    try {
      if (!bcrypt.compareSync(data.password, user.password)) {
        req.flash('error_msg', 'Username already in use');
        return res.redirect('/chat');
      }

      req.session.user = user;
      req.session.color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      req.flash('success_msg', `Welcome back ${user.username}!`);
      await UserRepository.addActiveUser(user.id);
      const activeUsers = await UserRepository.findAllActiveUsers();
      io.sockets.emit('updateUserCount', activeUsers);
      return res.redirect('/chat');
    } catch (err) {
      return res.redirect('/404');
    }
  }

  async logout(req: Request, res: Response) {
    const user = req.session.user;
    req.session.destroy(async () => {
      try {
        if (user) await UserRepository.removeActiveUser(user.id);
        const activeUsers = await UserRepository.findAllActiveUsers();
        io.sockets.emit('updateUserCount', activeUsers);
        return res.redirect('/chat');
      } catch (err) {
        return res.redirect('/404');
      }
    });
  }
}

export default new LoginRegisterController();
