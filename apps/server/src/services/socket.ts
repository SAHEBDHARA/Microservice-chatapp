import { Server } from 'socket.io'; 
import  Redis  from 'ioredis';

const pub = new Redis({
    host: 'redis-d674083-sahebdhara961-3022.a.aivencloud.com',
    port: 27263,
    username: 'default',
    password: 'AVNS_uQBlxl30BttyYODPM3b'
});
const sub = new Redis({
    host: 'redis-d674083-sahebdhara961-3022.a.aivencloud.com',
    port: 27263,
    username: 'default',
    password: 'AVNS_uQBlxl30BttyYODPM3b'
});

class SocketServer {
    private _io: Server ;

    constructor(){
        console.log('Init socket server')
        this._io = new Server({
            cors:{
                allowedHeaders: ["*"],
                origin:"*",
            }
        });   
        sub.subscribe('MESSAGE') 
    }

    public initListner(){
        const io = this._io;
        console.log("Init socket listener")
        io.on('connect',(socket)=>{
            console.log(`socket connected to`, socket.id)

            socket.on('event:message', async ({message}:{message: string})=>{
                console.log('message Received from socket', message);
                // publish the message to redis
                await pub.publish("MESSAGE", JSON.stringify({message}))
            })
        })
        sub.on('message',(channel, message)=>{
            if(channel === 'MESSAGE'){
                io.emit('message',message)
            }
        })
    }
    get io(){
        return this._io; 
    }
}

export default SocketServer; 