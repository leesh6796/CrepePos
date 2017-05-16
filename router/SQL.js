
module.exports = class SQL {
        constructor() {
                var mysql = require('mysql');
                this.conn = mysql.createConnection({
                        host : 'localhost',
                        user : 'crepe',
                        password : 'piastcrepe!!',
                        database : 'crepe'
                });

                this.conn.connect();
        }

        execute(query, cont) {
                this.conn.query(query, function(error, results, fields) {
                        if(error) throw error;
                        cont(results, fields);
                });
        }

        escape(data) {
                return this.conn.escape(data);
        }

        close() {
                this.conn.end();
        }
};
