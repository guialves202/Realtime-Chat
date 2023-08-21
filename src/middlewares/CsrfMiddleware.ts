import { Request, Response, NextFunction } from 'express';

class CsrfMiddleware {
  checkCsrfError(err: object, req: Request, res: Response, next: NextFunction) {
    if (err) {
      return res.redirect('/404');
    }
    next();
  }

  csrfMiddleware(req: Request, res: Response, next: NextFunction) {
    res.locals.csrfToken = req.csrfToken();
    next();
  }
}

export default new CsrfMiddleware();
