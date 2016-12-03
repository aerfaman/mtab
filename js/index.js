// $(document).ready(function(){
// 	$(".tab-card").mouseover(function(){
// 		$('.close').show();
// 	});
// 	$(".tab-card").mouseout(function(){
// 		$('.close').hide();
// 	});
// });


$(function() {
    $('img').on('error', function() {
        var retry= $('#img').attr("retry");

        if (retry > 0) {
            $('img').attr('src', 'https://iustudio.science/images/srpr/logo11w.png');
        } else {
            retry++;

            $('img').attr("retry", retry);
            $('img').attr('src', $('img').attr('src'));
        }
    });
})
