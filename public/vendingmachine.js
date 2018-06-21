var mstate = 0;
$(document).ready(function () {
    $("#vmt").click(function () {//enter the bag
        if (mstate == 0) {
            $("#vendingmachine_contain").show();
            $("#vendingmachine").show();            
            mstate = 1;
        }
        else if (mstate == 1) {
            $("#vendingmachine").hide();
            $("#buy_information").show();            
            mstate = 2;
        }
        else if (mstate == 2) {
            $("#buy_information").hide();            
            $("#vendingmachine_contain").hide();
            mstate = 0;
        }
    });

});
