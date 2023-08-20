import { Request, Response, NextFunction } from 'express';

class LoginRegisterMiddleware {
  login(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;

    const errors: string[] = [];

    if (!username) errors.push("Username can't be empty");
    if (!password) errors.push("Password can't be empty");

    if (username.length < 3 || username.length > 50) errors.push('Username must contain between 3 and 50 characters');
    if (password.length < 3 || password.length > 50) errors.push('Password must contain between 3 and 50 characters');

    if (errors.length > 0) {
      req.flash('error_msg', errors);
      return res.redirect('/chat');
    } else {
      res.locals.data = { username, password };
      next();
    }
  }
}

export default new LoginRegisterMiddleware();
