var mstate = 0;
$(document).ready(function () {
/*     $("#vmt").click(function () {//enter the bag
        if (mstate == 0) {
            $("#vendingmachine_contain").show();
            $("#vendingmachine").show();
            mstate = 1;
        }
    }); */
    $("#draw").click(function () {
        if (mstate == 1) {
            $("#vendingmachine").hide();
            //console.log(item_select);
            var x = Math.floor((Math.random() * 6) + 7);
            var draw = "item" + x;
            item_exist[x-1] = 1;
            $("#buy_img").css("background-image", "url(" + item_img_source[draw] + ")");
            $("#buy_detail").html(item_detail_source[draw]);
            $('#buy_animation').fadeIn(500);
            mstate = 2;                
        }
    });
    $("#buy_animation").click(function () {
        if (mstate == 2) {
            $("#buy_animation").hide();
            $("#buy_information").show();            
            mstate = 3;
        }
    });
    
    $("#buy_information").click(function () {
        console.log(mstate);       
        if (mstate == 3) {
            $("#vendingmachine").hide();
            $("#buy_information").hide();
            mstate = 0;
        }
    });

});
