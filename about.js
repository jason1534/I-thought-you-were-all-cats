function same1()
{
        $(".liecat").stop().animate({left: '45%',bottom:'-29%'},500);
        $(".liecat").stop().animate({opacity:'0.0'},250);
        $(".upcat").stop().animate({opacity:'1.0'},1000);
        $(".title").stop().animate({opacity:'0.0'},500);
        $(".member").stop().animate({opacity:'0.3'},200);
}
function same2()
{
        $(".member").animate({opacity:'1.0'},200);
        $(".liecat").animate({opacity:'1.0'},10);
        $(".upcat").animate({opacity:'0.0'},50);
	$(".liecat").animate({left: '24%',bottom:'-20%'});
        $(".title").animate({opacity:'1.0'},500);
}
 
$(document).ready(function(){	
        $("#member1").hover(function(){		
                same1();
                $("#member1").animate({opacity:'1.0'},200);
                $("#f1").animate({left: '-55%'},700);
                $("#intro1").fadeIn(1000);

	},function(){
                $("#intro1").fadeOut("quick");
                $("#f1").animate({left: '-110%'},500);
                same2();
        });  
       
        $("#member2").hover(function(){		
                same1();
                $("#member2").animate({opacity:'1.0'},200);
                $("#f2").animate({left: '-25%'},700);
                $("#intro2").fadeIn(1000);
	},function(){
                $("#intro2").fadeOut("quick");
                $("#f2").animate({left: '-78%'},500);
                same2();
        });
        
        $("#member3").hover(function(){		
                same1();
                $("#member3").animate({opacity:'1.0'},200);
                $("#f3").animate({left: '-46%'},700);
                $("#intro3").fadeIn(1000);
	},function(){
                $("#intro3").fadeOut("quick");
                $("#f3").animate({left: '-110%'},500);
                same2();
        });  
        
        $("#member4").hover(function(){		
                same1();
                $("#member4").animate({opacity:'1.0'},200);
                $("#f4").animate({left: '-30%'},700);
                $("#intro4").fadeIn(1000);
	},function(){
                $("#intro4").fadeOut("quick");
                $("#f4").animate({left: '-110%'},500);
                same2();
        });  
       
        $("#member5").hover(function(){		
                same1();
                $("#member5").animate({opacity:'1.0'},200);
                $("#f5").animate({left: '-22%'},700);
                $("#intro5").fadeIn(1000);
	},function(){
                $("#intro5").fadeOut("quick");
                $("#f5").animate({left: '-110%'},500);
                same2();
        });  
        
        $("#member6").hover(function(){		
                same1();
                $("#member6").animate({opacity:'1.0'},200);
                $("#f6").animate({left: '-25%'},700);
                $("#intro6").fadeIn(1000);
	},function(){
                $("#intro6").fadeOut("quick");
                $("#f6").animate({left: '-110%'},500);
                same2();
        });  
        
        $("#member7").hover(function(){		
                same1();
                $("#member7").animate({opacity:'1.0'},200);
                $("#f7").animate({left: '-25%'},700);
                $("#intro7").fadeIn(1000);
	},function(){
                $("#intro7").fadeOut("quick");
                $("#f7").animate({left: '-110%'},500);
                same2();
        });
        $("#member8").hover(function(){		
                same1();
                $("#member8").animate({opacity:'1.0'},200);
                $("#intro8").fadeIn(1000);
	},function(){
                $("#intro8").fadeOut("quick");
                same2();
        });         
       
});
