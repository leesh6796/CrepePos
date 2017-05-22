function isInteger(n) {
        if(typeof n === 'string') {
                var isFloat = n.indexOf(".") > -1;
                var isExponential = n.indexOf("e") > -1;

                return !isFloat && !isExponential;
        } else {
                return false;
        }
}

function order()
{
        var n_strawberry = $('#n_strawberry').val();
        var n_banana = $('#n_banana').val();
        var bell = $('#bell').val();

        if(bell === "") bell = '1';
        if(n_strawberry === "") n_strawberry = 0;
        if(n_banana === "") n_banana = 0;

        if(!(isInteger(bell) && isInteger(n_strawberry) && isInteger(n_banana))) {
                alert('소수는 입력할 수 없습니다.');
        }
        else {
                n_strawberry = parseInt(n_strawberry);
                n_banana = parseInt(n_banana);
                bell = parseInt(bell);

                if(n_strawberry < 0 || n_banana < 0 || bell < 0)
                {
                        alert('음수는 안받습니다');
                }
                else if(n_strawberry === 0 && n_banana === 0)
                {
                        alert('둘 다 0은 안됩니다.');
                }
                else if(!Number.isInteger(n_strawberry) || !Number.isInteger(n_banana) || !Number.isInteger(bell))
                {
                        alert('정수만 입력해주세요');
                }
                else if(n_strawberry > 30 || n_banana > 30 || bell > 20)
                {
                        alert('이상한 숫자 넣지 마세요 ㅡㅡ');
                }
                else
                {
                        var url = vsprintf("order/add/%s/%s/%s", [bell, n_strawberry, n_banana]);
                        $.post(url, function(data) {
                                if(data === "complete")
                                        location.href= '/';
                                else if(data === "overwrite bell") {
                                        alert('번호표가 중복됩니다.');
                                } else if(data == "not integer") {
                                        alert('정수만 입력해주세요');
                                }
                        });
                }
        }
}

function completeOrder(id)
{
        var url = "order/complete/" + id.toString();
        $.ajax({
                url: url,
                type: 'PUT'
        }).done(function(msg) {
                if(msg.status == 200) {
                        $('#order_' + id.toString()).remove();
                }
        });
}

function deleteOrder(id)
{
        var url = "order/delete/" + id.toString();
        $.ajax({
                url: url,
                type: 'DELETE'
        }).done(function(msg) {
                if(msg.status == 200) {
                        $('#order_' + id.toString()).remove();
                }
        });
}
