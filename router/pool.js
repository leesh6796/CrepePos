var mysql = require('mysql');
var pool = mysql.createPool({
        host : 'localhost',
        user : 'crepe',
        password : 'piastcrepe!!',
        database : 'crepe',
        waitForConnections : true,
        connectionLimit : 20
});

process.on("exit", function() {
        pool.end(function(err) {
                if(err) throw err;
                console.log("Complete release all connections");
        });
});

pool.on('connection', function (connection) {
        console.log('Connection %d connect', connection.threadId);
});

pool.on('acquire', function (connection) {
        console.log('Connection %d acquired', connection.threadId);
});

pool.on('release', function (connection) {
        console.log('Connection %d released', connection.threadId);
});

module.exports = pool;
