import { Server } from 'socket.io';


class SocketServer {
    private _io: Server ;

    constructor(){
        console.log('Init socket server')
        this._io = new Server();    
    }

    public initListner(){
        const io = this._io;
        console.log("Init socket listener")
        io.on('connect',(socket)=>{
            console.log(`socket connected to`, socket.id)

            socket.on('event:message', async ({message}:{message: string})=>{
                console.log('message Received from socket', message)
            })
        })
    }
    get io(){
        return this._io; 
    }
}

export default SocketServer; 