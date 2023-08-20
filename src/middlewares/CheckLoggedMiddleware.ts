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

  onlyAdmin(req: Request, res: Response, next: NextFunction) {
    if ((req.session.user && req.session.user.role != 'ADMIN') || !req.session.user) {
      req.flash('error_msg', 'Only admins can access this area');
      return res.redirect('/');
    }
    next();
  }
}

export default new CheckLoggedMiddleware();
