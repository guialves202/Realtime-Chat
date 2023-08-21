import { Request, Response } from 'express';
import MessageRecordsRepository from '../repositories/MessageRecordsRepository';
import ForbiddenWordsRepository from '../repositories/ForbiddenWordsRepository';
import UserRepository from '../repositories/UserRepository';

class DashboardController {
  async index(req: Request, res: Response) {
    try {
      // Bring all blocked messages and words saved as forbidden from database
      const messages = await MessageRecordsRepository.findAll();
      const forbiddenWords = await ForbiddenWordsRepository.findAll();

      // Create an array for save all the content of the blocked messages
      const messagesData: { username: string; message: string; createdAt: Date; words: string[] }[] = [];

      // Add each blocked word in each message
      for (let i = 0; i < messages.length; i++) {
        const words = await MessageRecordsRepository.findAllWords(messages[i].id);
        messagesData.push({ username: messages[i].username, message: messages[i].message, createdAt: messages[i].createdAt, words });
      }

      // Bring how many users are active
      const activeUsers = await UserRepository.findAllActiveUsers();

      // Search for the most blocked word
      const blockedWords = await MessageRecordsRepository.mostBlockedWord();
      const mostBlockedWordQuantity = blockedWords.reduce((acc, word) => {
        if (acc < word._count._all) acc = word._count._all;
        return acc;
      }, 0);
      const mostBlockedWordArray = blockedWords.filter((word) => {
        return word._count._all == mostBlockedWordQuantity;
      });

      // Check if any word has been blocked
      const mostBlockedWord = mostBlockedWordArray.length > 0 ? mostBlockedWordArray[0].word : 'Any word blocked yet';

      res.render('layouts/main.ejs', { cssPath: '/css/dashboard.css', page: '../dashboard.ejs', forbiddenWords, messagesData, activeUsers, mostBlockedWord });
    } catch (err) {
      console.log(err);
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

  async deleteForbiddenWords(req: Request, res: Response) {
    const id: string = res.locals.id;

    try {
      await ForbiddenWordsRepository.deleteOne(id);
      req.flash('success_msg', 'Successfully deleted the forbidden content!');
      return res.redirect('/dashboard');
    } catch (err) {
      return res.redirect('/404');
    }
  }
}

export default new DashboardController();
