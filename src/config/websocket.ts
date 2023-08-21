import { Socket } from 'socket.io';
import { SessionSocket } from '../app';
import getFilter from './filter';
import ForbiddenWordsRepository from '../repositories/ForbiddenWordsRepository';
import MessageRecordsRepository from '../repositories/MessageRecordsRepository';

export default function (defaultSocket: Socket) {
  const socket = <SessionSocket>defaultSocket;
  const session = socket.request.session;

  // Put a color in the user username
  const color = session.color;

  socket.on('sendMessage', async (data: string) => {
    if (session && !session.user) {
      return socket.emit('login');
    }

    if (!data) return;

    // Create an instance of filter and save all forbidden words in it
    const forbiddenWords = await ForbiddenWordsRepository.findAll();
    const filter = getFilter(forbiddenWords);

    // Separate all the words of message in an array
    const words = data.split(' ');

    // Filter words and phrases
    const filteredWords = filter.filterWords(words);
    const filteredPhrases = filter.filterPhrases(data);

    // Prevents user for send message if it have some forbidden word or phrase, except for admins
    if ((filteredWords.length > 0 || filteredPhrases.length > 0) && session.user.role != 'ADMIN') {
      filteredWords.push(...filteredPhrases);
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
