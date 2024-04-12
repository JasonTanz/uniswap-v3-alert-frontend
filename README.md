# Real-Time Pool Monitoring Application for Uniswap v3 (Frontend)

A web application that monitors the creation of new pools on Uniswap v3 and attaches swap event listeners to these newly created pools. The pool data and swap data are updated in real-time using Socket.io.

![demo-ezgif com-crop](https://github.com/JasonTanz/uniswap-v3-alert-frontend/assets/65846113/61d51ed7-bbe9-4de5-aa62-aef200959b2d)

## Features
1. Pool Creation Detection: The web application continuously monitors Uniswap for new pool creation events.
2. Event Listener Attachment: Upon detecting a new pool, it attaches a swap event listener to the pool.
3. Real-Time Updates: All pool creations and swap events are broadcasted in real-time using Socket.io, ensuring timely updates to connected clients.

## Tech Stack
- React.js (Next.js)
- TypeScript
- Material UI
- Socket.io 
