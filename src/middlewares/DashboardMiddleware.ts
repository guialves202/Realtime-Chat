import { Request, Response, NextFunction } from 'express';
import ForbiddenWordsRepository from '../repositories/ForbiddenWordsRepository';

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

  async deleteForbiddenWord(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const word = await ForbiddenWordsRepository.findOne(id);

    if (!id || !word) {
      req.flash('error_msg', 'A problem happened while trying to delete this word or phrase');
      return res.redirect('/dashboard');
    }

    res.locals.id = id;

    next();
  }
}

export default new DashboardMiddleware();
