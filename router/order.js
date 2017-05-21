var getTime = function() {
        var time = new Date();

        var day = time.getDate();
        day = (day < 10 ? "0" : "") + day;

        var hour = time.getHours();
        hour = (hour < 10 ? "0" : "") + hour;

        var min = time.getMinutes();
        min = (min < 10 ? "0" : "") + min;

        var sec = time.getSeconds();
        sec = (sec < 10 ? "0" : "") + sec;

        return day + '-' + hour + '-' + min + '-' + sec;
};

vsprintf = require('sprintf-js').vsprintf;

module.exports = {
        postAdd : function(req, res) // 새로운 주문
        {
                var bell = parseInt(req.params.bell);
                var n_strawberry = parseInt(req.params.n_strawberry);
                var n_banana = parseInt(req.params.n_banana);
                var time = getTime();

                var price_strawberry = 2500;
                var price_banana = 2000;

                var price = price_strawberry * n_strawberry + price_banana * n_banana;

                /*var SQL = require('./SQL');
                sql = new SQL();*/

                pool = require('./pool');
                pool.getConnection(function(err, conn) {
                        if(err) throw err;

                        conn.query("select * from queue where bell=" + bell + ";", function(error, results, fields) {
                                if(results.length > 0) {
                                        res.send("overwrite bell");
                                        conn.release();
                                }
                                else {
                                        // log에 add 정보 추가
                                        var params = vsprintf("%d$%d$%d", [bell, n_strawberry, n_banana]);
                                        var query = vsprintf("insert into log(type, parameter, time) values('add', %s, %s);", [pool.escape(params), pool.escape(time)]);
                                        conn.query(query, function(error, results, fields) { });

                                        // queue에 new crepe order 추가
                                        query = vsprintf("insert into queue(bell, n_strawberry, n_banana, price, time) values(%d, %d, %d, %d, %s);", [pool.escape(bell), pool.escape(n_strawberry), pool.escape(n_banana), pool.escape(price), pool.escape(time)]);
                                        conn.query(query, function(error, results, fields) {
                                                res.send("complete");

                                                conn.release();
                                        });
                                }
                        });
                });
        },
        getGet : function(req, res) // 현재 주문정보 Get
        {
                pool = require('./pool');
                pool.getConnection(function(err, conn) {
                        if(err) throw err;

                        var query = "select * from queue;";
                        conn.query(query, function(error, results, fields) {
                                if(error) throw error;

                                queue = [];

                                var i;
                                for(i=0; i<results.length; i++)
                                {
                                        piece = {id : 0, bell : 0, n_strawberry : 0, n_banana : 0, price : 0, time : ''};
                                        row = results[i];

                                        piece.id = row.id;
                                        piece.bell = row.bell;
                                        piece.n_strawberry = row.n_strawberry;
                                        piece.n_banana = row.n_banana;
                                        piece.price = row.price;
                                        piece.time = row.time;

                                        queue.push(piece);
                                }

                                res.send({res : queue});

                                conn.release();
                        });
                });
        },
        putComplete : function(req, res) // 해당 크레페 정보 완료
        {
                pool = require('./pool');
                pool.getConnection(function(err, conn) {
                        if(err) throw err;

                        var id = parseInt(req.params.id);

                        var completeOrder = {id : 0, bell : 0, n_strawberry : 0, n_banana : 0, price : 0, time : ''};
                        var query = vsprintf("select id, bell, n_strawberry, n_banana, price, time from queue where id=%d;", [pool.escape(id)]);
                        conn.query(query, function(error, results, fields) { // queue에 complete하려는 order가 존재한다면
                                if(error) throw error;

                                if(results.length > 0)
                                {
                                        var rv = results[0];
                                        completeOrder.id = rv.id;
                                        completeOrder.bell = rv.bell;
                                        completeOrder.n_strawberry = rv.n_strawberry;
                                        completeOrder.n_banana = rv.n_banana;
                                        completeOrder.price = rv.price;
                                        completeOrder.time = rv.time;

                                        // Complete Task를 queue table에서 삭제
                                        query = vsprintf("delete from queue where id=%d;", [completeOrder.id]);
                                        conn.query(query, function(error, results, fields) { });

                                        // Complete Task를 complete table에 추가
                                        query = vsprintf("insert into complete(id, n_strawberry, n_banana, price, time) values(%d, %d, %d, %d, %s);", [completeOrder.id, completeOrder.n_strawberry, completeOrder.n_banana, completeOrder.price, pool.escape(completeOrder.time)]);
                                        conn.query(query, function(error, results, fields) {
                                                if(error) throw error;
                                        });

                                        var now = getTime();
                                        var params = vsprintf("%d$%d$%s", [completeOrder.id, completeOrder.bell, completeOrder.time]);
                                        query = vsprintf("insert into log(type, parameter, time) values('complete', %s, %s);", [params, now]);
                                        conn.query(query, function(error, results, fields) { });

                                        res.send({success : "Complete Successfully", status : 200});
                                }

                                conn.release();
                        });
                });
        },
        deleteCrepe : function(req, res) {

        }
};
