import { Injectable } from '@angular/core';
declare var SockJS: any;
declare var Stomp: any;

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  stompClient: any;

  constructor() {}
  connect(owner:number,destination: string, callback: (message: any) => void) {
    const socket = new SockJS('https://socket-chat-real-time.onrender.com/chat');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, () => {

      console.log('Connected to WebSocket');
      this.subscribe(owner, destination, callback);
  
    });
  }
  subscribe(owner : number, destination: string, callback: (message: any) => void) {
    console.log("owner ",owner)
    if (this.stompClient) {
      this.stompClient.subscribe(destination, (message:any) => {
        callback(JSON.parse(message.body));
      });
      this.send("/app/addUser",  {owner});

    }
  }
  disconnect() {
    if (this.stompClient) {
      this.stompClient.disconnect(() => {
        alert('See you next time!');
      });
    }
  }
  getStompClient() {
    return this.stompClient;
  }
  send(destination: string, message: any) {
    if (this.stompClient) {
      this.stompClient.send(destination, {}, JSON.stringify(message));
    }
  }
}
