// server/server.js
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

/*
Simple room model:
rooms = {
  roomId: {
    hostId,
    desiredPlayers,
    players: [{ id, name }],
    positions: [1,1,...],
    currentPlayer: 0,
    started: false,
    snakes: {...},
    ladders: {...}
  }
}
*/
const rooms = {};

const DEFAULT_SNAKES = {99:2,30:9,88:13,95:15,41:23,59:26,62:33,85:25,68:48,51:34,92:66,82:60};
const DEFAULT_LADDERS = {8:27,19:37,28:47,32:67,50:74,21:87};

io.on('connection', (socket) => {
  console.log('conn', socket.id);

  socket.on('createRoom', ({ roomId, name, desiredPlayers }) => {
    if (rooms[roomId]) {
      socket.emit('error', { message: 'Room already exists' });
      return;
    }
    rooms[roomId] = {
      hostId: socket.id,
      desiredPlayers: desiredPlayers || 2,
      players: [{ id: socket.id, name }],
      positions: [1],
      currentPlayer: 0,
      started: false,
      snakes: DEFAULT_SNAKES,
      ladders: DEFAULT_LADDERS
    };
    socket.join(roomId);
    io.to(roomId).emit('roomUpdate', rooms[roomId]);
    // privately assign player number
    socket.emit('playerAssigned', { playerNumber: 0, playerId: socket.id });
    console.log('room created', roomId);
  });

  socket.on('joinRoom', ({ roomId, name }) => {
    const room = rooms[roomId];
    if (!room) {
      socket.emit('error', { message: 'Room does not exist' });
      return;
    }
    if (room.players.length >= 4) {
      socket.emit('error', { message: 'Room full' });
      return;
    }
    room.players.push({ id: socket.id, name });
    room.positions.push(1);
    socket.join(roomId);
    const assignedNumber = room.players.length - 1;
    socket.emit('playerAssigned', { playerNumber: assignedNumber, playerId: socket.id });
    io.to(roomId).emit('roomUpdate', room);
  });

  socket.on('startGame', ({ roomId }) => {
    const room = rooms[roomId];
    if (!room) return;
    if (socket.id !== room.hostId) return; // only host
    room.started = true;
    // if players < desiredPlayers, still start — up to your rules
    io.to(roomId).emit('roomUpdate', room);
  });

  socket.on('requestRoll', ({ roomId, playerNumber, requestedValue }) => {
    const room = rooms[roomId];
    if (!room || !room.started) return;
    if (room.currentPlayer !== playerNumber) {
      socket.emit('error', { message: 'Not your turn' });
      return;
    }

    // Server chooses dice RNG for consistent behaviour.
    const dice = Math.floor(Math.random() * 6) + 1;
    const actualRoll = dice; // ignore requestedValue sent by client

    // move
    let pos = room.positions[playerNumber] + actualRoll;
    if (pos > 100) pos = 100;
    // ladder first
    if (room.ladders[pos]) {
      pos = room.ladders[pos];
    } else if (room.snakes[pos]) {
      pos = room.snakes[pos];
    }
    room.positions[playerNumber] = pos;

    // broadcast update
    io.to(roomId).emit('roomUpdate', room);

    // if win
    if (pos === 100) {
      io.to(roomId).emit('gameOver', { message: `Player ${playerNumber + 1} (${room.players[playerNumber].name}) wins!`});
      // optionally reset/cleanup
    } else {
      room.currentPlayer = (room.currentPlayer + 1) % room.players.length;
      io.to(roomId).emit('roomUpdate', room);
    }

    // Optionally tell client what dice value was rolled
    io.to(room.players[playerNumber].id).emit('diceResult', { dice: actualRoll });
  });

  socket.on('disconnect', () => {
    // remove from any rooms
    for (const [roomId, room] of Object.entries(rooms)) {
      const idx = room.players.findIndex(p => p.id === socket.id);
      if (idx !== -1) {
        room.players.splice(idx, 1);
        room.positions.splice(idx, 1);
        // assign new host if needed
        if (room.hostId === socket.id && room.players.length) {
          room.hostId = room.players[0].id;
        }
        io.to(roomId).emit('roomUpdate', room);
        // if room empty, delete
        if (room.players.length === 0) delete rooms[roomId];
      }
    }
  });
});

server.listen(3000, () => console.log('Socket server listening on :3000'));
