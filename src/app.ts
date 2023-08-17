import 'dotenv/config';

import express from 'express';
import { Express } from 'express';
import path from 'path';
import cors from 'cors';
import flash from 'connect-flash';
import helmet from 'helmet';
import { Request, Response } from 'express';
import session from 'express-session';

declare module 'express-session' {
  export interface SessionData {
    user: { id: string; username: string; password: string };
  }
}

class App {
  app: Express;
  constructor() {
    this.app = express();
    this.config();
    this.middlewares();
    this.routes();
  }

  config() {
    const SEVEN_DAYS = 1000 * 60 * 60 * 24 * 7;
    this.app.set('view engine', 'ejs');
    this.app.set('views', path.join(__dirname, '..', 'views'));
    this.app.use(express.static(path.join(__dirname, '..', 'public')));
    this.app.use(
      session({
        secret: process.env.SESSION_SECRET as string,
        resave: false,
        saveUninitialized: false,
        cookie: {
          maxAge: SEVEN_DAYS,
          httpOnly: true,
        },
      }),
    );
  }

  middlewares() {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(flash());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.get('/404', (req: Request, res: Response) => {
      return res.render('layouts/main', { cssPath: '/css/404.css', page: '../404.ejs' });
    });
  }
}

export default new App().app;
