module.exports = {
        getIndex : function(req, res)
        {
                res.render('index.html');
        },
        getNewOrder : function(req, res)
        {
                res.render('neworder.html');
        }
};
