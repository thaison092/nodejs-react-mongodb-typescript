import * as dotenv from 'dotenv';

dotenv.config();

export default {
    DB_Url: process.env.DB_URL ?? '',
    
}