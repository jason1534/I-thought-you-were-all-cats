var phaserwidth = window.innerWidth;
var phaserheight = window.innerHeight;
var phaserhei = 480;
var phaserwid = phaserhei*phaserwidth/phaserheight;
var jumpTimer = 0
var trigger = {left:0,right:0,up:0,space:0};
var flag= {p1:0,p2:1,p3:1,p4:1,p5:1,p6:1,p7:1};
var coin_position = [4000,700,1500,1800,2300,3000,3100,3500,3800,4800]
var coinnumber = 0;
var cat_position = 1500;

var game = new Phaser.Game(phaserwid,phaserhei , Phaser.AUTO, 'game');

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
var next = {
    preload: function () {
    },
    create: function () {
    	show(bag);
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
var littlegame = {
     preload:()=>{
    game.load.tilemap('map', 'assets/json/map5.json', null,Phaser.Tilemap.TILED_JSON)
	game.load.image('road2', 'assets/img/road2.png')
	game.load.image('cas1', 'assets/img/cas1.png')
    game.load.image('leftb', 'assets/img/leftb.png')
	game.load.image('rightb', 'assets/img/rightb.png')
	game.load.image('jumpb', 'assets/img/jumpb.png')
	game.load.image('enterb', 'assets/img/enterb.png')
	game.load.image('mark', 'assets/img/mark.png')
	game.load.image('coin','assets/img/gold.png')
	game.load.image('sewer1','assets/img/sewer1.png')
	game.load.image('sewer2','assets/img/sewer2.png')
    game.load.spritesheet('cat_player','assets/img/cat3.png', 316, 276)
  },
  create:()=> {
	  //物理系統設定
	game.physics.startSystem(Phaser.Physics.ARCADE)
	game.physics.arcade.gravity.y = 380
	game.time.desiredFps = 30
	//視窗設定
	game.scale.scaleMode  = Phaser.ScaleManager.SHOW_ALL
	game.scale.pageAlignVertically = true
	game.scale.pageAlignHorizontally = true
    Phaser.Canvas.setImageRenderingCrisp(game.canvas)
	//地圖載入
    map = game.add.tilemap('map')
	map.addTilesetImage('road2','road2')
    map.addTilesetImage('cas1','cas1')
	map.addTilesetImage('sewer2','sewer2')
	layer = map.createLayer('lay 2')
    map.createLayer('lay 1')
	map.setCollisionBetween(63,71,true,layer)
	//物件
	coins = game.add.physicsGroup()
	for(var i = 0;i < 10;i++) {
		coin = coins.create(coin_position[i],(phaserhei-128),'coin')
		coin.scale.set(0.6)
		coin.body.allowGravity = false
		//coin.body.immovable = true
	}
	coinText = game.add.text(20,50,'硬幣: 0', {fontSize: '24px', fill: '#ffff00'});
	coinText.fixedToCamera = true
	//玩家
	cat_player = game.add.sprite(100,100, 'cat_player')
	game.physics.enable(cat_player,Phaser.Physics.ARCADE)
	cat_player.scale.set(0.25)
    cat_player.facing = 'right'
	//玩家動畫設定
    cat_player.animations.add('left', [10,9,8,7], 18 , true)
    cat_player.animations.add('right', [1,2,3,4], 18, true)
	cat_player.animations.add('rightup', [16,17,18], 3,false)
	cat_player.animations.add('leftup', [25,24,23], 3,false)
	cat_player.animations.add('rightupst', [14,15], 2,false)
	cat_player.animations.add('leftupst', [27,26], 2,false)
	cat_player.animations.add('rightdown', [19,20], 2,false)
	cat_player.animations.add('leftdown', [22,21], 2,false)
	//cat_player.animations.add('jumpdownleft',,2,false)
	//cat_player.animations.add('jumpdownright',,2,false)
	//世界設定
	game.world.setBounds(0,0,2560 , 480)
	cat_player.body.collideWorldBounds = true
	game.camera.follow(cat_player)
	
	//設置操縱按鈕
	cursors = game.input.keyboard.createCursorKeys()
	this.cursors = game.input.keyboard.createCursorKeys(); 
    this.custom = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	
	//左
	this.button_L = game.add.button(0, (phaserhei-75), 'leftb');
	this.button_L.scale.set(0.5);
    this.button_L.onInputDown.add( dowm,{key:"l"},this);
    this.button_L.onInputUp.add(up, { key: "l" }, this);  
    this.button_L.fixedToCamera = true;
    //右
    this.button_R = game.add.button(68, (phaserhei-75), 'rightb');
	this.button_R.scale.set(0.5);
    this.button_R.onInputDown.add(dowm, { key: "r" }, this);
    this.button_R.onInputUp.add(up, { key: "r" }, this);
    this.button_R.fixedToCamera = true;      
    //上
    this.button_UP = game.add.button((phaserwid-136), (phaserhei-75), 'jumpb');
	this.button_UP.scale.set(0.5);
    this.button_UP.onInputDown.add(dowm, { key: "up" }, this);
    this.button_UP.onInputUp.add(up, { key: "up" }, this);
    this.button_UP.fixedToCamera = true; 
	//觸發事件
	this.button_SPACE = game.add.button((phaserwid-68), (phaserhei-75), 'enterb');
	this.button_SPACE.scale.set(0.5);
    this.button_SPACE.onInputDown.add(dowm, { key: "space" }, this);
    this.button_SPACE.onInputUp.add(up, { key: "space" }, this); 
    this.button_SPACE.fixedToCamera = true;   
   },

  update:()=>{
	//this.custom.isDown
	game.physics.arcade.collide(this.cat_player, this.layer);
	game.physics.arcade.overlap(cat_player, coins,function(cat_player,coin){
		coin.kill()
		coinnumber ++
		coinText.setText("硬幣: " + coinnumber)
	},null,this);
	if (custom.isDown || trigger.space == 1) {
				game.state.start('first')
			}
	//方向控制
    if ((cursors.left.isDown || trigger.left === 1)&& cat_player.body.onFloor()) {
         this.cat_player.body.velocity.x = -200
        this.cat_player.play('left')
        if (this.cat_player.facing !== 'left')
		    this.cat_player.facing = 'left'
    }

    else if ((cursors.right.isDown || trigger.right === 1)&& cat_player.body.onFloor()) {	
        this.cat_player.body.velocity.x = 200
        this.cat_player.play('right')
        if (this.cat_player.facing !== 'right') 
            this.cat_player.facing = 'right'
	}
	else if ((cursors.up.isDown || trigger.up === 1)&& cat_player.body.onFloor()&& game.time.now > jumpTimer ) {	
	    if (this.cat_player.facing === 'right')  {
           this.cat_player.play('rightup')			
           this.cat_player.body.velocity.x = 200
		   this.cat_player.body.velocity.y += -200
		   jumpTimer = game.time.now + 750
		}
		else if (this.cat_player.facing === 'left'){
		   this.cat_player.play('leftup')
		   this.cat_player.body.velocity.x = -200
		   this.cat_player.body.velocity.y += -200
		   jumpTimer = game.time.now + 750
		}
	}
	else {
	    if(this.cat_player.body.onFloor()){
			this.cat_player.body.velocity.x = 0
			if (this.cat_player.facing === 'left') cat_player.frame = 9
            if (this.cat_player.facing === 'right') cat_player.frame = 0
			//this.cat_player.animations.stop()
        }
    }
  },
  
   render:()=>{
	   //game.debug.spriteInfo(cat_player,32,32);
   },
      //no
};
game.state.add('littlegame', littlegame);

var first =  {
  
  preload:()=>{
    game.load.tilemap('map', 'assets/json/map4.json', null,Phaser.Tilemap.TILED_JSON)
	game.load.image('road2', 'assets/img/road2.png')
	game.load.image('road3', 'assets/img/road3.png')
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
	game.load.image('coin','assets/img/gold.png')
	game.load.image('baoan','assets/img/baoan.png')
	game.load.image('sewer1','assets/img/sewer1.png')
	game.load.image('cat_text','assets/img/text.png')
	game.load.image('traffic','assets/img/traffic.png')
    game.load.spritesheet('cat_player','assets/img/cat3.png', 316, 276)
  },
  create:()=> {
	  //物理系統設定
	game.physics.startSystem(Phaser.Physics.ARCADE)
	game.physics.arcade.gravity.y = 380
	game.time.desiredFps = 30

	//視窗設定
	game.scale.scaleMode  = Phaser.ScaleManager.SHOW_ALL
	game.scale.pageAlignVertically = true
	game.scale.pageAlignHorizontally = true
    Phaser.Canvas.setImageRenderingCrisp(game.canvas)
	//地圖載入
    map = game.add.tilemap('map')
	map.addTilesetImage('red2','red2')
	map.addTilesetImage('road2','road2')
	map.addTilesetImage('road3','road3')
    map.addTilesetImage('cas1','cas1')
	map.addTilesetImage('cloud','cloud')
	map.createLayer('lay 3')
    layer = map.createLayer('lay 2')
	map.createLayer('lay 1')
	map.setCollisionBetween(64,75,true,layer)
	map.setCollisionBetween(100,110,true,layer)
	//物件加入
	house = game.add.sprite(2000,(phaserhei-308),'house')
	house.scale.set(0.4)
	vend = game.add.sprite(2400,(phaserhei-214),'vend')
	vend.scale.set(0.06)
	baoan = game.add.sprite(3400,(phaserhei-443),'baoan')
	baoan.scale.set(0.65)
	sewer1 = game.add.sprite(2233,(phaserhei-130),'sewer1')
	sewer1.scale.set(0.44)
	traffic = game.add.sprite(1600,(phaserhei-334),'traffic')
	traffic.scale.set(0.15)
	cat_text = game.add.sprite(0,(phaserhei-300),'cat_text')
	cat_text.scale.set(0.08)
	cat_text.visible = false
	
	//物理啟動
	game.physics.enable(house,Phaser.Physics.ARCADE)
	game.physics.enable(vend,Phaser.Physics.ARCADE)
	game.physics.enable(baoan,Phaser.Physics.ARCADE)
	game.physics.enable(sewer1,Phaser.Physics.ARCADE)
	game.physics.enable(traffic,Phaser.Physics.ARCADE)
	game.physics.enable(cat_text,Phaser.Physics.ARCADE)
	//將物件固定
	baoan.body.allowGravity = false
	vend.body.allowGravity = false
	sewer1.body.allowGravity = false
	house.body.allowGravity = false
	traffic.body.allowGravity = false
	cat_text.body.allowGravity = false
	
	traffic.body.immovable = true
	house.body.immovable = true
	sewer1.body.immovable = true
	baoan.body.immovable = true
	vend.body.immovable = true
	cat_text.body.immovable = true

	coins = game.add.physicsGroup()
	for(var i = 0;i < 10;i++) {
		coin = coins.create(coin_position[i],(phaserhei-128),'coin')
		coin.scale.set(0.6)
		coin.body.allowGravity = false
		//coin.body.immovable = true
	}
	coinText = game.add.text(20,50,'硬幣: '+coinnumber, {fontSize: '24px', fill: '#ffff00'});
	coinText.fixedToCamera = true
	//玩家位置紀錄
	story_position= {p1:500,p2:1700,p3:2380,p4:3800};
	//玩家
	cat_player = game.add.sprite(cat_position,300, 'cat_player')
	game.physics.enable(cat_player,Phaser.Physics.ARCADE)
	cat_player.scale.set(0.3)
    cat_player.facing = 'right'
	//驚嘆號
	mark = game.add.sprite(cat_position,300,'mark')
	mark.scale.set(0.33)
	mark.visible = false
	game.physics.enable(mark,Phaser.Physics.ARCADE)
	mark.body.allowGravity = false
	mark.body.immovable = true
	//玩家動畫設定
    cat_player.animations.add('left', [10,9,8,7], 18 , true)
    cat_player.animations.add('right', [1,2,3,4], 18, true)
	cat_player.animations.add('rightup', [16,17,18], 3,false)
	cat_player.animations.add('leftup', [25,24,23], 3,false)
	cat_player.animations.add('rightupst', [14,15], 2,false)
	cat_player.animations.add('leftupst', [27,26], 2,false)
	cat_player.animations.add('rightdown', [19,20], 2,false)
	cat_player.animations.add('leftdown', [22,21], 2,false)/*
	cat_player.animations.add('jumpdownleft',,2,false)
	cat_player.animations.add('jumpdownright',,2,false)*/
	//世界設定
	game.world.setBounds(0,0, 4800, 480)
	cat_player.body.collideWorldBounds = true
	game.camera.follow(cat_player)
	
	//設置操縱按鈕
	cursors = game.input.keyboard.createCursorKeys()
	this.cursors = game.input.keyboard.createCursorKeys(); 
    this.custom = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	
	//左
	this.button_L = game.add.button(0, (phaserhei-75), 'leftb');
	this.button_L.scale.set(0.5);
    this.button_L.onInputDown.add( dowm,{key:"l"},this);
    this.button_L.onInputUp.add(up, { key: "l" }, this);  
    this.button_L.fixedToCamera = true;
    //右
    this.button_R = game.add.button(68, (phaserhei-75), 'rightb');
	this.button_R.scale.set(0.5);
    this.button_R.onInputDown.add(dowm, { key: "r" }, this);
    this.button_R.onInputUp.add(up, { key: "r" }, this);
    this.button_R.fixedToCamera = true;      
    //上
    this.button_UP = game.add.button((phaserwid-136), (phaserhei-75), 'jumpb');
	this.button_UP.scale.set(0.5);
    this.button_UP.onInputDown.add(dowm, { key: "up" }, this);
    this.button_UP.onInputUp.add(up, { key: "up" }, this);
    this.button_UP.fixedToCamera = true; 
	//觸發事件
	this.button_SPACE = game.add.button((phaserwid-68), (phaserhei-75), 'enterb');
	this.button_SPACE.scale.set(0.5);
    this.button_SPACE.onInputDown.add(dowm, { key: "space" }, this);
    this.button_SPACE.onInputUp.add(up, { key: "space" }, this); 
    this.button_SPACE.fixedToCamera = true;   
   },

  update:()=>{
	//this.custom.isDown
	game.physics.arcade.collide(this.cat_player, this.layer);
	
	//驚嘆號
	mark.visible = false
	mark.body.x = cat_player.body.x + 35
	mark.body.y = cat_player.body.y - 50
	cat_text.body.x = cat_player.body.x
	cat_text.body.y = cat_player.body.y - 80
	//進入劇情
    if (this.cat_player.body.x > 310 && this.cat_player.body.x < 660) {
		if(flag.p1 != 1 || flag.p5 != 1){
			mark.body.x = cat_player.body.x + 35
			mark.body.y = cat_player.body.y - 50
			mark.visible = true
			if (custom.isDown || trigger.space == 1) {
				if(flag.p1 === 0 ){
					flag.p1 = 1
					flag.p2 = 0
				}
				else
					flag.p5 = 1
				cat_position = cat_player.body.x
				game.state.start('next')
			}
		}
    }
	game.physics.arcade.overlap(this.cat_player, this.traffic,function(){
		if(flag.p2 != 1 ){
			mark.body.x = cat_player.body.x + 35
			mark.body.y = cat_player.body.y - 50
			mark.visible = true
			if (custom.isDown || trigger.space == 1) {
				cat_text.body.x = cat_player.body.x
				cat_text.body.y = cat_player.body.y - 80
				flag.p2 = 1
				flag.p3 = 0
				cat_text.visible = true
				game.time.events.add(Phaser.Timer.SECOND * 3, function(){
					cat_text.visible = false
				}, this)
			}
		}
    });
	game.physics.arcade.overlap(this.cat_player, this.house,function(){
		if(flag.p3 != 1){
			mark.body.x = cat_player.body.x + 35
			mark.body.y = cat_player.body.y - 50
			mark.visible = true
			if (custom.isDown || trigger.space == 1) {
				flag.p3 = 1
				flag.p4 = 0
				flag.p6 = 0
				cat_position = cat_player.body.x
				game.state.start('next')
			}
		}
	});
	game.physics.arcade.overlap(this.cat_player, this.baoan,function(){
		if(flag.p4 != 1){
			mark.body.x = cat_player.body.x + 35
			mark.body.y = cat_player.body.y - 50
			mark.visible = true
			if (custom.isDown || trigger.space == 1) {
				flag.p4 = 1
				flag.p5 = 0
				cat_position = cat_player.body.x
				game.state.start('next')
			}
		}
	});
	game.physics.arcade.overlap(this.cat_player, this.vend,function(){
		if(flag.p6 != 1 && coinnumber > 2){
			mark.body.x = cat_player.body.x + 35
			mark.body.y = cat_player.body.y - 50
			mark.visible = true
			if (custom.isDown || trigger.space == 1) {
				cat_position = cat_player.body.x
				coinnumber -= 3
				coinText.setText("硬幣: " + coinnumber)
				/*if (mstate == 0) {
					$("#vendingmachine_contain").show();
					$("#vendingmachine").show();
					mstate = 1;
				}*/
			}
		}
	});
	game.physics.arcade.overlap(this.cat_player, this.sewer1,function(){
		if(flag.p7 != 1){
			mark.body.x = cat_player.body.x + 35
			mark.body.y = cat_player.body.y - 50
			mark.visible = true
			if (custom.isDown || trigger.space == 1) {
				flag.p7 = 1
				cat_position = cat_player.body.x
				game.state.start('littlegame')
			}
		}
	});
	//取得硬幣
	game.physics.arcade.overlap(cat_player, coins,function(cat_player,coin){
		coin.kill()
		coinnumber ++
		coinText.setText("硬幣: " + coinnumber)
	},null,this);
	//方向控制
    if ((cursors.left.isDown || trigger.left === 1)&& cat_player.body.onFloor()) {
         this.cat_player.body.velocity.x = -200
        this.cat_player.play('left')
        if (this.cat_player.facing !== 'left')
		    this.cat_player.facing = 'left'
    }

    else if ((cursors.right.isDown || trigger.right === 1)&& cat_player.body.onFloor()) {	
        this.cat_player.body.velocity.x = 200
        this.cat_player.play('right')
        if (this.cat_player.facing !== 'right') 
            this.cat_player.facing = 'right'
	}
	else if ((cursors.up.isDown || trigger.up === 1)&& cat_player.body.onFloor()&& game.time.now > jumpTimer ) {	
	    if (this.cat_player.facing === 'right')  {
           this.cat_player.play('rightup')			
           this.cat_player.body.velocity.x = 200
		   this.cat_player.body.velocity.y += -200
		   jumpTimer = game.time.now + 750
		}
		else if (this.cat_player.facing === 'left'){
		   this.cat_player.play('leftup')
		   this.cat_player.body.velocity.x = -200
		   this.cat_player.body.velocity.y += -200
		   jumpTimer = game.time.now + 750
		}
	}
	else {
	    if(this.cat_player.body.onFloor()){
			this.cat_player.body.velocity.x = 0
			if (this.cat_player.facing === 'left') cat_player.frame = 9
            if (this.cat_player.facing === 'right') cat_player.frame = 0
			//this.cat_player.animations.stop()
        }
    }
  },
  
   render:()=>{
	   //game.debug.spriteInfo(cat_text,32,32);
	  // game.debug.spriteInfo(mark,32,200);
   },
};
game.state.add('first', first);
game.state.start('first');

