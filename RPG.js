var roleplayer=getById("txName").value;         //若使用者沒修改，就是預設的名稱：張天豪
var initArr=new Array("lbName","txName","btnStart","scene_init","cat","topic","aboutus");
var plotArr=new Array("character","convers","sensor","scene_plot");
var scene=0;                                    //現在是哪個場景

//這個陣列是用來對應每個角色的不同個性的圖檔，就不用記檔名了
var player=[];
player["I"]={normal: "I",happy: "IHappy",sad: "ISad",confused: "IConfuse", urgent: "IUrgent", end: "IEnd"};
player["Jen"]={normal: "Jen",happy: "JenHappy",sad: "JenSad", end: "JenEnd"};
player["her"]={normal: "her",happy: "herHappy",sad: "herSad", end: "herEnd"};

//這個陣列儲存每個場景的人物是哪個圖檔(統一jpg檔所以只要存檔名不用附檔名)
var charArr=new Array(player["I"].confused,player["Jen"].normal,player["I"].normal,player["Jen"].normal,player["I"].normal,player["Jen"].normal,player["I"].normal,player["Jen"].normal,player["I"].normal,player["I"].normal,player["Jen"].normal,player["Jen"].normal);

//角色圖片位置更改
var charposArr =new Array(0,1,0,1,0,1,0,1,0,0,1,1);

//這個陣列儲存每個場景是否可以按下一頁(換到下個對話或動作),若是數字則跳到抉擇陣列的部分
var cntiArr=new Array(true,true,true,true,true,true,true,true,false,0,true,true);

//這個陣列儲存每個場景的背景
var bgArr=new Array("house","house","house","house","house","house","house","house","house","house","house","house");

//這個陣列是儲存抉擇的部分
var choice=[];
choice[0]=new Array("走吧！","離家出走這樣不好吧...");

//這個陣列儲存每個場景人物的對話
var convArr=[];

//簡寫各個元件
var character=getById("character"), plot=getById("scene_plot"), conv=getById("convers"), sensor=getById("sensor"), select1=getById("select1"), select2=getById("select2");

//一開始將其他場景隱藏
hideArr(plotArr);

//一開始將抉擇隱藏
hideChoice();

/*******************************初始畫面(輸入主角按名並開始)******************************/
getById("btnStart").onclick=function(){
    roleplayer=getById("txName").value;         //假如使用者修改過名字，這個值就不會是預設的"永馨"
    //接著將場景切換到一開始的劇情(可按跳過!)
    //場景是由背景圖、人物框、對話框組成
    hideArr(initArr);       //先關閉按下開始的畫面
    showArr(plotArr);
    hide(leave);
}
/*************************************這邊處理劇情部分***********************************/
sensor.onclick=function(){
    //這個陣列比較特別，因為我們的roleplayer會隨著使用者輸入後修改，因此要放在這邊設定
    //若原本的部分是抉擇，就將對話統一改成false，讓陣列與陣列對齊
    convArr=new Array("喵~星期三下午好無聊啊~鏟屎官又不知道去哪裡鬼混了，真是該罰~朕每天管理朝政既勞心又勞力，也不多給我吃幾個罐罐……",
        "野貓："+roleplayer+"，喵哈哈哈哈~",
        roleplayer+"：誰！？",
        "野貓：窗外窗外~~你這傢伙真是笑死我了喵~",
        roleplayer+"：大膽刁民竟如此嘲笑朕",
        "野貓：哈哈哈！「大膽刁民」哈哈哈，你這傢伙中二病吧你",
        roleplayer+"：不要把朕跟那些阿宅相並論，鏟屎官說過朕就是至高無上的皇帝",
        "野貓：哈哈哈他說什麼你都信?就是受不了你們這些家貓，一個個嬌生慣養又都是中二病末期，來來來！敢不敢跟哥出去長長眼界阿，哥帶你去吃吃到飽歐",
        roleplayer+"：吃…吃到飽！？仔細想想朕的確是應該巡視巡視自己的土地...好！就任命你帶路吧！我倒要看看市井小民們平常的生活有多精彩",
        false,"野貓：好好好~跟著哥包準你有糖吃~","野貓：走啦！跟著貓哥幹，肯定難波萬！");
    //對話改在這裡

    if(cntiArr[scene]){
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
    }else{
        //會需要抉擇的場景
        if((scene+1)<charArr.length){           //以防練習時出錯(超出陣列範圍)
            scene++;
            character.style.background="url(pic/"+charArr[scene]+".jpg)";
            //將對話與切換下個場景的sensor隱藏
            hideConv();
            //接著顯示抉擇選項(此處只有兩種選擇
            //這邊顯示抉擇的選項有點複雜，
            //根據上面的cntiArr陣列，我們的第一個抉擇(其實是陣列的第一個索引，也就是從0開始)是0
            //而對應到了choice陣列，choice陣列的第一個(索引從0開始)抉擇選項是一個陣列
            //而這個陣列的第一個選項是"嗯!"、第二個選項是"我有事......"
            //因此遇到抉擇時就這樣以此類推。
            select1.innerHTML=choice[parseInt(cntiArr[scene])][0];
            select2.innerHTML=choice[parseInt(cntiArr[scene])][1];
            show(select1);
            show(select2);
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
                }
            }
            select2.onclick=function(){
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
                    show(sensor);
                    fireClick(sensor);
                }
            }
            plot.style.background="url(pic/"+bgArr[scene]+".jpg)";
            plot.style.backgroundRepeat="no-repeat";
            plot.style.backgroundAttachment="fixed";
            plot.style.backgroundPosition="center";
            plot.style.backgroundSize="cover";
        }
    }
}
/******************這個部分是給你測試不同的劇情畫面的切換******************/
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
function hideConv(){
    conv.innerHTML="......";
    hide(sensor);
}
function hideChoice(){
    hide(select1);
    hide(select2);
}

function characterposition(){
	if(charposArr[scene]==0){
		character.style.background="url(pic/"+charArr[scene]+".jpg)";
		character.style.left="20px";
		character.style.top="220px";
		character.style.width="123px";
		character.style.height="110px";
	}else{
		character.style.background="url(pic/"+charArr[scene]+".jpg)";
		character.style.left="600px";
		character.style.top="220px";
		character.style.width="123px";
		character.style.height="110px";
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