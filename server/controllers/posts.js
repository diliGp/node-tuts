import axios from 'axios';
import { setCache } from '../middlewares/RedisHandler';
import { cachable } from '../cache';

export const getPosts = (req, res) => {
    axios.get('https://jsonplaceholder.typicode.com/posts').then(({ data }) => {
        console.log('Fecthing data....');
        const cacheInfo = cachable[req.path];
        setCache(cacheInfo, JSON.stringify(data));

        res.json({
            status: 200,
            data
        })
    }).catch(error => {
        console.error(error)
        res.sendStatus(500);
    });
}