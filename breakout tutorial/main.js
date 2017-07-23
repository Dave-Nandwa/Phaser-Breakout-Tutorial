
//score and highscore globals.

var score = 0;
var highscore, scoreDisplay, highScoreText;

var Game = {

	preload: function() {
		 game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	     game.scale.pageAlignHorizontally = true;
	     game.scale.pageAlignVertically = true;
         game.load.image('ball', 'assets/coin.png');
         game.load.image('paddle', 'assets/paddle.png');
         game.load.image('brick', 'assets/brick.png');

		},

	create: function() {
		game.stage.backgroundColor = "#eee";

		game.physics.startSystem(Phaser.Physics.ARCADE);

		game.physics.arcade.checkCollision.down = false;

		//ball components
		this.ball = game.add.sprite(game.world.width*0.5, game.world.height-35, 'ball');

		game.physics.enable(this.ball, Phaser.Physics.ARCADE);

		this.ball.body.velocity.set(150,-150);

		this.ball.body.collideWorldBounds = true;

		this.ball.body.bounce.set(1);

		this.ball.anchor.set(0.5)
		
		this.ball.checkWorldBounds = true;

		this.ball.events.onOutOfBounds.add(this.restartGame, this);
  

		//paddle components
		this.paddle = game.add.sprite(game.world.width*0.5, game.world.height-10, 'paddle');
		
		this.paddle.anchor.set(0.5,1);
		
		game.physics.enable(this.paddle, Phaser.Physics.ARCADE);
		
		this.paddle.body.collideWorldBounds = true;
		
		this.paddle.body.immovable = true;

		//Score and Highscore variables.
		var score = 0;

		game.add.text(30, 20, "SCORE:", { font: "bold 12px sans-serif",
		fill: "#46c0f9",
		align: "center" });

		scoreDisplay = game.add.text(80, 19, score,{ font: "bold 14px sans-serif",
		fill: "#46c0f9",
		align: "center" });

		highScoreText = this.game.add.text(game.width-100, 20,
		'High Score: ' + highscore,
		{ font: "bold 10px Lato", fill: "#46c0f9", align: "center" });

		//paddle
    	cursors = game.input.keyboard.createCursorKeys();

    	
    	this.addBricks();

	},

	//technical part
	addBricks: function() {
	
	 brickInfo = {
        width: 50,
        height: 15,
        count: {
            row: 7,
            col: 3
        },
        offset: {
            top: 55,
            left: 60
        },
        padding: 10
    }
    this.bricks = game.add.group();
    for(c=0; c<brickInfo.count.col; c++) {
        for(r=0; r<brickInfo.count.row; r++) {
            this.brickX = (r*(brickInfo.width+brickInfo.padding))+brickInfo.offset.left;
            this.brickY = (c*(brickInfo.height+brickInfo.padding))+brickInfo.offset.top;
            this.brick = game.add.sprite(this.brickX, this.brickY, 'brick');
            game.physics.enable(this.brick, Phaser.Physics.ARCADE);
            this.brick.body.immovable = true;
            this.brick.anchor.set(0.5);
            this.bricks.add(this.brick);
        }
    }
},

	killBrick: function(ball, brick) {
		brick.kill();
		//INCREMENT SCORE
		score+=1;
		scoreDisplay.text = score;
		
	},

	update: function() {

		game.physics.arcade.collide(this.ball, this.paddle);

		game.physics.arcade.collide(this.ball, this.bricks, this.killBrick);

		if (cursors.left.isDown)
		{
			this.paddle.body.velocity.x = -250
		}
		else if (cursors.right.isDown)

		{
			this.paddle.body.velocity.x = 250
        }

        //Highscore CODE
        highScoreText.text = 'High Score: ' + localStorage.getItem("flappyhighscore"); {
        if (score > localStorage.getItem("flappyhighscore")) { 
            localStorage.setItem("flappyhighscore", score);
        }
    }

        

	},


	restartGame: function() {
		
		game.state.start('game');
	} 


};


var game = new Phaser.Game(480, 320, Phaser.AUTO, null);


game.state.add('game', Game); 



// Start the state to actually start the game
game.state.start('game');




