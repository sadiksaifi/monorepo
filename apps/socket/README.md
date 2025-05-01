# Socket Server

A WebSocket server built with Socket.IO that facilitates real-time WebRTC communication between clients. This server handles signaling for peer-to-peer video/audio calls.

## Features

- Real-time WebSocket communication using Socket.IO
- WebRTC signaling server for peer-to-peer connections
- Room-based communication
- Support for video/audio calls
- ICE candidate exchange for NAT traversal

## Prerequisites

- Node.js >= 20
- pnpm >= 10.7.1

## Installation

1. Install dependencies:

```bash
pnpm install
```

2. Build the project:

```bash
pnpm build
```

## Development

Run the development server with hot reload:

```bash
pnpm dev
```

## Production

Build and start the production server:

```bash
pnpm build
pnpm start
```

## Docker Deployment

Build the Docker image:

```bash
docker buildx build -t socket -f Dockerfile .
```

Run the container:

```bash
docker run -p 3002:3002 socket
```

The server runs on port 3002 by default and accepts connections from `http://localhost:5173`.

## License

GPL-3.0
