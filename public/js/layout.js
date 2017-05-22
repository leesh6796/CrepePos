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

                	var dom = '<li id=\"order_' + id.toString() + '\" class=\"list-group-item\"><span class="badge">' + bell.toString() + '</span><h4 class=\"list-group-item-heading\">딸기 ' + n_strawberry + '개 바나나 ' + n_banana + '개<a class=\"inListLink\" onclick=\"if(confirm(\'완료하시겠습니까?\')) completeOrder(' + id + ')\">완료</a></h4><p class=\"list-group-item-text\">' + strTime + '   <a onclick=\"if(confirm(\'삭제하시겠습니까?\')) deleteOrder(' + id + ');\">삭제</a></p></li>';

                	$('#mainlist').append(dom);
                }
        });
}

function initResultPage() {
        $.get("order/get/result", function(data) {
                var res = data;

                var n_strawberry = res.n_strawberry;
                var n_banana = res.n_banana;
                var price = 2500 * n_strawberry + 2000 * n_banana;

                $('#n_strawberry').html('딸기 크레페는 ' + n_strawberry.toString() + '개 팔렸습니다.');
                $('#n_banana').html('바나나 크레페는 ' + n_banana.toString() + '개 팔렸습니다.');
                $('#n_sum').html('크레페는 총 ' + (n_strawberry + n_banana).toString() + '개 팔렸습니다.');
                $('#price').html('총 매출액은 ' + price.toString() + '원 입니다.');
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
