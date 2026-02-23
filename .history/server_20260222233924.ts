import { createServer, IncomingMessage, ServerResponse } from 'http';
import * as model from "./jobModelMongoDB.js";
import { InvalidInputError } from './InvalidInputError.js';
import { DatabaseError } from './DatabaseError.js';


let initialized = model.initialize();

const port = 1339;

createServer(async function (request: IncomingMessage, response: ServerResponse) : Promise<void> {
    await initialized;

    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('Hello World <yourname>');
}).listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});


async function handleCreateJob(title: string, description: string,
    location: string, budget: number): Promise<string>{
        try{
            const result = await model.addJob(title,description,location,budget);
            return "Successfully created job: " + result.title
        }catch(err: unknown){
            if (err instanceof DatabaseError){
                console.error("Database error in addJob" +err.message)
                return "Database error"
            }
            else if (err instanceof InvalidInputError) {
                console.warn("Invalid input in addJob")
            }
            console.error("Unexpected error in addJob.")
            return "Unexpected error when creating job"
        }
    }

async function handleGetAllJobs(statusFilter?: string): Promise<string>{
    try{
        const jobs = await model.getAllJobs(statusFilter);
        if (jobs.length ===0)
    }
}