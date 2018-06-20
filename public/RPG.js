var roleplayer=getById("txName").value;         //若使用者沒修改，就是預設的名稱：張天豪
var initArr=new Array("lbName","btnStart","scene_init","cat","aboutus");
var plotArr=new Array("character","convers","sensor","scene_plot");
var switchArr=new Array("btnnext");
//var objectArr=new Array("history1")
var scene=0;  //現在是哪個場景
var chapter=0;//debug章節改這裡不用按太多次

//存章節各元素的陣列
var conversationArr=new Array();
var characterArr=new Array();
var continueArr=new Array();
var backgroundArr=new Array();
var characterposArr=new Array();


//這個陣列是用來對應每個角色的不同個性的圖檔，就不用記檔名了
var player=[];
	player["I"]={normal: "I",happy: "IHappy",sad: "ISad",angry: "IAngry", surprise: "Isurprise", end: "IEnd"};
	player["wild"]={normal: "wild",say: "wildSay",suck: "wildsuck", ya: "wildYA"};
	player["turtle"]={normal: "turtle",happy: "turtleHappy",sad: "turtleSad", angry: "turtleAngry"};

//這個陣列是儲存抉擇的部分
var choice=[];
	choice[0]=new Array("走吧！","離家出走這樣不好吧...","");
	choice[1]=new Array("熱蘭遮城","普羅民遮城","鄭成功的家");//給第一章的第一個選擇問題
	choice[2]=new Array("Let's Rock n' roll","Call me maybe!","可能牠的手就長那樣吧");
	choice[3]=new Array("贔屭(ㄅㄧˋㄒㄧˋ)","贔屭(ㄅㄟˋㄌㄟˇ)","贔屭(ㄅㄧㄝ ㄌㄨˋ)");
    choice[4]=new Array("赤崁樓的烏龜","保安宮內的龜","曜西");
    choice[5]=new Array("10","9","8");

//這個陣列儲存每個場景人物的對話
var convArr=[];

//簡寫各個元件
var character=getById("character"), plot=getById("scene_plot"), conv=getById("convers"), sensor=getById("sensor"), 
	select1=getById("select1"), select2=getById("select2"), select3=getById("select3"), leave=getById("leave"), backbtn1=getById("back1"),
    backbtn2=getById("back2"), backbtn3=getById("back3"),
	history1=getById("history1"), history2=getById("history2"), potatochip=getById("potatochip"), idform=getById("idform"),
    txName=getById("txName"), btnlogin=getById("btnlogin"), btnreset=getById("btnreset"), umm=getById("umm"),
    switchpic=getById("switchpic"), fbbtn=getById("fbbluebtn"), littlecat=getById("cat"), game=getById("game"),
    history3=getById("history3"), bottle=getById("bottle"), idcard=getById("idcard");

//一開始將其他場景隱藏
hideArr(plotArr);
hideArr(switchArr);
//初始畫面
hide(game);
hide(idform);
hide(txName);
hide(btnlogin);
hide(btnreset);
hide(umm);
hide(switchpic);
hide(littlecat);
//按鈕
hide(leave);
hide(backbtn1);
hide(backbtn2);
hide(backbtn3);
//功能物件
hide(history1);
hide(history2);
hide(history3);
hide(potatochip);
hide(bottle);
hide(idcard);
//一開始將抉擇隱藏
hideChoice();

/*******************************初始畫面(輸入主角按名並開始)******************************/
getById("umm").onclick=function(){
    roleplayer=getById("txName").value;         //假如使用者修改過名字，這個值就不會是預設的"永馨"
    //接著將場景切換到一開始的劇情(可按跳過!)
    //場景是由背景圖、人物框、對話框組成
    hideArr(initArr);       //先關閉按下開始的畫面
    showArr(plotArr);
    hide(leave);
    hide(idform);
    hide(txName);
    hide(btnlogin);
    hide(btnreset);
    hide(umm);
}
// btnlogin.onclick=function(){
//     roleplayer=getById("txName").value;
//     hideArr(initArr);
//     showArr(plotArr);
//     hide(leave);
//     hide(idform);
//     hide(txName);
//     hide(btnlogin);
//     hide(btnreset);
//     hide(umm);
// }
getById("btnStart").onclick=function(){
    show(txName);
    show(idform);
    show(btnlogin);
    show(btnreset);
    show(umm);
    show(littlecat);
    hide(btnStart);
    hide(fbbtn);
  
    var pos = 400;
    var mv = setInterval(frame, 5);
    function frame() {
        if (pos == 150) {
          clearInterval(mv);
        } else {
          pos--; 
          littlecat.style.top = pos + 'px'; 
        }
      }
}
//離開時先把新章節存入
leave.onclick=function(){
    chapter++;
    scene=0;
    //showArr(switchArr);
    //show(switchpic);
    hideArr(plotArr);
    hide(leave);
    convArr=new Array(conversationArr[chapter][0]);//先把新章節的第一句話存進來
    conv.innerHTML=convArr;
    charArr=new Array(characterArr[chapter][0]);
    character.style.background="url(pic/"+charArr[scene]+".jpg)";
	character.style.left="25px";
	character.style.top="100px";
	character.style.width="350px";
	character.style.height="451px";
	bgArr=new Array(backgroundArr[chapter][0]);
	plot.style.background="url(pic/"+bgArr[scene]+".jpg)";
    plot.style.backgroundRepeat="no-repeat";
    plot.style.backgroundAttachment="fixed";
    plot.style.backgroundPosition="center";
    plot.style.backgroundSize="cover";
    $("#game").show();
}

backbtn1.onclick=function(){
    scene=scene-2;
    fireClick(sensor);
    hide(backbtn1);
}
backbtn2.onclick=function(){
    scene=scene-3;
    fireClick(sensor);
    hide(backbtn2);
}
backbtn3.onclick=function(){
    scene=scene-4;
    fireClick(sensor);
    hide(backbtn3);
}

getById("btnnext").onclick=function(){
	hideArr(initArr);
	hideArr(switchArr);
    showArr(plotArr);
    hide(leave);
    hide(switchpic);
}

/*************************************這邊處理劇情部分***********************************/
sensor.onclick=function(){
    //這個陣列比較特別，因為我們的roleplayer會隨著使用者輸入後修改，因此要放在這邊設定
    //若原本的部分是抉擇，就將對話統一改成false，讓陣列與陣列對齊
    //開始篇
    conversationArr[0]=new Array("喵~星期三下午好無聊啊~鏟屎官又不知道去哪裡鬼混了，真是該罰~朕每天管理朝政既勞心又勞力，也不多給我吃幾個罐罐……",
        "野貓："+roleplayer+"，喵哈哈哈哈~",
        roleplayer+"：誰！？",
        "野貓：窗外窗外~~你這傢伙真是笑死我了喵~",
        roleplayer+"：大膽刁民竟如此嘲笑朕",
        "野貓：哈哈哈！「大膽刁民」哈哈哈，你這傢伙中二病吧你",
        roleplayer+"：不要把朕跟那些阿宅相並論，鏟屎官說過朕就是至高無上的皇帝",
        "野貓：他說什麼你都信?就是受不了你們這些家貓，一個個都嬌生慣養，來！敢不敢跟哥出去長長眼界，哥帶你去吃吃到飽歐",
        roleplayer+"：吃…吃到飽！？仔細想想朕的確是應該巡視巡視自己的土地...我倒要看看市井小民們平常的生活有多精彩",
        false,"野貓：好好好~跟著哥包準你有糖吃~","野貓：走啦！跟著貓哥幹，肯定難波萬！");
    characterArr[0]=new Array(player["I"].normal,player["wild"].normal,player["I"].normal,player["wild"].normal,
					player["I"].normal,player["wild"].normal,player["I"].normal,player["wild"].normal,player["I"].normal,
					player["I"].normal,player["wild"].normal,player["wild"].normal);    
    characterposArr[0] =new Array(0,1,0,1,0,1,0,1,0,0,1,1);
	continueArr[0]=new Array(true,true,true,true,true,true,true,true,false,0,true,true);//倒數第三個那個number是指哪一個選項陣列
	backgroundArr[0]=new Array("house","house","house","house","house","house","house","house","house","house","house","house");
//第一章開始
    conversationArr[1]=new Array("喵？我們來這裡幹嘛？這裡看起來不像是吃到飽阿？",
    	"別急~你知道這裡是哪裡嗎？",
    	false,"NO!","喵~這裡就是人類口中的赤崁樓喵","FK!",
    	"刺砍樓？真是血腥，沒想到朕的領地之內竟有如此險惡的地方",
    	"……(嘆氣)……嘛，總之我們先進去吧",
    	"等等，門口竟有門衛守著，看來不能冒然進去阿",
    	"別擔心別擔心，只要拿出免死金牌就沒問題了",
    	"免死金牌？野貓兄竟有如此特權嗎",
    	"哼哼哼，我特別幫兄弟你也準備了一張，別說哥對你不好啊",
    	"歐歐歐看起來好厲害喵",
    	"那當然！只要拿著這張免死金牌，在台南市區內妳可以直著走、斜著走、橫著走，絕對沒有人會攔你",
        false,
    	"這...這太貴重了，野貓兄請容我今後喚你一聲大哥",
    	"客氣客氣，那咱們就進去吧",
    	"那個人(指荷蘭人)怎麼一臉很委屈的樣子阿，他是不是做錯了什麼事",
    	"喔~這你就有所不知了吧，這人本來還是跪著的呢",
    	"喵！？居然向朕以外的人下跪！哪來的大膽刁民！想篡奪王位嗎？",
    	"恩…乖…這個拿著(無奈臉",
    	false,"喵？好多字啊…總之是朕誤會了對吧？果然朕才是九五之尊喵",
    	"孩子…有病要吃藥知道嗎…",
    	"恩！？旁邊的小賣部在賣什麼？成功洋芋片？",
    	false,"歐~那個阿~今年剛推出的新產品，好像還特別請鄭成功他老人家出來代言呢！",
    	"真的阿！？那他的手勢是什麼意思啊？",
    	false,"NO!","FK!","是歐…不過牠的畫風怎麼跟我平常看到的人類不太一樣啊？",
    	"恩……可能是修過圖吧？聽說人類拍照都要開些濾鏡什麼的，所以才跟我們平常看到的人類長得不一樣吧喵~",
    	"原來如此，大哥真聰明，難怪鏟屎官的相片朕都覺得跟真實有點落差~一定是特效開很強~所以朕就是要吃這個洋芋片吃到飽嗎？",
    	"當然不是阿~不過也快到了喵~",
    	"噔愣~~",
    	"哇~~好多魚阿~(口水",
    	"哥沒騙你吧~這些魚每天被觀光客餵食的肥滋滋的，哥早就想吃吃看了，趁著今天帶著兄弟你，咱倆就把魚分了吧",
    	"烏龜：且慢且慢，爪下留情啊兩位",
    	"誰！？",
    	"是老夫阿~上面上面~",
    	"喵！？這烏龜也太大了",
    	"老夫可不是普通的烏龜，老夫是贔屭。",
    	"什麼？你說你是…",
    	false,"no!","FK!","是啊，看看旁邊一整排的兄弟們，咱們就是被稱為龍生九子的贔屭，也被奉為龍的傳人呢！這些魚都是咱的老朋友了，吃不得啊",
    	"大哥…",
    	"恩…聽牠這麼一說還當真下不了嘴…",
    	"可是難得的吃到飽…",
    	"老夫說個故事補償你們吧",
    	"可是故事不能當飯吃啊…話說你揹著那麼大塊石頭要幹嘛呢？((拍打，抓抓",
    	"哈哈哈我也來((拍打",
    	"這就跟我要說的故事有關了，且聽老夫娓娓道來吧…",
    	false,"如此這般……",
    	"恩…總之你們經歷了很多辛酸血淚啊…朕也為之動容",
    	"是啊…不過讓人心酸的是咱原本是有十個兄弟的，但在當時渡海的過程中，最小的弟弟不幸沉入了海中而不知去向(默默流淚",
    	"喵？這麼一說我好像有在其他地方看過跟你們很像的龜",
    	"朕知道！大哥說的是",
        false,"FK!","對啊就是那隻龜，看來你也不是那麼孤陋寡聞呢","no!",
        "那是~朕可是時刻心懸民間呢~",
        "這…難道真的會是咱們的小弟嗎…我們可愛的弟弟…(流淚",
        "別哭啊喵~再哭下去這池子的水都要滿出來了",
        "但…但是…老夫…老夫的弟弟啊~~(痛哭)牠…牠還那麼小那麼無知的時候…竟然就…(爆哭",
        "怎麼一談到牠弟弟就這麼不冷靜啊…剛剛不是挺老成的嗎…",
        "別勸牠了，我看牠八成是弟控沒錯了",
        "原來這就是弟控嗎…別哭了龜爺，朕去幫你打探打探吧",
        "感謝你們…這樣吧…要是你們成功打探消息回來，池子的魚你們選一隻拿走吧",
        "龜爺你這是為了弟弟出賣老朋友的節奏啊…(汗",
        "那就萬事拜託了",
    	);
    characterArr[1]=new Array(player["I"].normal,player["wild"].normal,player["I"].normal,player["wild"].normal,
    				player["wild"].normal,player["wild"].normal,player["I"].normal,player["wild"].normal,player["I"].normal
    				,player["wild"].normal,player["I"].normal,player["wild"].normal,player["I"].normal,player["wild"].normal,player["I"].normal
    				,player["I"].normal,player["wild"].normal,player["I"].normal,player["wild"].normal,player["I"].normal
    				,player["wild"].normal,player["I"].normal,player["I"].normal,player["wild"].normal,player["I"].normal
    				,player["I"].normal,player["wild"].normal,player["I"].normal,player["wild"].normal,player["wild"].normal
    				,player["I"].normal,player["I"].normal,player["wild"].normal,player["I"].normal,player["wild"].normal
    				,player["wild"].normal,player["I"].normal,player["wild"].normal,player["turtle"].normal,player["I"].normal
    				,player["turtle"].normal,player["I"].normal,player["turtle"].normal,player["I"].normal,player["turtle"].normal
    				,player["turtle"].normal,player["turtle"].normal,player["turtle"].normal,player["I"].normal,player["wild"].normal
    				,player["I"].normal,player["turtle"].normal,player["I"].normal,player["wild"].normal,player["turtle"].normal
    				,player["I"].normal,player["turtle"].normal,player["I"].normal,player["turtle"].normal,player["wild"].normal
    				,player["I"].normal,player["I"].normal,player["wild"].normal,player["wild"].normal,player["wild"].normal//這裡是最後一個選擇結束
                    ,player["I"].normal,player["turtle"].normal,player["I"].normal,player["turtle"].normal,player["I"].normal
                    ,player["wild"].normal,player["I"].normal,player["turtle"].normal,player["wild"].normal,player["turtle"].normal
                    );
	characterposArr[1]=new Array(0,1,0,1,1,1,0,1,0,1,0,1,0,1,1,0,1,0,1,0,1,0,0,1,0,1,1,0,1,0,1,0,1,0,1,1,0,1,1,0,1,0,1,0,0,1,0
					,1,0,1,0,1,0,1,0,1,1,0,1,1,0,0,1,1,1//這裡是最後一個選擇結束
                    ,0,1,0,1,0,1,0,1,1,1);
	continueArr[1]=new Array(true,false,1,true,true,true,true,true,true,true,true,true,true,10005,true,true,true,true,true,true
					,10000,true,true,true,10001,true,true,false,2,true,true,true,true,true,true,true,true,true,true,true,true
					,true,true,false,3,true,true,true,true,true,true,true,true,true,10002,true,true,true,true,true
                    ,false,4,true,true,true//這裡是最後一個選擇結束
                    ,true,true,true,true,true,true,true,true,true,true);
	backgroundArr[1]=new Array("redhouse","redhouse","redhouse","redhouse","redhouse","redhouse","redhouse","redhouse","redhouse"
					,"redhouse","redhouse","redhouse","redhouse","redhouse","redhouse","redhouse","redhouse","mr.chung","mr.chung"
					,"mr.chung","mr.chung","mr.chung","mr.chung","mr.chung","souvenir","souvenir","souvenir","souvenir","souvenir"
					,"souvenir","souvenir","souvenir","souvenir","souvenir","souvenir","fish","fish","fish","fish","fish","fish"
					,"turtlestone","turtlestone","turtlestone","turtlestone","turtlestone","turtlestone","turtlestone","turtlestone"
					,"turtlestone","turtlestone","turtlestone","turtlestone","turtlestone","turtlestone","turtlestone","turtlestone"
					,"turtlestone","turtlestone","turtlestone","turtlestone","turtlestone","turtlestone","turtlestone","turtlestone"
                    ,"turtlestone","turtlestone","turtlestone","turtlestone","turtlestone","turtlestone","turtlestone","turtlestone"
                    ,"turtlestone","turtlestone");

    conversationArr[2]= new Array("終於到了，這裡就是石龜弟弟的所在地嗎?",
        "的確是這裡沒錯，我們進去吧","你…你們是誰(O.O)?",
        "你是不是有一群失散多年的哥哥呀？我們是受你的哥哥們委託來探望你的喵~",
        "騙…騙人…那你說說看我的哥哥們到底有幾個啊？",
        false,"你們根本不認識我的哥哥們，你們這些騙子！","哥哥…我的九個哥哥們…原來他們還記得我…嚶嚶","你們根本不認識我的哥哥們，你們這些騙子！",
        "看來還真的是你呀",
        "是的是我…我就是當年落水的石龜…",
        false,
        "想當年我太貪玩，不小心就掉進了港口裡，那裏好黑好冷，當時的人類也不打算把我撈上來，我就在那裡待上了將近一百年了嗚嗚",//scene=13
        "可憐的孩子…還好你沒有溺死…",
        "好不容易被撈上來後，想說可以和哥哥們團圓了，結果被搬到這間廟來，還被人類遵奉為「白蓮聖母」，說我帶來吉祥之兆",
        "哇~這是要飛黃騰達的前奏啊喵",
        "結果勒~就把我丟在這間廟的後面，我只能孤獨地默默待在這陰暗的角落想著哥哥們嗚嗚嗚",
        "……可憐的孩子",
        "太感人了~~不過你放心吧，你的哥哥們都過得很好，還交了一群魚朋友呢",
        "是啊是啊，為了你牠們連朋友都不要了呢",
        "真的嗎…不愧是我的哥哥們，兩百多年沒見了還是跟以前一樣疼我",
        "你這弟弟還真的挺蠢萌的…講話還自帶顏文字…難怪養出一堆弟控…",
        "恩？",
        ".......",
        "好啦好啦~既然確定了你的安全，我們就趕快回去找龜爺吧",
        "也是，不然不知道要哭成什麼樣子了",
        "等等…你說我的哥哥們哭得很慘嗎？",
        "是啊~他們說到你就哭得唏利嘩啦的，眼睛都快哭腫了",
        "這可不行…這樣吧…我背上的水對治療眼睛有很大的功效，你們裝一些回去給他們敷眼睛吧",
        false,
        "其實當時的人們都用各式各樣的容器去裝，茶壺茶罐都有，裡面的水是有點黃的，當時日本人怕裡面有病毒之類的東西還特別檢查。",
        "好~裝好了~那我們出發吧~",
        "謝謝你們~幫我跟哥哥們問好~");
    characterArr[2]=new Array(player["I"].surprise,player["wild"].say,player["turtle"].sad,player["I"].happy,player["turtle"].sad,
                player["I"].normal,player["turtle"].sad,player["turtle"].sad,player["turtle"].sad,player["wild"].suck,player["turtle"].sad,
                player["turtle"].sad,player["turtle"].sad,player["wild"].say,player["turtle"].angry,player["wild"].say,player["turtle"].sad
                ,player["wild"].say,player["I"].normal,player["wild"].say,player["turtle"].happy,player["wild"].suck,player["turtle"].happy
                ,player["wild"].suck,player["I"].happy,player["wild"].ya,player["turtle"].normal,player["I"].surprise,player["turtle"].happy
                ,player["I"].happy,player["turtle"].happy,player["wild"].normal,player["turtle"].happy);
    characterposArr[2]=new Array(0,1,1,0,1,0,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,0,1,1,0,1,0,1,1,1);
    continueArr[2]=new Array(true,true,true,true,false,5,true,true,true,true,10003,true,true,true,true,true,true,true,true,true,true,
                true,true,true,true,true,true,true,10004,true,true,true,9999);
    backgroundArr[2]=new Array("temple","temple","turtlebrother","turtlebrother","turtlebrother","turtlebrother","turtlebrother"
                ,"turtlebrother","turtlebrother","turtlebrother","turtlebrother","turtlebrother","turtlebrother","turtlebrother"
                ,"turtlebrother","turtlebrother","turtlebrother","turtlebrother","turtlebrother","turtlebrother","turtlebrother"
                ,"turtlebrother","turtlebrother","turtlebrother","turtlebrother","turtlebrother","turtlebrother","turtlebrother"
                ,"turtlebrother","turtlebrother","turtlebrother","turtlebrother","turtlebrother");

    conversationArr[3]= new Array("龜爺~~~",
        "你們終於回來了，怎麼樣怎麼樣？是老夫的弟弟嗎？(淚",
        "哎呀別哭了龜爺，的確是牠，牠很精神呢！還托我們帶了治眼睛的水給你們",
        "是嗎…太好了…老夫此生無憾了…按照約定，池子的魚你們挑一隻走吧…");
    characterArr[3]=new Array(player["I"].surprise,player["turtle"].sad,player["wild"].suck,player["turtle"].happy);
    characterposArr[3]=new Array(0,1,1,1);
    continueArr[3]=new Array(true,true,true,true);
    backgroundArr[3]=new Array("redturtle","redturtle","redturtle","redturtle");
    //changechapter(chapter);


    convArr=conversationArr[chapter];
    charArr=characterArr[chapter];
    charposArr=characterposArr[chapter];
    cntiArr=continueArr[chapter];
    bgArr=backgroundArr[chapter];

    if(cntiArr[scene]==true){
        if((scene+1)<charArr.length){           //以防練習時出錯(超出陣列範圍)
            scene++;
            //character.style.background="url(pic/"+charArr[scene]+".jpg)";
            characterposition();
            conv.innerHTML=convArr[scene];
            plot.style.background="url(pic/"+bgArr[scene]+".jpg)";
            plot.style.backgroundRepeat="no-repeat";
            plot.style.backgroundAttachment="fixed";
            plot.style.backgroundPosition="center";
            plot.style.backgroundSize="cover";
        }
    }else if(cntiArr[scene]==false){
        //會需要抉擇的場景
        if((scene+1)<charArr.length){           //以防練習時出錯(超出陣列範圍)
            scene++;
            characterposition();
            //character.style.background="url(pic/"+charArr[scene]+".jpg)";
            //將對話與切換下個場景的sensor隱藏
            hideConv();
            //接著顯示抉擇選項(此處只有兩種選擇
            //這邊顯示抉擇的選項有點複雜，
            //根據上面的cntiArr陣列，我們的第一個抉擇(其實是陣列的第一個索引，也就是從0開始)是0
            //而對應到了choice陣列，choice陣列的第一個(索引從0開始)抉擇選項是一個陣列
            //因此遇到抉擇時就這樣以此類推。
            select1.innerHTML=choice[parseInt(cntiArr[scene])][0];
            select2.innerHTML=choice[parseInt(cntiArr[scene])][1];
            select3.innerHTML=choice[parseInt(cntiArr[scene])][2];
            showsel(select1);
            showsel(select2);
            showsel(select3);
            //這邊處理使用者點擊選項後的結果
            //使用者選擇的結果只有兩種：
            //1:繼續下一個對話(可能是下一段劇情，或者詢問者給予你的抉擇做感想)
            //2:切換畫面為位置選單(也就是可以到其他地點)
            select1.onclick=function(){
                if(parseInt(cntiArr[scene])==0){
                    scene++;
                    character.style.background="url(pic/"+charArr[scene]+".jpg)";
                    conv.innerHTML=convArr[scene];
                    plot.style.background="url(pic/"+bgArr[scene]+".jpg)";
                    plot.style.backgroundRepeat="no-repeat";
                    plot.style.backgroundAttachment="fixed";
                    plot.style.backgroundPosition="center";
                    plot.style.backgroundSize="cover";
                    hideChoice();
                    show(leave);
                }else if(parseInt(cntiArr[scene])==1){
                	scene++;
                	characterposition();
                    //character.style.background="url(pic/"+charArr[scene]+".jpg)";
                    conv.innerHTML=convArr[scene];
                    plot.style.background="url(pic/"+bgArr[scene]+".jpg)";
                    plot.style.backgroundRepeat="no-repeat";
                    plot.style.backgroundAttachment="fixed";
                    plot.style.backgroundPosition="center";
                    plot.style.backgroundSize="cover";
                    hideChoice();
                    show(backbtn1);
                }else if(parseInt(cntiArr[scene])==2){
                	scene++;
                	characterposition();
                    //character.style.background="url(pic/"+charArr[scene]+".jpg)";
                    conv.innerHTML=convArr[scene];
                    plot.style.background="url(pic/"+bgArr[scene]+".jpg)";
                    plot.style.backgroundRepeat="no-repeat";
                    plot.style.backgroundAttachment="fixed";
                    plot.style.backgroundPosition="center";
                    plot.style.backgroundSize="cover";
                    hideChoice();
                    show(backbtn1);
                }else if(parseInt(cntiArr[scene])==3){
                	scene++;
                	characterposition();
                    //character.style.background="url(pic/"+charArr[scene]+".jpg)";
                    conv.innerHTML=convArr[scene];
                    plot.style.background="url(pic/"+bgArr[scene]+".jpg)";
                    plot.style.backgroundRepeat="no-repeat";
                    plot.style.backgroundAttachment="fixed";
                    plot.style.backgroundPosition="center";
                    plot.style.backgroundSize="cover";
                    hideChoice();
                    show(sensor);
                    fireClick(sensor);
                    fireClick(sensor);
                }else if(parseInt(cntiArr[scene])==4){
                    scene++;
                    characterposition();
                    //character.style.background="url(pic/"+charArr[scene]+".jpg)";
                    conv.innerHTML=convArr[scene];
                    plot.style.background="url(pic/"+bgArr[scene]+".jpg)";
                    plot.style.backgroundRepeat="no-repeat";
                    plot.style.backgroundAttachment="fixed";
                    plot.style.backgroundPosition="center";
                    plot.style.backgroundSize="cover";
                    hideChoice();
                    show(backbtn1);
                }else if(parseInt(cntiArr[scene])==5){
                    scene++;
                    characterposition();
                    //character.style.background="url(pic/"+charArr[scene]+".jpg)";
                    conv.innerHTML=convArr[scene];
                    plot.style.background="url(pic/"+bgArr[scene]+".jpg)";
                    plot.style.backgroundRepeat="no-repeat";
                    plot.style.backgroundAttachment="fixed";
                    plot.style.backgroundPosition="center";
                    plot.style.backgroundSize="cover";
                    hideChoice();
                    show(backbtn1);
                }
            }
            select2.onclick=function(){
                if(parseInt(cntiArr[scene])==0){
                    scene++;
                    characterposition();
                    //character.style.background="url(pic/"+charArr[scene]+".jpg)";
                    conv.innerHTML=convArr[scene];
                    plot.style.background="url(pic/"+bgArr[scene]+".jpg)";
                    plot.style.backgroundRepeat="no-repeat";
                    plot.style.backgroundAttachment="fixed";
                    plot.style.backgroundPosition="center";
                    plot.style.backgroundSize="cover";
                    hideChoice();
                    show(sensor);
                    show(leave);
                    fireClick(sensor);
                }else if(parseInt(cntiArr[scene])==1){
                	scene=scene+1;
                	characterposition();
                    //character.style.background="url(pic/"+charArr[scene]+".jpg)";
                    conv.innerHTML=convArr[scene];
                    plot.style.background="url(pic/"+bgArr[scene]+".jpg)";
                    plot.style.backgroundRepeat="no-repeat";
                    plot.style.backgroundAttachment="fixed";
                    plot.style.backgroundPosition="center";
                    plot.style.backgroundSize="cover";
                    hideChoice();
                    show(sensor);
                    fireClick(sensor);
                    scene++;
                }else if(parseInt(cntiArr[scene])==2){
                	scene++;
                	characterposition();
                    //character.style.background="url(pic/"+charArr[scene]+".jpg)";
                    conv.innerHTML=convArr[scene];
                    plot.style.background="url(pic/"+bgArr[scene]+".jpg)";
                    plot.style.backgroundRepeat="no-repeat";
                    plot.style.backgroundAttachment="fixed";
                    plot.style.backgroundPosition="center";
                    plot.style.backgroundSize="cover";
                    fireClick(sensor);
                    hideChoice();
                    show(backbtn2);
                }else if(parseInt(cntiArr[scene])==3){
                	scene++;
                	characterposition();
                    //character.style.background="url(pic/"+charArr[scene]+".jpg)";
                    conv.innerHTML=convArr[scene];
                    plot.style.background="url(pic/"+bgArr[scene]+".jpg)";
                    plot.style.backgroundRepeat="no-repeat";
                    plot.style.backgroundAttachment="fixed";
                    plot.style.backgroundPosition="center";
                    plot.style.backgroundSize="cover";
                    hideChoice();
                    show(backbtn2);
                }else if(parseInt(cntiArr[scene])==4){
                    scene=scene+1;
                    characterposition();
                    //character.style.background="url(pic/"+charArr[scene]+".jpg)";
                    conv.innerHTML=convArr[scene];
                    plot.style.background="url(pic/"+bgArr[scene]+".jpg)";
                    plot.style.backgroundRepeat="no-repeat";
                    plot.style.backgroundAttachment="fixed";
                    plot.style.backgroundPosition="center";
                    plot.style.backgroundSize="cover";
                    hideChoice();
                    show(sensor);
                    fireClick(sensor);
                    scene++;
                }else if(parseInt(cntiArr[scene])==5){
                    scene=scene+1;
                    characterposition();
                    //character.style.background="url(pic/"+charArr[scene]+".jpg)";
                    conv.innerHTML=convArr[scene];
                    plot.style.background="url(pic/"+bgArr[scene]+".jpg)";
                    plot.style.backgroundRepeat="no-repeat";
                    plot.style.backgroundAttachment="fixed";
                    plot.style.backgroundPosition="center";
                    plot.style.backgroundSize="cover";
                    hideChoice();
                    show(sensor);
                    fireClick(sensor);
                    scene++;
                }
            }
            select3.onclick=function(){
                if(parseInt(cntiArr[scene])==0){
                    scene++;
                    characterposition();
                    //character.style.background="url(pic/"+charArr[scene]+".jpg)";
                    conv.innerHTML=convArr[scene];
                    plot.style.background="url(pic/"+bgArr[scene]+".jpg)";
                    plot.style.backgroundRepeat="no-repeat";
                    plot.style.backgroundAttachment="fixed";
                    plot.style.backgroundPosition="center";
                    plot.style.backgroundSize="cover";
                    hideChoice();
                    show(leave);
                    show(backbtn3);
                }else if(parseInt(cntiArr[scene])==1){
                	scene++;
                	characterposition();
                    //character.style.background="url(pic/"+charArr[scene]+".jpg)";
                    conv.innerHTML=convArr[scene];
                    plot.style.background="url(pic/"+bgArr[scene]+".jpg)";
                    plot.style.backgroundRepeat="no-repeat";
                    plot.style.backgroundAttachment="fixed";
                    plot.style.backgroundPosition="center";
                    plot.style.backgroundSize="cover";
                    hideChoice();
                    fireClick(sensor);//這個function會幫你多點一下>>scene會多+1
                    fireClick(sensor);
                    show(backbtn3);
                }else if(parseInt(cntiArr[scene])==2){
                	scene++;
                	characterposition();
                    //character.style.background="url(pic/"+charArr[scene]+".jpg)";
                    conv.innerHTML=convArr[scene];
                    plot.style.background="url(pic/"+bgArr[scene]+".jpg)";
                    plot.style.backgroundRepeat="no-repeat";
                    plot.style.backgroundAttachment="fixed";
                    plot.style.backgroundPosition="center";
                    plot.style.backgroundSize="cover";
                    hideChoice();
                    show(sensor);
                    fireClick(sensor);
                    fireClick(sensor);
                }else if(parseInt(cntiArr[scene])==3){
                	scene++;
                	characterposition();
                    //character.style.background="url(pic/"+charArr[scene]+".jpg)";
                    conv.innerHTML=convArr[scene];
                    plot.style.background="url(pic/"+bgArr[scene]+".jpg)";
                    plot.style.backgroundRepeat="no-repeat";
                    plot.style.backgroundAttachment="fixed";
                    plot.style.backgroundPosition="center";
                    plot.style.backgroundSize="cover";
                    hideChoice();
                    fireClick(sensor);
                    show(backbtn3);
                }else if(parseInt(cntiArr[scene])==4){
                    scene++;
                    characterposition();
                    //character.style.background="url(pic/"+charArr[scene]+".jpg)";
                    conv.innerHTML=convArr[scene];
                    plot.style.background="url(pic/"+bgArr[scene]+".jpg)";
                    plot.style.backgroundRepeat="no-repeat";
                    plot.style.backgroundAttachment="fixed";
                    plot.style.backgroundPosition="center";
                    plot.style.backgroundSize="cover";
                    hideChoice();
                    fireClick(sensor);//這個function會幫你多點一下>>scene會多+1
                    fireClick(sensor);
                    show(backbtn3);
                }else if(parseInt(cntiArr[scene])==5){
                    scene++;
                    characterposition();
                    //character.style.background="url(pic/"+charArr[scene]+".jpg)";
                    conv.innerHTML=convArr[scene];
                    plot.style.background="url(pic/"+bgArr[scene]+".jpg)";
                    plot.style.backgroundRepeat="no-repeat";
                    plot.style.backgroundAttachment="fixed";
                    plot.style.backgroundPosition="center";
                    plot.style.backgroundSize="cover";
                    hideChoice();
                    show(backbtn3);
                    fireClick(sensor);
                    fireClick(sensor);
                }
            }
            plot.style.background="url(pic/"+bgArr[scene]+".jpg)";
            plot.style.backgroundRepeat="no-repeat";
            plot.style.backgroundAttachment="fixed";
            plot.style.backgroundPosition="center";
            plot.style.backgroundSize="cover";
        }
    }else if(cntiArr[scene]==9999){
       show(leave);
    }else if(cntiArr[scene]==10000){
    	scene++;
    	hideConv();
       	show(history1);
       	history1.onclick=function(){
       		hide(history1);
       		fireClick(sensor);
       		show(sensor);
       	}
    }else if(cntiArr[scene]==10001){
    	scene++;
    	hideConv();
       	show(potatochip);
       	potatochip.onclick=function(){
       		hide(potatochip);
       		fireClick(sensor);
       		show(sensor);
       	}
    }else if(cntiArr[scene]==10002){
    	scene++;
    	hideConv();
       	show(history2);
       	history2.onclick=function(){
       		hide(history2);
       		fireClick(sensor);
       		show(sensor);
       	}
    }else if(cntiArr[scene]==10003){
        scene++;
        hideConv();
        show(history3);
        history3.onclick=function(){
            hide(history3);
            fireClick(sensor);
            show(sensor);
        }
    }else if(cntiArr[scene]==10004){
        scene++;
        hideConv();
        show(bottle);
        bottle.onclick=function(){
            hide(bottle);
            fireClick(sensor);
            show(sensor);
        }
    }else if(cntiArr[scene]==10005){
        scene++;
        hideConv();
        show(idcard);
        idcard.onclick=function(){
            hide(idcard);
            fireClick(sensor);
            show(sensor);
        }
    }
}
/******************這個部分是給不同的劇情畫面的切換******************/
/*hideArr(initArr);
scene=2;
fireClick(sensor);
*/
function getById(id){
    return document.getElementById(id);
}
function hideArr(arr){
    for(var i in arr){
        getById(arr[i]).style.display="none";
    }
}
function showArr(arr){
    for(var i in arr){
        getById(arr[i]).style.display="block";
    }
}
function hide(elem){
    elem.style.display="none";
}
function show(elem){
    elem.style.display="block";
}
function gameshow(elem){
    elem.style.display="initial";
}
function hideConv(){
    conv.innerHTML="......";
    hide(sensor);
}
function hideChoice(){
    hide(select1);
    hide(select2);
    hide(select3);
}
function showsel(elem){
    elem.style.display="list-item";
}

function characterposition(){
	if(charposArr[scene]==0){
		character.style.background="url(pic/"+charArr[scene]+".jpg)";
		character.style.left="25px";
		character.style.top="100px";
		character.style.width="350px";
		character.style.height="451px";
	}else{
		character.style.background="url(pic/"+charArr[scene]+".jpg)";
		character.style.left="580px";
		character.style.top="100px";
		character.style.width="350px";
		character.style.height="451px";
	}
}

function changechapter(chapter){
	leave.onclick=function(){
		chapter++;
		return chapter;
	}
}

//觸發點擊事件的方法
function fireClick(node){
    // 不同瀏覽器有不同的寫法
    if ( document.createEvent ) {
        var evt = document.createEvent('MouseEvents');
        evt.initEvent('click', true, false);
        node.dispatchEvent(evt);    
    } else if( document.createEventObject ) {
        node.fireEvent('onclick') ; 
    } else if (typeof node.onclick == 'function' ) {
        node.onclick(); 
    }
}

//Get user name and id from FB
//FB initial
function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);

  if (response.status === 'connected') {
    testAPI();
  } else {
    document.getElementById('status').innerHTML = 'Please log ' +
      'into this app.';
  }
}
function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}
window.fbAsyncInit = function() {
  FB.init({
    appId      : '777531655774612',
    cookie     : true,  // enable cookies to allow the server to access 
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.11' // use graph api version 2.8
  });
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
};
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
function testAPI() {
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me', function(response) {
    console.log('Successful login for: ' + response.name);
    console.log(JSON.stringify(response));
    fb_id = response.id;
//  $.get({
//      url: "./login_data",
//      method:"GET",
//      type:"get",
//      data:{
//        id: response.id,
//        name:response.name,
//      },
//      success:function(data){}
//    });
    btnlogin.onclick=function(){ 
        roleplayer=getById("txName").value;
        hideArr(initArr);
        showArr(plotArr);
        hide(leave);
        hide(idform);
        hide(txName);
        hide(btnlogin);
        hide(btnreset);
        hide(umm); 
      event.preventDefault();
      $.ajax({
        method:"get",
        url:"./login_data",
        data:{
        id: response.id,
        name:response.name,
         //   id:$("response").val(),
       //     NAME:$("#fbnamee").val(),
          NICKNAME:$("#txName").val(),
        },
        success:function(data){
          $("#login_check").text(data)
        }
      });
    }
  })
}

//game start
var phaserwidth = window.innerWidth;
var phaserheight = window.innerHeight;
var phaserhei = 480;
var phaserwid = phaserhei*phaserwidth/phaserheight;


var game = new Phaser.Game(phaserwid,phaserhei , Phaser.AUTO, 'game');
var jumpTimer = 0
var trigger = {left:0,right:0,up:0,space:0};
var flag= {p1:0,p2:0,p3:0};
var next = {
    preload: function () {
    },
    create: function () {
        $('#game').css({ display: 'none' })
        hideArr(initArr);
        hideArr(switchArr);
        showArr(plotArr);
        hide(leave);
        hide(switchpic);
    },
    update: function () {
        
    },
    render: function () {

    }
};
game.state.add('next', next);
function dowm() {
    switch (this.key) {
        case "l":
            trigger.left =1;
            break;
        case "r":
            trigger.right = 1;
            break;
        case "up":
            trigger.up = 1;
            break;
        case "space":
            trigger.space = 1
            break;    
        default:
            break;
    }
}
function up() {
    switch (this.key) {
        case "l":
            trigger.left = 0
            break;
        case "r":
            trigger.right = 0
            break;
        case "up":
            trigger.up = 0
            break;
        case "space":
            trigger.space = 0
            break;
        default:
            break;
    }       
} 
var first =  {
  
  preload:()=>{
    game.load.tilemap('map', 'assets/json/map4.json', null,Phaser.Tilemap.TILED_JSON)
    game.load.image('road2', 'assets/img/road2.png')
    game.load.image('red2', 'assets/img/red2.png')
    game.load.image('cas1', 'assets/img/cas1.png')
    game.load.image('cloud', 'assets/img/cloud.jpg')
    game.load.image('leftb', 'assets/img/leftb.png')
    game.load.image('rightb', 'assets/img/rightb.png')
    game.load.image('jumpb', 'assets/img/jumpb.png')
    game.load.image('enterb', 'assets/img/enterb.png')
    game.load.image('mark', 'assets/img/mark.png')
    game.load.image('vend', 'assets/img/vend.png')
    game.load.image('house', 'assets/img/house.png')
    game.load.spritesheet('player','assets/img/cat3.png', 316, 276)
  },
  create:()=> {
      //物理系統設定
    game.physics.startSystem(Phaser.Physics.ARCADE)
    game.physics.arcade.gravity.y = 380
    game.time.desiredFps = 40
    /*
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.refresh();

    canvas_width = window.innerWidth * window.devicePixelRatio;
    canvas_height = window.innerHeight * window.devicePixelRatio;
    aspect_ratio = canvas_width / canvas_height;
    if (aspect_ratio > 1) scale_ratio = canvas_height / canvas_height_max;
    else scale_ratio = canvas_width / canvas_width_max;*/
    //視窗設定
    game.scale.scaleMode  = Phaser.ScaleManager.SHOW_ALL
    game.scale.pageAlignVertically = true
    game.scale.pageAlignHorizontally = true
    Phaser.Canvas.setImageRenderingCrisp(game.canvas)
    //地圖載入
    map = game.add.tilemap('map')
    map.addTilesetImage('red2','red2')
    map.addTilesetImage('road2','road2')
    map.addTilesetImage('cas1','cas1')
    map.addTilesetImage('cloud','cloud')
    map.createLayer('lay 3')
    layer = map.createLayer('lay 2')
    map.createLayer('lay 1')
    map.setCollisionBetween(64,70,true,layer)
    //物件
    vend = game.add.sprite(1500,(phaserhei-214),'vend')
    vend.scale.set(0.06)
    house = game.add.sprite(2200,(phaserhei-308),'house')
    house.scale.set(0.4)
    inter_group = game.add.physicsGroup()
    inter_group.add(house)
    inter_group.add(vend)
    house.body.allowGravity = false
    vend.body.allowGravity = false
    house.body.immovable = true
    vend.body.immovable = true
    //玩家
    player = game.add.sprite(1500,100, 'player')
    game.physics.enable(player,Phaser.Physics.ARCADE)
    player.scale.set(0.25)
    player.facing = 'right'
    //驚嘆號
    mark = game.add.sprite(1500,100,'mark')
    mark.scale.set(0.33)
    mark.visible = false
    game.physics.enable(mark,Phaser.Physics.ARCADE)
    mark.body.allowGravity = false
    mark.body.immovable = true
    
    
    
    player.animations.add('left', [10,9,8,7], 18 , true)
    player.animations.add('right', [1,2,3,4], 18, true)
    player.animations.add('rightup', [16,17,18], 3,false)
    player.animations.add('leftup', [25,24,23], 3,false)
    player.animations.add('rightupst', [14,15], 2,false)
    player.animations.add('leftupst', [27,26], 2,false)
    player.animations.add('rightdown', [19,20], 2,false)
    player.animations.add('leftdown', [22,21], 2,false)/*
    player.animations.add('jumpdownleft',,2,false)
    player.animations.add('jumpdownright',,2,false)*/
    
    game.world.setBounds(0,0, 3200, 480)
    player.body.collideWorldBounds = true
    game.camera.follow(player)
    
    
    cursors = game.input.keyboard.createCursorKeys()
    this.cursors = game.input.keyboard.createCursorKeys(); 
    this.custom = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
    //
    this.button_L = game.add.button(0, (phaserhei-75), 'leftb');
    this.button_L.scale.set(0.5);
    this.button_L.onInputDown.add( dowm,{key:"l"},this);
    this.button_L.onInputUp.add(up, { key: "l" }, this);  
    this.button_L.fixedToCamera = true;
    //
    this.button_R = game.add.button(68, (phaserhei-75), 'rightb');
    this.button_R.scale.set(0.5);
    this.button_R.onInputDown.add(dowm, { key: "r" }, this);
    this.button_R.onInputUp.add(up, { key: "r" }, this);
    this.button_R.fixedToCamera = true;      
    //
    this.button_UP = game.add.button((phaserwid-136), (phaserhei-75), 'jumpb');
    this.button_UP.scale.set(0.5);
    this.button_UP.onInputDown.add(dowm, { key: "up" }, this);
    this.button_UP.onInputUp.add(up, { key: "up" }, this);
    this.button_UP.fixedToCamera = true; 
    //
    this.button_SPACE = game.add.button((phaserwid-68), (phaserhei-75), 'enterb');
    this.button_SPACE.scale.set(0.5);
    this.button_SPACE.onInputDown.add(dowm, { key: "space" }, this);
    this.button_SPACE.onInputUp.add(up, { key: "space" }, this); 
    this.button_SPACE.fixedToCamera = true;   
   },

  update:()=>{
    //this.custom.isDown
    game.physics.arcade.collide(this.player, this.layer);
    
    //移動驚嘆號
    mark.visible = false
    game.physics.arcade.overlap(this.player, this.inter_group,function(){
        mark.body.x = player.body.x+35
        mark.body.y = player.body.y-50
        mark.visible = true
    });
    //方向控制
    if ((cursors.left.isDown || trigger.left === 1)&& player.body.onFloor()) {
         this.player.body.velocity.x = -200
        this.player.play('left')
        if (this.player.facing !== 'left')
            this.player.facing = 'left'
    }

    else if ((cursors.right.isDown || trigger.right === 1)&& player.body.onFloor()) {   
        this.player.body.velocity.x = 200
        this.player.play('right')
        if (this.player.facing !== 'right') 
            this.player.facing = 'right'
    }
    else if ((cursors.up.isDown || trigger.up === 1)&& player.body.onFloor()&& game.time.now > jumpTimer ) {    
        if (this.player.facing === 'right')  {
           this.player.play('rightup')          
           this.player.body.velocity.x = 200
           this.player.body.velocity.y += -200
           jumpTimer = game.time.now + 750
        }
        else if (this.player.facing === 'left'){
           this.player.play('leftup')
           this.player.body.velocity.x = -200
           this.player.body.velocity.y += -200
           jumpTimer = game.time.now + 750
        }
    }
    else {
        if(this.player.body.onFloor()){
            this.player.body.velocity.x = 0
            if (this.player.facing === 'left') player.frame = 9
            if (this.player.facing === 'right') player.frame = 0
            //this.player.animations.stop()
        }
    }
    //進入關卡
    if (this.player.body.x > 474 && this.player.body.x < 612) {//
        //console.log(trigger.space)
        if (this.custom.isDown || trigger.space == 1) {
              this.flag.p1 = 1
              game.state.start('next')
          }
    } 
  },
  
   render:()=>{
       //game.debug.spriteInfo(player,32,32);
   },
      //no
};
game.state.add('first', first);
game.state.add('next', next);
game.state.start('first');
//game end