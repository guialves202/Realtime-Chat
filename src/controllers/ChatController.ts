import { Request, Response } from 'express';

class ChatController {
  index(req: Request, res: Response) {
    res.render('layouts/main.ejs', { cssPath: '/css/chat.css', page: '../chat.ejs' });
  }
}

export default new ChatController();
