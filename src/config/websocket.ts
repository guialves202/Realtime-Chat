import { Socket } from 'socket.io';
import { SessionSocket } from '../app';
import getFilter from './filter';
import ForbiddenWordsRepository from '../repositories/ForbiddenWordsRepository';
import MessageRecordsRepository from '../repositories/MessageRecordsRepository';

export default function (defaultSocket: Socket) {
  const socket = <SessionSocket>defaultSocket;
  const session = socket.request.session;

  const color = session.color;

  socket.on('sendMessage', async (data: string) => {
    if (session && !session.user) {
      return socket.emit('login');
    }

    if (!data) return;
    const forbiddenWords = await ForbiddenWordsRepository.findAll();
    const filter = getFilter(forbiddenWords);

    const words = data.split(' ');

    const filteredWords = filter.filterWords(words);

    if (filteredWords.length > 0) {
      await MessageRecordsRepository.create({ username: session.user.username, message: data, wordArray: filteredWords });
      return socket.emit('forbiddenWord');
    }

    const messageData = {
      username: session.user.username,
      message: data,
      color: color,
    };

    socket.emit('okmessage', messageData);

    socket.broadcast.emit('receivedMessage', messageData);
  });
}
