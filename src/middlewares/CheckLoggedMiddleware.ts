import { Request, Response, NextFunction } from 'express';

class CheckLoggedMiddleware {
  onlyLogged(req: Request, res: Response, next: NextFunction) {
    if (!req.session.user) {
      req.flash('error_msg', 'You must be logged for this');
      return res.redirect('back');
    }
    next();
  }

  onlyNotLogged(req: Request, res: Response, next: NextFunction) {
    if (req.session.user) {
      req.flash('error_msg', 'You are already logged in');
      return res.redirect('back');
    }
    next();
  }
}

export default new CheckLoggedMiddleware();
