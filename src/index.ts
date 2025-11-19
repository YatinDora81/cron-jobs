import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import axios from 'axios';
const app = express();

dotenv.config();
app.use(cors());

const PORT = process.env.PORT;


app.get('/', async (_, res) => {
    const url = process.env.URL;
    const urlArray = url.split(',');

    try {
        // Create all promises in parallel
        const promises = urlArray.map((u) => 
            axios.get(u.trim()).catch((error) => {
                console.log(`Error fetching ${u}:`, error.message);
                return { error: error.message, url: u };
            })
        );

        const results = await Promise.all(promises);
        
        res.json({ 
            message: 'All requests completed',
            results: results.map((r, i) => {
                const isError = 'error' in r;
                return {
                    url: urlArray[i],
                    status: isError ? 'error' : 'success',
                    data: isError ? (r as { error: string; url: string }).error : (r as any).data
                };
            })
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});