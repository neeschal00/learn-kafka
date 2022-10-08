# learn-kafka
tuts in kafka


## Docker cmd:
setting up docker in zookeeper
> docker run --name zookeeper  -p 2181:2181 -d zookeeper
**exposing port outside**

setting up kafka in docker
> docker run -p 9092:9092 --name kafka  -e KAFKA_ZOOKEEPER_CONNECT=neeschal00-learn-kafka-xpw4qr45v7rf9g9-2181.githubpreview.dev:2181 -e 
> KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://neeschal00-learn-kafka-xpw4qr45v7rf9g9-2181.githubpreview.dev:9092 -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 -d confluentinc/cp-kafka 


**kafka requires zookeeper instance**
**-e for environment variables to run kafka using configs**

> Note: if using codespace use the active port url domain for hostname n port
- for the above case the listeners is only 1 so is mentioned in the cli 
- kafka supports ssl and plain text protocol
- kafka by default spins up 3 instance so have offsets topic replication in env