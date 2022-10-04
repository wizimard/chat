import WebSocket from 'ws';
import { ObjectId } from 'mongodb';

import ApiError from '../exceptions/ApiError';
import UserModel from '../models/UserModel';

type wsType = WebSocket.WebSocketClient;

const listeners = new Map();

const handlers = new Map();
handlers.set('connection', onConnection);

async function onConnection(ws: wsType, args: { id: string }) {
  const user = await UserModel.findById(args.id);

  if (!user) throw ApiError.BadRequest("User doesn't exist");
  if (!user.isConfirm) throw ApiError.BadRequest("User didn't confirm email");

  user.isOnline = true;

  await user.save();
  
  ws.id = args.id;

  listeners.set(args.id, ws);

  ws.send(JSON.stringify({ type: 'connection', content: 'Hello socket!' }));
}

async function onMessage(ws: wsType, message: WebSocket.RawData) {
  const messageJson = JSON.parse(message.toString());
  const type = messageJson.type;

  console.log(messageJson);

  const handler = handlers.get(type);

  if (!handler) throw ApiError.BadRequest('Web Socket handler doesn\'t exist');

  await handler(ws, messageJson.args);
}
async function onClose(wsId: string, _code: number) {

  listeners.delete(wsId);

  await UserModel.findOneAndUpdate({
    _id: new ObjectId(wsId)
  }, {
    isOnline: false
  });
}

async function onConnect(ws: wsType) {
  ws.emit('connection');
  console.log('connection');
  
  ws.on('message', async(message) => {
    await onMessage(ws, message);
  });
  ws.on('close', async(code: number) => {
    const id = ws.id;
    if (!id) return;

    await onClose(id, code);
  });
}

const wss = new WebSocket.Server({ port: 9000 });

wss.on('connection', onConnect);

export default wss;