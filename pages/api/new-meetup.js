// not about react components
// about functions that contain server side code, never exposed, can use credentials 
// act as a url, this would only trigger if this path is accessed

import { MongoClient } from "mongodb";

async function handler(req, res) {
    if(req.method === 'POST') {
        const data = req.body;

        // NEVER RUN ON CLIENT
        // this will never end up on client side tho
        const client = await MongoClient.connect('mongodb+srv://shane:QqneL3LADLXUOLKD@cluster0.ftntdvj.mongodb.net/meetups?retryWrites=true&w=majority')
        const db = client.db();

        const meetupsCollection = db.collection('meetups');
        
        const result = await meetupsCollection.insertOne(data);

        console.log(result);

        client.close();

        res.status(201).json({ message: 'Meetup inserted' });
    }
};

export default handler; 