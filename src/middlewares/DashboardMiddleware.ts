import { Request, Response, NextFunction } from 'express';

class DashboardMiddleware {
  addForbiddenWord(req: Request, res: Response, next: NextFunction) {
    const { content } = req.body;

    if (!content) {
      req.flash('error_msg', 'Invalid word or phrase');
      return res.redirect('/dashboard');
    }

    res.locals.content = content;

    next();
  }
}

export default new DashboardMiddleware();
