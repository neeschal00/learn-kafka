// const Kafka = require("kafkajs").Kafka;
const {Kafka} = require("kafkajs");
// import {Kafka} from "kafkajs";
const msg = process.argv[2];

run();
async function run() {
    try {
        //creating producer
        const kafka = new Kafka({
            "cliendtId": "myKafka", //str
            "brokers": ["172.16.5.4:9092"] 
            
        });

        const producer = kafka.producer(); //producer instance
        console.log("Connectin.....!")
        await producer.connect(); //conect 
        console.log("Connected!");

        const partition = msg[0].toUpperCase() < "N" ? 0:1; //sep partition based on starting letter
        console.log(partition);
        //sending an event
        const result = await producer.send({
            "topic": "Users2",
            //can't send multiple message so is an array
            "messages": [
                {
                    "value": msg,
                    "partition": partition
                }
            ]
        })
        console.log(`Send successfully successfully ${JSON.stringify(result)}`);
        await producer.disconnect();
    }
    catch(ex)
    {
        console.error(`Something went wrong ${ex}`);
    }
    finally{
        process.exit(0);
    }
}


