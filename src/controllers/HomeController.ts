import { Request, Response } from 'express';

class HomeController {
  index(req: Request, res: Response) {
    res.render('layouts/main.ejs', { cssPath: '/css/home.css', page: '../home.ejs' });
  }
}

export default new HomeController();
