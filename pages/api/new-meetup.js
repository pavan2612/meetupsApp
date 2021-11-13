import { MongoClient } from "mongodb"

async function handler(req,res){
    if(req.method==='POST'){
    
    const data = req.body
    const client = await MongoClient.connect('mongodb+srv://meetup:meetups@cluster0.5bqm1.mongodb.net/meetup?retryWrites=true&w=majority')
    const db = client.db()

    const collections = db.collection('meetup')
    const results = await collections.insertOne(data)
    console.log(results)

    client.close()
    res.status(201).json({message: 'meetup inserted'})
    }
}
export default handler