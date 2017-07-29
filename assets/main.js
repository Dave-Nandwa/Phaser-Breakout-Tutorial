var scoreText, scoreDisplay, highScoreText, highscore;

var score = 0;


// Create our 'main' state that will contain the game
var mainState = {
    preload: function() { 
    // Load the bird sprite
    game.load.image('bird', 'assets/bird2.png');

    //load the pipe sprite

    game.load.image('pipe', 'assets/pipe.png'); 

    //load the sound
    game.load.audio('jump', 'assets/beep.wav');
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;

},

create: function() { 
    
    // background color
    game.stage.backgroundColor = '#65ccd8';

    // game physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // bird position x=100 and y=245
    this.bird = game.add.sprite(100, 245, 'bird');

    //empty group of pipes
    this.pipes = game.add.group();

    //continuously display pipes

    this.timer = game.time.events.loop(1625, this.addPipeRows, this)

    //clean up bird rotation
    this.bird.anchor.setTo(-0.2, 0.5);

    //score

   score = 0;
   scoreText = game.add.text(20,20,"score:",
        {font: "20px Lato", fill: "#ffffff" });
    scoreDisplay = game.add.text(80,20,score.toString(),
        {font: "22px Arial", fill: "#ffffff" });

    highScoreText = this.game.add.text(game.width-200, 20,
     'High Score: ' + highscore,
      { font: "bold 20px Lato", fill: "#fff", align: "center" });

    game.add.text((game.width/2)-155,10,"DESKTOP: USE SPACEBAR TO JUMP",
        {font: "15px Arial", fill: "#ffffff" });
        
     game.add.text((game.width/2)-155,game.height-45,"MOBILE: TAP THE SCREEN",
        {font: "15px Arial", fill: "#ffffff" });

    //sound
    this.jumpSound = game.add.audio('jump');






    // Add physics to the bird
    // i.e movements, gravity, collisions...
    game.physics.arcade.enable(this.bird);

    // weight of bird
    this.bird.body.gravity.y = 1000;  

    // spacebar event handler
    var spaceKey = game.input.keyboard.addKey(
                    Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this); 

    



},

//pipes function to display them

addOnePipe: function (x,y) {
    //create a pipe at the x and y position
    var pipe = game.add.sprite(x,y,'pipe');

    //add the pipe to the group
    this.pipes.add(pipe);

    //physics of pipe enabling
    game.physics.arcade.enable(pipe);

    //velocity of pipe o make it move towards the bird

    pipe.body.velocity.x = -200

    //delete pipe when it is out of the screen window

    pipe.checkWorldBounds = true;
    pipe.outOfBoundsKill = true;


},


addPipeRows: function () {
    //random number between 1-5
    //that will be the gap

    var gap = Math.floor(Math.random()*8) +1;

    score+=1;
    scoreDisplay.text = score;


    //add the pipes
    //gap included
    for (var i=0; i<16; i++)
        if (i != gap && i != gap + 1)
            this.addOnePipe(500, i * 70 + 10);
    
},

hitPipe: function() {
    //if the bird has already hit one, do nothing
    //because the bird would already be falling oof the screen
    if (this.bird.alive == false)
        return;
    //otherwise the bird is not alive
    this.bird.alive = false;

    //stop generating pipes
    game.time.events.remove(this.timer);

    //iterate through all the pipes and stop them

    this.pipes.forEach(function(p) {
        p.body.velocity.x = 0;

    }, this);


},


update: function() {
    // keep the bird in the window
    // otherwise Call the 'restartGame' function

    if (this.bird.angle < 20)
        this.bird.angle += 1;

    game.physics.arcade.overlap(
        this.bird, this.pipes, this.hitPipe, null, this);

    if (this.bird.y < -3 || this.bird.y > game.height)
        this.restartGame();
    
     highScoreText.text = 'High Score: ' + localStorage.getItem("flappyhighscore"); {
        if (score> localStorage.getItem("flappyhighscore")) { 
            localStorage.setItem("flappyhighscore", score);
        }
    }

},



// bird jump 
jump: function() {
     if (this.bird.alive ==false)
        return;
    // Add a vertical velocity to the bird
    this.bird.body.velocity.y = -350;
    var animation = game.add.tween(this.bird);

    //change the angle of the bird to -20 degrees every 100 milliseconds
    animation.to({angle: -20}, 100);

    //start animation
    animation.start();

    //this.jumpSound.play();

    //shorter way of writing it

    /* game.add.tween(this.bird).to({angle: -20}, 100).start(); */

},

// Restart the game
restartGame: function() {
    // Start the 'main' state, which restarts the game
    game.state.start('main');
},
};

// Initialize Phaser, and create a 400px by 490px game
var game = new Phaser.Game(window.innerWidth * window.devicePixelRatio,
 (window.innerHeight-20) * window.devicePixelRatio); //800 and 490

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState); 

// Start the state to actually start the game
game.state.start('main');