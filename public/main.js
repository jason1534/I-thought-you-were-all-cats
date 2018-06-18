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

