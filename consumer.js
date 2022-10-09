// const Kafka = require("kafkajs").Kafka;
const {Kafka} = require("kafkajs");
// import {Kafka} from "kafkajs";

run();
async function run() {
    try {
        //creating producer
        const kafka = new Kafka({
            "cliendtId": "myKafka", //str
            "brokers": ["172.16.5.4:9092"] 
            
        });

        const consumer = kafka.consumer({
            //for this will be in same group
            "groupId": "test"
            //the multiple consumer assigns partition among them but will be in same group

        }); //consumer instance
        console.log("Connectin.....!")
        await consumer.connect(); //conect 
        console.log("Connected!");

        await consumer.subscribe({
            "topic":"Users2",
            "fromBeginning":true //if alot can be made false
        })

        await consumer.run({
            //run for each message function
            "eachMessage":async result => { 
                
                console.log(`RCVD MSg ${result.message.value} on partition ${result.partition.toString()} & ${result.heartbeat.length}`);
                
            }
        })
        
        console.log(`Send successfully successfully ${JSON.stringify(result)}`);
        

        //keeping the consumer connection open
        // await consumer.disconnect();
    }
    catch(ex)
    {
        console.error(`Something went wrong ${ex}`);
    }
    finally{
        //process is always running
        // process.exit(0);
    }
}


