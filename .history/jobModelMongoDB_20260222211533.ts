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
        const db : Db = client.db(dbName);
        jobsCollection = db.collection("jobs")
      }catch (err) {
        if (err instanceof MongoError) {
            console.error("MongoDB connection failed:", err.message);
          } else {
            console.error("Unexpected error:", err);
          }

}
