import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb://raadhosieni:1234@cluster0-shard-00-00.tue3d.mongodb.net:27017,cluster0-shard-00-01.tue3d.mongodb.net:27017,cluster0-shard-00-02.tue3d.mongodb.net:27017/meetups?ssl=true&replicaSet=atlas-x0ijne-shard-0&authSource=admin&retryWrites=true&w=majority"
    );

    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: "Meetup inserted" });
  }
}

export default handler;
