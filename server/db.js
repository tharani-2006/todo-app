require("dotenv").config();
const {MongoClient,ServerApiVersion} = require("mongodb");

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";

const options= {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
}

let client;

const connectoMongodb= async () => {
    if (!client) {
        try {
            client = new MongoClient(uri, options);
            await client.connect();
            console.log("Connected to MongoDB");
        } catch (error) {
            console.error("Error connecting to MongoDB:", error);
            throw error;
        }
    }
    return client;
};


const getConnectedClient = () => client;

module.exports = {
    connectoMongodb,
    getConnectedClient,
};