docker run --name mongo -d \
--restart=always \
-p 27017:27017 \
-v $pwd/mongo/mongo-volume:/data/db \
mongo