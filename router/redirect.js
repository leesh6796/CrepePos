module.exports = {
        getIndex : function(req, res)
        {
                res.render('index.html', {title : 'PIAST Crepe Manager'});
        },
        getNewOrder : function(req, res)
        {
                res.render('neworder.html', {title : 'PIAST Crepe Manager - New Order'});
        }
};
