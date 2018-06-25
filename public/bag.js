var state = 0;//0 in game/ 1 in bag /2 in item
const items_num = 16;
const history_num = 5;
var item_select = "";
var item_exist = [1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0];
var history_exist = [0,0,0,0,0];
var item_img_source = {
    item1: "assets/item/item1.png",
    item2: "assets/item/item2.png",    
    item3: "assets/item/item3.png",   
    item4: "assets/item/item4.png",    
    item5: "assets/item/item5.png",    
    item6: "assets/item/item6.png",    
    item7: "assets/item/item7.png",
    item8: "assets/item/item8.png",
    item9: "assets/item/item9.png",
    item10: "assets/item/item10.png",
    item11: "assets/item/item11.png",
    item12: "assets/item/item12.png",
    history1: "assets/item/h1.jpg",
    history2: "assets/item/h2.jpg",
    history3: "assets/item/h3.jpg",
    history4: "assets/item/h4.jpg",        
    history5: "assets/item/h5.jpg",        
};

var item_detail_source = {
    item1: "未知符文<br/><br/>上面有著我讀不懂的字，一開始就在背包裡的東西。",
    item2: "貓版學生證<br/><br/>野貓兄給的學生證，好像有特殊用途~",
    item3: "成功洋芋片<br/><br/>傳說吃就會成功的洋芋片。",
    item4: "水中的硬幣<br/><br/>從池子裡撈出來的硬幣，有點濕濕的。",
    item5: "抽中的瓶子<br/><br/>任務道具，打滿水後交給龜爺。",
    item6: "裝水的瓶子<br/><br/>任務道具，已經打滿水了，交給龜爺吧!",
    item7: "銘謝惠顧<br/><br/>我記得好像是個成語，人類怎麼會把這種東西放在盒子裡讓人抽阿，真是不理解~",
    item8: "紅色棒球帽<br/><br/>好潮的帽子，朕喜歡!",
    item9: "有殘缺的充電線<br/><br/>好像會漏電，怎會有這麼危險的東西喵~",
    item10: "充電線<br/><br/>看起來新新的充電線，不過這要怎麼用呢?",
    item11: "XX兵鉛筆盒<br/><br/>上面的圖案好像在哪裡看過，應該是我的錯覺吧!",
    item12: "行動充電器<br/><br/>給你滿滿的能源!",
    history1:"荷蘭人站起來啦!<br/><br/>西元1983年11月，在台大森林系的荷蘭籍客座教授史特靈渥夫(Stelling Werf)的要求下，與當時的台大前總務長焦國模教授一同前往安平古堡以及赤崁樓參觀，在參觀赤崁樓的途中看到了鄭成功受降塑像，其中荷蘭人的塑像是呈現跪姿，這是當初台南市的赤崁國際獅子會為了紀念鄭成功在赤崁樓統治台灣所捐贈的，但史特靈看到此一景象感到非常不滿，認為這是對荷蘭人的侮辱，而焦教授在此趟行程回歸後將此事轉達中央，當時中華民國深怕會影響台荷關係，加上當時與荷尚有兩艘潛艇的交易未完成，因此行政院長雖孫運璿下令拆除鄭成功受降圖，經考證過後改以荷蘭人為站姿的「鄭成功議和圖」。",
    history2: "贔屭<br/><br/>贔屭，龍生九子之一，最初是大禹治水時期所收服的怪物，時常揹著三山五嶽到處爬，最後協助大禹治水完之後，怕他繼續到處作亂，於是在他身上放了超重的石碑紀載著大禹治水的事蹟，讓贔屭無法隨處走動。赤崁樓的贔屭是乾隆為了嘉許福康安平定林爽文之亂而刻製的，總共十座，但其中一座在運送過程中掉入南廠海埔內，一開始是以砂岩仿造一座複製品放置在嘉義，直到1911年才被打撈起來，現今供奉在南廠保安宮內，被尊為「白蓮聖母」。",
    history3: "圓環<br/><br/>1911年(明治四十四年)，總督府公布「台南市街區計畫及其地域決定」，開始為台南市進行城市規劃，其中一項道路規劃即為設置圓環，目的在於利用圓環系統的放射狀道路通往市區內重要節點與設施，讓物資運輸以及資訊傳達等更有機動性，尤其以台南火車站前的圓環最為重要，連接大正綠園(當時的行政中心，也就是今天的民生綠園)，再放射到台南市區重要節點，軍營、台南運河、知事官邸等。",
    history4: "五條港<br/><br/>五條港在明鄭晚期因台江內海的淤積，在原本赤崁樓的港口移往更西邊而後來逐漸形成所謂的五條港，但這五條港的名稱會隨著台江內海的淤積而移動與變化。。五條港除了是商業興盛外，民間信仰與文化也是相當蓬勃，由於出海風險大，為了祈求平安在當時五條港區的廟宇相當多且與保佑海上安全有關，例如水仙宮祭拜的是被尊為水仙尊王的夏禹。「做十六歲」的習俗也是伴隨五條港發展的習俗，當時港務繁多需要人力，但未成年只能領半薪，為了證明已經孩子成年會請來親朋好友來慶祝成年且可以領全薪。隨著五條港逐漸淤積，商業的盛況不再，但歷史痕跡卻仍然留在五條港區，廟宇、石碑、巷弄等都是人們曾在這裡生活過的痕跡，只是以另一種形式存在著。位於台南市西區的神農街，舊名「北勢街」，為一條東西走向的古街，東起水仙宮，經海安路、康樂街，至金華路藥王廟前，是清代台南「五條港」中心著名的交通要道，但隨著清末五條港航運衰退，五條港區的古街與港道大部分已被淹沒，仍保留許多傳統街屋，是個拍照的好地方。", 
    history5: "關於石龜弟弟白蓮聖母<br/><br/>在西元1911年投入海中的贔屭被打撈起來後運送到保安宮，被當時的人們相信這是吉祥之兆，紛紛前來參拜與祈福，甚至認為贔屭背上碑槽中的水可以治病、助孕，每天來保安宮參拜的人絡繹不絕，台灣日日新報也記載當時的盛況，把信眾形容成迷信過頭的愚夫愚婦，而總督府為了阻止這樣的「亂象」，命其將贔屭搬至保安宮內部",
};


function tag(tag_num) {
    if (tag_num == 0) {
        $("#tag").hide();
    }
    else if (tag_num == 1) {
        $("#tag").show();
        $("#tag").css("background-image", "url(assets/bag/menu.png)");
    }
    else if (tag_num == 2) {
        $("#tag").show();
        $("#tag").css("background-image", "url(assets/bag/text.png)");
    }
    else if (tag_num == 3) {
        $("#tag").show();
        $("#tag").css("background-image", "url(assets/bag/bag.png)");
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
        for (index = 1; index < items_num + 1; index++) {
            var select = "#item_img" + index;
            if (!item_exist[index - 1]) {
                $(select).css("display", "none");
            }
        }
        for (index = 1; index < history_num + 1; index++) {
            var select = "#history_img" + index;
            if (!history_exist[index - 1]) {
                $(select).css("display", "none");               
            }
        }

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
                //console.log(item_img_source[item_select]);             
                $(".item_img_in").css("background-image", "url("+item_img_source[item_select]+")");
                $("#item_detail").html(item_detail_source[item_select]);
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
                $(".item_img_in").css("background-image", "url(" + item_img_source[item_select] + ")");
                $("#item_detail").html(item_detail_source[item_select]);
            }
        }
    });

});
/* var type = {
    L: { x: 0, y: 415, img: 'leftb' },
}


for (let name in type) {
    this[`button_${name}`] = game.add.button(type[name].x, )
} */
