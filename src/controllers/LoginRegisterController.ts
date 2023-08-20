import { Request, Response } from 'express';
import UserRepository from '../repositories/UserRepository';
import bcrypt from 'bcryptjs';

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
        req.flash('success_msg', 'Account created successfully, you can start chating now');
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
      req.flash('success_msg', `Welcome back ${user.username}!`);
      return res.redirect('/chat');
    } catch (err) {
      return res.redirect('/404');
    }
  }
}

export default new LoginRegisterController();
