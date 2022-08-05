import * as dotenv from 'dotenv';

dotenv.config();

export default {
    CORS: process.env.CORS ?? '',
    
}