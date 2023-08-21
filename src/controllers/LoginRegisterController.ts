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

    // If the user doesn't exist, create him and already log him in
    if (!user) {
      try {
        data.password = bcrypt.hashSync(data.password, 10);
        const user = await UserRepository.create(data);

        // Save user in session and create a color for his username
        req.session.user = user;
        req.session.color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        req.flash('success_msg', 'Account created successfully, you can start chating now');

        // Add the user as an active user in database
        await UserRepository.addActiveUser(user.id);

        // Update the active users in dashboard
        const activeUsers = await UserRepository.findAllActiveUsers();
        io.sockets.emit('updateUserCount', activeUsers);

        return res.redirect('/chat');
      } catch (err) {
        return res.redirect('/404');
      }
    }

    // If user already exists, check if the password is correct
    try {
      if (!bcrypt.compareSync(data.password, user.password)) {
        req.flash('error_msg', 'Username already in use');
        return res.redirect('/chat');
      }

      // If password is corret, save the user in session and set a color for his username
      req.session.user = user;
      req.session.color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      req.flash('success_msg', `Welcome back ${user.username}!`);

      // SAdd the user as an active user in database
      await UserRepository.addActiveUser(user.id);

      // Update the active users in dashboard
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
        // Remove the user from active users
        if (user) await UserRepository.removeActiveUser(user.id);

        // Update the active users in dashboard
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
