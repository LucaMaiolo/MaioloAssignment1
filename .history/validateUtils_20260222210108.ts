import { InvalidInputError } from './InvalidInputError.js';

const VALID_STATUSES = ['open', 'in-progress', 'completed'] as const;


function isValidJob(title: string, description: string, location: string, budget: number) :boolean{
    
    if(!title|| title.trim().length === 0)
        throw new InvalidInputError("Title is empty");

    if (!description || description.trim().length === 0)
        throw new InvalidInputError("Description is empty")

    if (!location || location.trim().length === 0 )
        throw new InvalidInputError("Location is empty")

    if (typeof budget !== 'number' || isNaN(budget) || budget <= 0)
        throw new InvalidInputError('Budget must be a positive number');
    
    return true;     
}



export type JobStatus = typeof VALID_STATUSES[number];

