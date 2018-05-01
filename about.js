function same1()
{
        $(".liecat").animate({left: '45%',bottom:'-29%'},500);
        $(".liecat").animate({opacity:'0.0'},250);
        $(".upcat").animate({opacity:'1.0'},1000);
        $(".title").fadeOut("slow");
}
function same2()
{
        $(".liecat").animate({opacity:'1.0'},10);
        $(".upcat").animate({opacity:'0.0'},50);
	$(".liecat").animate({left: '24%',bottom:'-20%'});
        $(".title").fadeIn("slow");
}
 
$(document).ready(function(){	
        $("#member1").hover(function(){		
		same1();
                $("#f1").animate({left: '-55%'},700);

	},function(){
                $("#f1").animate({left: '-110%'},500);
                same2();
        });  
       
        $("#member2").hover(function(){		
		same1();
                $("#f2").animate({left: '-25%'},700);

	},function(){
                $("#f2").animate({left: '-78%'},500);
                same2();
        });
        
        $("#member3").hover(function(){		
		same1();
                $("#f3").animate({left: '-46%'},700);

	},function(){
                $("#f3").animate({left: '-110%'},500);
                same2();
        });  
        
        $("#member4").hover(function(){		
		same1();
                $("#f4").animate({left: '-30%'},700);

	},function(){
                $("#f4").animate({left: '-110%'},500);
                same2();
        });  
       
        $("#member5").hover(function(){		
		same1();
                $("#f5").animate({left: '-22%'},700);

	},function(){
                $("#f5").animate({left: '-110%'},500);
                same2();
        });  
        
        $("#member6").hover(function(){		
		same1();
                $("#f6").animate({left: '-25%'},700);

	},function(){
                $("#f6").animate({left: '-110%'},500);
                same2();
        });  
        
        $("#member7").hover(function(){		
		same1();
                $("#f7").animate({left: '-25%'},700);

	},function(){
                $("#f7").animate({left: '-110%'},500);
                same2();
        });
        $("#member8").hover(function(){		
		same1();

	},function(){
                same2();
        });         
       
});
