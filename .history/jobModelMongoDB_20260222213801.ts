import { MongoClient, MongoError, Collection, ObjectId } from 'mongodb';
import { isValidJob, isValidStatus } from './validateUtils.js';
import { InvalidInputError } from './InvalidInputError.js';
import { DatabaseError } from './DatabaseError.js';

interface Job {
    title: string;
    description: string;
    location: string;
    budget: number;
    status: string;
    postedAt: Date;  
}

const dbName: string = 'jobboard_db'
let client: MongoClient;
let jobsCollection: Collection<Job> | undefined;

async function initialize(): Promise<void>{

    try{
        const url = `${process.env.URL_PRE}${process.env.MONGODB_PWD}${process.env.URL_POST}`;
        client = new MongoClient(url); // store connected client for use while the app is running
        await client.connect(); 
        console.log("Connected to MongoDb");
        const db = client.db(dbName);
        jobsCollection = db.collection("jobs")
      }catch (err) {
        if (err instanceof MongoError) {
            console.error("MongoDB connection failed:", err.message);
          } else {
            console.error("Unexpected error:", err);
          }
        }
}


async function addJob(title:string,description:string,location:string,budget:number): Promise<Job>{
    isValidJob(title,description,location,budget)
    if(!jobsCollection) throw new DatabaseError("Db not started");
    try{
        const newJob: Job = {
            title,
            description,
            location,
            budget,
            status: 'open',
            postedAt: new Date()
        }
        const result = await jobsCollection.insertOne(newJob);
        console.log('[model] createJob: inserted _id ' + result.insertedId);
        return newJob;    
    }catch (err: unknown) {
        if (err instanceof InvalidInputError) throw err;
        throw new DatabaseError('Error inserting job');
      }    
}


export {initialize, addJob}