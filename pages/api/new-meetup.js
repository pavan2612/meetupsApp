import { MongoClient } from "mongodb"

async function handler(req,res){
    if(req.method==='POST'){
        const data = req.body
    }
    const client = await MongoClient.connect('mongodb+srv://meetups:9951122864@cluster0.p8gnz.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db()

    const collections = db.collection('meetup')
    const results = collections.insertOne(data)

    client.close()
    res.status(201).json({message: 'meetup inserted'})

}
export default handler