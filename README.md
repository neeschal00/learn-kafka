# learn-kafka
tuts in kafka


## Docker cmd:
setting up docker in zookeeper
> docker run --name zookeeper  -p 2181:2181 -d zookeeper
** exposing port outside **

setting up kafka in docker
> docker run -p 9092:9092 --name kafka  -e KAFKA_ZOOKEEPER_CONNECT=neeschal00:2181 -e 
> KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://neeschal00:9092 -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 -d confluentinc/cp-kafka 
** kafka requires zookeeper instance **
** -e for environment variables to run kafka using configs **