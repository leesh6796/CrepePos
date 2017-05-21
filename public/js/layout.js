function initMainPage() {
        $.get("order/get", function(data) {
                var i;
                for(i=0; i<data.res.length; i++) {
                        var row = data.res[i];

                        var id = row.id;
                        var bell = row.bell;
                        var n_strawberry = row.n_strawberry;
                        var n_banana = row.n_banana;
                        var price = row.price;
                        var time = row.time;

                        //var completeURL = "order/complete/" + id.toString();
                        var deleteURL = "";

                        var strTime = time.split('-');
                        strTime = "2017년 5월 " + strTime[0] + "일 " + strTime[1] + "시 " + strTime[2] + "분 " + strTime[3] + "초";

                	var dom = '<li id=\"order_' + id.toString() + '\" class=\"list-group-item\"><h4 class=\"list-group-item-heading\">딸기 ' + n_strawberry + '개 바나나 ' + n_banana + '개<a class=\"inListLink\" onclick=\"if(confirm(\'완료하시겠습니까?\')) completeOrder(' + id + ')\">완료</a></h4><p class=\"list-group-item-text\">' + strTime + '   <a onclick=\"return confirm(\'삭제하시겠습니까?\');\" href=\"' + deleteURL + '\">삭제</a></p></li>';

                	$('#mainlist').append(dom);
                }
        });
}

function isPC()
{
	var agent = navigator.userAgent.toLowerCase();
	var filter = new Array('android','iphone','ipad');

	for(var i=0; i<filter.length; i++)
	{
		if(agent.indexOf(filter[i]) != -1)
			return 0;
	}
	return 1;
}

function PCOptimization()
{
	if(isPC() == 1)
	{
		$('.page').css({'padding-left':'30%','padding-right':'30%'});
	}
	else
	{
		$('.btn').after('<br /><br />');
	}
}
