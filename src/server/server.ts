import * as http from 'http';
import Debug from 'debug';
import app from '../app';

const debug = Debug('usarmyquizappbackend:server');

const port: string = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Listen on provided port, on all network interfaces.
server.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV}`);
  console.log(`URL: http://localhost:${port}`);
});

server.on('listening', () => {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${port}`;
  debug(`Listening on ${bind}`);
});
