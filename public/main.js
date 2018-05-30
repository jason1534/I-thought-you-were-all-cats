var game = new Phaser.Game(1280, 480, Phaser.AUTO, 'game');
var jumpTimer = 0
var trigger = {left:0,right:0,up:0,space:0};
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
    game.load.tilemap('map', 'assets/json/map2.json', null,Phaser.Tilemap.TILED_JSON)
	game.load.image('road1', 'assets/img/road1.png')
	game.load.image('red1', 'assets/img/red1.png')
	game.load.image('cas1', 'assets/img/cas1.png')
	game.load.image('cloud', 'assets/img/cloud.jpg')
    game.load.image('leftb', 'assets/img/leftb.png')
	game.load.image('rightb', 'assets/img/rightb.png')
	game.load.image('jumpb', 'assets/img/jumpb.png')
	game.load.image('enterb', 'assets/img/enterb.png')
    game.load.spritesheet('player','assets/img/cat3.png', 316, 276)
  },
  create:()=> {
	game.physics.startSystem(Phaser.Physics.ARCADE)
	game.physics.arcade.gravity.y = 350
	game.time.desiredFps = 30
	
    map = game.add.tilemap('map')
	map.addTilesetImage('red1','red1')
	map.addTilesetImage('road1','road1')
    map.addTilesetImage('cas1','cas1')
	map.addTilesetImage('cloud','cloud')
	map.createLayer('lay 3')
    layer = map.createLayer('lay 2')
	map.setCollision([1,2,3,4,5,6,7,8],true,layer)
    map.createLayer('lay 1')
	
	player = game.add.sprite(0,100, 'player')
	player.scale.set(0.25)
    player.facing = 'right'
	
    player.animations.add('left', [10,9,8,7], 18 , true)
    player.animations.add('right', [1,2,3,4], 18, true)
	player.animations.add('rightup', [16,17,18], 3,false)
	player.animations.add('leftup', [25,24,23], 3,false)
	player.animations.add('rightupst', [14,15], 2,false)
	player.animations.add('leftupst', [27,26], 2,false)
	player.animations.add('rightdown', [19,20], 2,false)
	player.animations.add('leftdown', [22,21], 2,false)
	
	game.physics.enable(player,Phaser.Physics.ARCADE)

	game.world.setBounds(0,0, 1280, 480)
	player.body.collideWorldBounds = true
	game.camera.follow(player)
	cursors = game.input.keyboard.createCursorKeys()
	this.cursors = game.input.keyboard.createCursorKeys(); 
	
    this.custom = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	
	//
	this.button_L = game.add.button(0, 415, 'leftb');
	this.button_L.scale.set(0.5);
    this.button_L.onInputDown.add( dowm,{key:"l"},this);
    this.button_L.onInputUp.add(up, { key: "l" }, this);  
    this.button_L.fixedToCamera = true;
    //
    this.button_R = game.add.button(68, 415, 'rightb');
	this.button_R.scale.set(0.5);
    this.button_R.onInputDown.add(dowm, { key: "r" }, this);
    this.button_R.onInputUp.add(up, { key: "r" }, this);
    this.button_R.fixedToCamera = true;      
    //
    this.button_UP = game.add.button(824, 415, 'jumpb');
	this.button_UP.scale.set(0.5);
    this.button_UP.onInputDown.add(dowm, { key: "up" }, this);
    this.button_UP.onInputUp.add(up, { key: "up" }, this);
    this.button_UP.fixedToCamera = true; 
	//
	this.button_SPACE = game.add.button(892, 415, 'enterb');
	this.button_SPACE.scale.set(0.5);
    this.button_SPACE.onInputDown.add(dowm, { key: "space" }, this);
    this.button_SPACE.onInputUp.add(up, { key: "space" }, this); 
    this.button_SPACE.fixedToCamera = true;   
   },

  update:()=>{
	//this.custom.isDown
	this.game.physics.arcade.collide(this.player, this.layer)
    if ((cursors.left.isDown || trigger.left === 1)&& player.body.onFloor()) {
	  if (this.player.x >= 0){
         this.player.body.velocity.x = -180
        this.player.play('left')
        if (this.player.facing !== 'left')
		    this.player.facing = 'left'
	  }
    }

    else if ((cursors.right.isDown || trigger.right === 1)&& player.body.onFloor()) {
      if(this.player.x <= 1200){		
        this.player.body.velocity.x = 180
        this.player.play('right')
        if (this.player.facing !== 'right') 
            this.player.facing = 'right'
	  }
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
    if (this.player.body.x > 600) {//
        //console.log(trigger.space)
        if (this.custom.isDown || trigger.space == 1) {
              game.state.start('next');
          }
    } 
  },
  
   render:()=>{
   },
      //no
};
game.state.add('first', first);
game.state.add('next', next);
game.state.start('first');
