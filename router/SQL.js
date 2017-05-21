
module.exports = class SQL {
        constructor() {
                var mysql = require('mysql');
                this.pool = mysql.createPool({
                        host : 'localhost',
                        user : 'crepe',
                        password : 'piastcrepe!!',
                        database : 'crepe',
                        waitForConnections:true,
                        connectionLimit:20
                });

                //this.conn.connect();
        }

        execute(query, cont) {
                this.pool.getConnection(function(err, conn) {
                        if(err) {
                                throw err;
                        }

                        conn.query(query, function(error, results, fields) {
                                if(error) {
                                        conn.release();
                                        throw error;
                                }
                                cont(results, fields);

                                conn.release();
                        });
                });
        }

        escape(data) {
                return this.pool.escape(data);
        }

        close() {
                this.pool.end(function(err) {
                        if(err) throw err;
                });
        }
};
