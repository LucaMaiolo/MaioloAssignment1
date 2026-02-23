import { createServer, IncomingMessage, ServerResponse } from 'http';
export * as model from "./jobModelMongoDB.js"

let initialized = model.initialize();

const port = 1339;

createServer(async function (request: IncomingMessage, response: ServerResponse) : Promise<void> {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('Hello World <yourname>');
}).listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});



