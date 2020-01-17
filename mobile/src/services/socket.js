import socketio from 'socket.io-client';
import { baseURL } from './api'  
const serverHost = baseURL.replace(/^(https?:\/\/[^\/]+)(?:\/.*$)?/i, '$1');

const socket = socketio(serverHost, {
    autoConnect: false
});

function subscribeToNewDevs(subscribeFunction){
    socket.on('new-dev', subscribeFunction);
}

function connect(latitude, longitude, techs){
    socket.io.opts.query = { latitude, longitude, techs };
    socket.connect();
}

function disconnect(){
    if (socket.connected)
        socket.disconnect();
}

export {
    connect,
    disconnect,
    subscribeToNewDevs
};