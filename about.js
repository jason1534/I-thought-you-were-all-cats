
var shift = ['-45%','-15%','-36%','-30%','-22%','-25%','-25%'];
var state = [0,0];//last one ,on or off
function same1(i,right)
{
  $(".liecat").stop().animate({left: '45%',bottom:'-29%'},700);
  $(".liecat").animate({opacity:'0.0'},250);
  $(".upcat").animate({opacity:'1.0'},1000);
  $(".title").animate({opacity:'0.0'},500);
  $(".member").animate({opacity:'0.3'},200);

  $("#member"+i).animate({opacity:'1.0'},200);
  $("#f"+i).animate({left: right},700);
  $("#intro"+i).fadeIn(1000);
}
function same2(i,left)
{
  $("#intro"+i).fadeOut("quick");
  $("#f"+i).animate({left: left},500);

  $(".member").animate({opacity:'1.0'},200);
  $(".liecat").animate({opacity:'1.0'},10);
  $(".upcat").animate({opacity:'0.0'},50);
  $(".liecat").animate({left: '24%',bottom:'-20%'});
  $(".title").animate({opacity:'1.0'},500);
}

$(document).ready(function(){ 
  for (let index = 1; index <=7; index++) {
    $("#member"+index).click(function(){
      if(state[1]==1 && state[0]==index)//
      {
        same2(state[0],'-150%'); 
        state[1]=0;
        state[0]=index;                        
      }
      else if(state[1]==1 && state[0]!=index)//
      {
        same2(state[0],'-150%');
        same1(index,shift[index-1]);
        state[1]=1;
        state[0]=index;       
      }
      else if(state[1]==0)
      {
        same1(index,shift[index-1]);
        state[1]=1;
        state[0]=index;
      }               

    });                
  }
  $("#member8").click(function(){   
    if(state[1]==1 && state[0]==8)//
    {
      $("#intro8").fadeOut("quick");
      same2();
      state[1]=0;
      state[0]=8;                        
    }
    else if(state[1]==1 && state[0]!=8)
    {
      same2(state[0],'-150%');
      same1();
      $("#member8").animate({opacity:'1.0'},200);
      $("#intro8").fadeIn(1000);
      state[1]=1;
      state[0]=8;       
    }
    else if(state[1]==0)
    {
      same1();
      $("#member8").animate({opacity:'1.0'},200);
      $("#intro8").fadeIn(1000);
      state[1]=1;
      state[0]=8;
    }  
  });
  /*$("body:not(.member)").click(function()
   *         {
   *                         if(state[1]==1 && state[0]==8)//
   *                                         {
   *                                                          $("#intro8").fadeOut("quick");
   *                                                                           same2();
   *                                                                                            state[1]=0;
   *                                                                                                             state[0]=8;                        
   *                                                                                                                             }
   *                                                                                                                                             else if(state[1]==1 && state[0]!=8)
   *                                                                                                                                                             {
   *                                                                                                                                                                              same2(state[0],'-150%');
   *                                                                                                                                                                                               state[1]=1;
   *                                                                                                                                                                                                                state[0]=8;       
   *                                                                                                                                                                                                                                }
   *                                                                                                                                                                                                                                        }); */

  /* $("#member1").hover(function(){    
   *                 same1("#member1","#f1","#intro1",'-45%');
   *                  },function(){
   *                                  same2("#intro1","#f1",'-140%');
   *                                          });  
   *                                                 
   *                                                         $("#member2").hover(function(){    
   *                                                                         same1("#member2","#f2","#intro2",'-15%');
   *                                                                          },function(){
   *                                                                                          same2("#intro2","#f2",'-108%');
   *                                                                                                  });
   *                                                                                                          
   *                                                                                                                  $("#member3").hover(function(){   
   *                                                                                                                                  same1("#member3","#f3","#intro3",'-36%');
   *                                                                                                                                    },function(){
   *                                                                                                                                                    same2("#intro3","#f3",'-140%');
   *                                                                                                                                                            });  
   *                                                                                                                                                                    
   *                                                                                                                                                                            $("#member4").hover(function(){   
   *                                                                                                                                                                                            same1("#member4","#f4","#intro4",'-30%');
   *                                                                                                                                                                                              },function(){
   *                                                                                                                                                                                                              same2("#intro4","#f4",'-140%');
   *                                                                                                                                                                                                                      });  
   *                                                                                                                                                                                                                             
   *                                                                                                                                                                                                                                     $("#member5").hover(function(){    
   *                                                                                                                                                                                                                                                     same1("#member5","#f5","#intro5",'-22%');
   *                                                                                                                                                                                                                                                      },function(){
   *                                                                                                                                                                                                                                                                      same2("#intro5","#f5",'-140%');
   *                                                                                                                                                                                                                                                                              });  
   *                                                                                                                                                                                                                                                                                      
   *                                                                                                                                                                                                                                                                                              $("#member6").hover(function(){   
   *                                                                                                                                                                                                                                                                                                              same1("#member6","#f6","#intro6",'-25%');
   *                                                                                                                                                                                                                                                                                                                },function(){
   *                                                                                                                                                                                                                                                                                                                                same2("#intro6","#f6",'-140%');
   *                                                                                                                                                                                                                                                                                                                                        });  
   *                                                                                                                                                                                                                                                                                                                                                
   *                                                                                                                                                                                                                                                                                                                                                        $("#member7").hover(function(){   
   *                                                                                                                                                                                                                                                                                                                                                                        same1("#member7","#f7","#intro7",'-25%');
   *                                                                                                                                                                                                                                                                                                                                                                          },function(){
   *                                                                                                                                                                                                                                                                                                                                                                                          same2("#intro7","#f7",'-140%');
   *                                                                                                                                                                                                                                                                                                                                                                                                  });*/        

});
