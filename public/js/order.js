function order()
{
        var n_strawberry = $('#n_strawberry').val();
        var n_banana = $('#n_banana').val();
        var bell = $('#bell').val();

        if(bell === "") bell = '1';
        if(n_strawberry === "") n_strawberry = '0';
        if(n_banana === "") n_banana = '0';

        if(n_strawberry < 0 || n_banana < 0 || bell < 0)
        {
                alert('음수는 안받습니다');
        }
        else if(isNaN(n_strawberry) || isNaN(n_banana) || isNaN(bell))
        {
                alert('숫자만 입력해주세요');
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
                        else {
                                alert('Error');
                        }
                });
        }
}
