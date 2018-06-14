const express = require('express')
const app = express()
var redis = require('redis');

var key = "count";
var client = redis.createClient({host: "myredis",port:6379})
var is_redis_ready = false;
client.on("error", () => {
	console.log("error");
});
client.on("connect", () => {
	console.log("connected");
    is_redis_ready = true;

});

app.get('/', (req, res) => {
	if (!is_redis_ready){
		return res.end("can not connect to redis");
	}
	client.get( key, function(err, reply) {
		if (err){
			return res.end("Redis err");	
		}
    	
		if (!reply)	{
			reply = "1";
			client.set(key,reply);

		}else{
			client.incr( key, redis.print);
		}
		res.end("Total visit " +  reply);
	});

})

app.listen(3000, () => console.log('Example app listening on port 3000!'))