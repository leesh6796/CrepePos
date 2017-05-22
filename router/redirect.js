module.exports = {
        getIndex : function(req, res)
        {
                res.render('index.html', {title : 'PIAST Crepe Manager'});
        },
        getNewOrder : function(req, res)
        {
                res.render('neworder.html', {title : 'PIAST Crepe Manager - New Order'});
        },
        getResult : function(req, res)
        {
                res.render('result.html', {title : 'PIAST Crepe Manager - Result'});
        }
};
