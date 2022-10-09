// const Kafka = require("kafkajs").Kafka;
const {Kafka} = require("kafkajs");
// import {Kafka} from "kafkajs";

run();
async function run() {
    try {
        // to create a topic you need to have admin connection

        //creating kafka instace for tcp connection
        const kafka = new Kafka({
            "cliendtId": "myKafka", //str
            "brokers": ["172.16.5.4:9092"] 
            //with zookeeper one broker can go up or down so multiple broker and client chooses
        });

        const admin = kafka.admin(); //admin instance
        await console.log("Connectin.....!")
        admin.connect(); //conect 
        console.log("Connected!");

        //creating topics
        //dupication raises exception
        await admin.createTopics({
            "topics": [{
                "topic": "Hell",
                "numPartitions": 1
            }]
        });
        console.log("Created successfully");
        await admin.disconnect();
    }
    catch(ex)
    {
        console.error(`Something went wrong ${ex}`);
    }
    finally{
        process.exit(0);
    }
}


