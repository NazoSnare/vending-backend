'use strict';

const WebSocket = require('ws');
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');


 
// function noop() {}
 
// function heartbeat() {
//   this.isAlive = true;
// }

app.use(cors());
 
const wss = new WebSocket.Server({ port: 3000 });

wss.on('connection', function connection(ws) {
  console.log("user connected");
  ws.on('message', function incoming(message) {
    
    console.log('RECEIVED IT IT');
    //message variables
    let receivedData = JSON.parse(message);
    let messageType = receivedData.type;

    switch (messageType) {
      case "user:redeem": {
        console.log('user redeeming');
        console.log(receivedData);
        let productToSend = receivedData.data.product;
        /**
         * If user has correct balance then
         *  deduct the product.price from user.points and 
         * then pop up drink if drink popped then product.quantity -1
         */
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            console.log(receivedData.user);
            let dataToClient = JSON.stringify({
                type: "user:redeemed",
                data: {
                  success:true,
                  message: "Drink redeemed",
                  product: productToSend,
                  user: receivedData.data.user,
                  reece:"1"
                }
            });

            client.send(dataToClient);
          }
        });
          
          // code block
          break;
      }//end of user redeem
      case "machine:connected": {

          console.log("machine connected");
          console.log(receivedData);
          // code block
          break;
      }


      default:
      // code block
  }//end of switch events
  });
 
  ws.send(JSON.stringify({
    type:"client:connected",
    data:{
      server:"fastest server and most efficient"
    }
  }));
});

app.use(express.static(path.join(__dirname,'/public')));

app.listen(80,()=>{
  console.log('static server started on http://localhost:7000');
});


 
// wss.on('connection', function connection(ws) {
//   ws.isAlive = true;
//   ws.on('pong', heartbeat);
// });
 
// const interval = setInterval(function ping() {
//   wss.clients.forEach(function each(ws) {
//     if (ws.isAlive === false) return ws.terminate();
 
//     ws.isAlive = false;
//     ws.ping(noop);
//   });
// }, 30000);
