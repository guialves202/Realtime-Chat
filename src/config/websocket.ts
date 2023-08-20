import { Socket } from 'socket.io';
import { SessionSocket } from '../app';
import getFilter from './filter';
import ForbiddenWordsRepository from '../repositories/ForbiddenWordsRepository';
import MessageRecordsRepository from '../repositories/MessageRecordsRepository';

export default function (defaultSocket: Socket) {
  const socket = <SessionSocket>defaultSocket;
  const session = socket.request.session;

  socket.on('sendMessage', async (data: string) => {
    if (session && !session.user) {
      return socket.emit('login');
    }
    const forbiddenWords = await ForbiddenWordsRepository.findAll();
    const filter = getFilter(forbiddenWords);

    const words = data.split(' ');

    const filteredWords = filter.filterWords(words);

    if (filteredWords.length > 0) {
      await MessageRecordsRepository.create({ userId: session.user.id, message: data, wordArray: filteredWords });
      return socket.emit('forbiddenWord');
    }

    socket.emit('okmessage', data);
    if (data) socket.broadcast.emit('receivedMessage', data);
  });
}
