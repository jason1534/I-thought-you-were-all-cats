var state = 0;//0 in game/ 1 in bag /2 in item
const items_num = 16;
const history_num = 4;
var item_select = "";
var item_exist = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var history_exist = [1,0,0,0];

function tag(tag_num) {
    if (tag_num == 0) {
        $("#tag").hide();
    }
    else if (tag_num == 1) {
        $("#tag").show();
        $("#tag").css("background-image", "url(../classmade/asset/bag/menu.png)");
    }
    else if (tag_num == 2) {
        $("#tag").show();
        $("#tag").css("background-image", "url(../classmade/asset/bag/text.png)");
    }
    else if (tag_num == 3) {
        $("#tag").show();
        $("#tag").css("background-image", "url(../classmade/asset/bag/bag.png)");
    }
}
function detail(img_num,detail_num){//show the detail
}

$(document).ready(function () {
    $("#enter_bag").click(function () {//enter the bag
        $(this).hide();
        $('#back_img').show();
        $('#menu').show();//animation
        tag(1);
    });
    $("#back_img").click(function () {
        if (state == 0) {
            $(this).hide();
            $('#enter_bag').show();
            $('#menu').hide();//animation
            tag(0);
        }
        else if (state == 1) {
            $("#look_bag").show();
            $("#look_text").show();
            $("#menu").css("overflow", "hidden");
            $(".items").hide();
            $(".histories").hide();
            tag(1);
            state = 0;
        }
        else if (state == 2) {
            $("#look").css("display","none");  
            state = 1;            
        }
    });
    $("#look_bag").click(function () {
        $("#look_bag").hide();
        $("#look_text").hide();
        $("#menu").css("overflow", "scroll");
        $(".items").css("display", "inline-block");
        tag(3);
        state = 1;
    });
    $("#look_text").click(function () {
        $("#look_bag").hide();
        $("#look_text").hide();
        $("#menu").css("overflow", "scroll");
        $(".histories").css("display", "inline-block");
        tag(2);
        state = 1;
    });
    $(".items").click(function () {
        item_select = $(this).attr("id");//get the item id
        state = 2;//update to state 2 which means showing item detail
        for (index = 1; index < items_num + 1; index++) {
            var select = "item" + index;
            if (select == item_select && item_exist[index-1]) {
                //console.log(item_select);
                $("#look").css("display", "block");                
                $("#item_detail").text(item_select);
            }
        }
    });
    $(".histories").click(function () {
        item_select = $(this).attr("id");//get the item id
        state = 2;//update to state 2 which means showing item detail
        for (index = 1; index < history_num + 1; index++) {
            var select = "history" + index;
            if (select == item_select && history_exist[index-1]) {
                //console.log(item_select);
                $("#look").css("display", "block");                
                $("#item_detail").text(item_select);
            }
        }
    });

});
