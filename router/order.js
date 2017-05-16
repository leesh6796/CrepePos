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

module.exports = {
        postAdd : function(req, res)
        {
                vsprintf = require('sprintf-js').vsprintf;

                var bell = parseInt(req.params.bell);
                var n_strawberry = parseInt(req.params.n_strawberry);
                var n_banana = parseInt(req.params.n_banana);
                var time = getTime();

                var price_strawberry = 2500;
                var price_banana = 2000;

                var price = price_strawberry * n_strawberry + price_banana * n_banana;

                var SQL = require('./SQL');
                sql = new SQL();

                var params = vsprintf("%d$%d$%d", [bell, n_strawberry, n_banana]);
                var query = vsprintf("insert into log(type, parameter, time) values('add', %s, %s);", [sql.escape(params), sql.escape(time)]);
                sql.execute(query, function(results, fields) { });

                query = vsprintf("insert into queue(bell, n_strawberry, n_banana, price, time) values(%d, %d, %d, %d, %s);", [sql.escape(bell), sql.escape(n_strawberry), sql.escape(n_banana), sql.escape(price), sql.escape(time)]);
                sql.execute(query, function(results, fields) { });

                sql.close();

                res.send("complete");
        }
};
