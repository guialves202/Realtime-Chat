import { Request, Response } from 'express';
import MessageRecordsRepository from '../repositories/MessageRecordsRepository';
import ForbiddenWordsRepository from '../repositories/ForbiddenWordsRepository';

class DashboardController {
  async index(req: Request, res: Response) {
    try {
      const messages = await MessageRecordsRepository.findAll();
      const forbiddenWords = await ForbiddenWordsRepository.findAll();

      const messagesData: { username: string; message: string; createdAt: Date; words: string[] }[] = [];

      for (let i = 0; i < messages.length; i++) {
        const words = await MessageRecordsRepository.findAllWords(messages[i].id);
        messagesData.push({ username: messages[i].username, message: messages[i].message, createdAt: messages[i].createdAt, words });
      }

      res.render('layouts/main.ejs', { cssPath: '/css/dashboard.css', page: '../dashboard.ejs', forbiddenWords, messagesData });
    } catch (err) {
      return res.redirect('/404');
    }
  }

  async addForbiddenWords(req: Request, res: Response) {
    const content: string = res.locals.content;

    try {
      await ForbiddenWordsRepository.createOne(content);
      req.flash('success_msg', 'Successfully added new forbidden content!');
      return res.redirect('/dashboard');
    } catch (err) {
      return res.redirect('/404');
    }
  }
}

export default new DashboardController();
