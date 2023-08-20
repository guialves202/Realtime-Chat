import 'dotenv/config';

import express from 'express';
import { Express } from 'express';
import path from 'path';
import cors from 'cors';
import flash from 'connect-flash';
import helmet from 'helmet';
import { Request, Response } from 'express';
import session from 'express-session';
import homeRoutes from './routes/home';
import chatRoutes from './routes/chat';
import http from 'http';
import { Server } from 'socket.io';

declare module 'express-session' {
  export interface SessionData {
    user: { id: string; username: string; password: string };
  }
}

class App {
  app: Express;
  io: Server;
  server: http.Server;
  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = new Server(this.server);
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
    this.io.on('connection', (socket) => {
      console.log(socket.id);

      socket.on('sendMessage', (data) => {
        if (data) socket.broadcast.emit('receivedMessage', data);
      });
    });
  }

  middlewares() {
    this.app.use(
      helmet({
        contentSecurityPolicy: {
          directives: {
            'script-src': ["'self'", 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.7.2/socket.io.js'],
            'font-src': ['https://fonts.gstatic.com'],
          },
        },
      }),
    );
    this.app.use(cors());
    this.app.use(flash());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.get('/404', (req: Request, res: Response) => {
      return res.render('layouts/main', { cssPath: '/css/404.css', page: '../404.ejs' });
    });
    this.app.use(homeRoutes);
    this.app.use('/chat', chatRoutes);
  }
}

const myApp = new App();
const app = myApp.app;
const server = myApp.server;

export { app, server };
