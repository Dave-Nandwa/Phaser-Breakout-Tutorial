var platforms, groundX, ground, ledge, cube;
// Create our 'main' state that will contain the game
var mainState = {

    preload: function() { 
    // Load the cube sprite
    game.load.image('cube', 'assets/bird2.png');
    //load the pipe sprite
    game.load.image('pipe', 'assets/pipe.png'); 
    game.load.image('ground', 'assets/platform.png'); 
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

    //since thy will be more than one platform we initialize them as a group
    platforms = game.add.group();

    //enable physics (collision) for any of the platforms
    platforms.enableBody = true;

    groundX = -400;

     for (var i = 0; i < 4; i++) {

        groundX += 400
         //create grounds
        var ground = platforms.create(groundX, game.world.height - 64, 'ground');

    //make sure the ground fits the width of the window
        ground.scale.setTo(2,2);

    //make the platform static
        ground.body.immovable = true;
    }


    scoreText = game.add.text((game.width*.5)-200,20,"Press UP ^ arrow to Play Sound.",
        {font: "25px Lato", fill: "#ffffff" });
 

    // cube position x=100 and y=245
    cube = game.add.sprite(100, 245, 'cube');

    //clean up cube rotation
    cube.anchor.setTo(-0.2, 0.5);

    // Add physics to the cube
    // i.e movements, gravity, collisions...
    game.physics.arcade.enable(cube);

    // weight of cube
    cube.body.gravity.y = 1000; 

    //keep him in the window
    cube.body.collideWorldBounds = true; 

    //sound
    this.jumpSound = game.add.audio('jump');

    // spacebar event handler
    var spaceKey = game.input.keyboard.addKey(
                    Phaser.Keyboard.SPACEBAR);

    spaceKey.onDown.add(this.jump, this);


    //controls
    cursors = game.input.keyboard.createCursorKeys(); 

    



},

update: function() {
    // keep the cube in the window
    // otherwise Call the 'restartGame' function
    //  Collide the cube and the stars with the platforms
    var hitPlatform = game.physics.arcade.collide(cube, platforms);
    cube.body.velocity.x = 2
    if (cursors.left.isDown)
    {
        cube.body.velocity.x = -150


    }

    else if (cursors.right.isDown)
    {
        cube.body.velocity.x = 150

        
    }

    else {
        cube.animations.stop();

        cube.frame = 4;
    }


    if (cursors.up.isDown && cube.body.touching.down && hitPlatform)
    {
        cube.body.velocity.y = -300
        this.jumpSound.play()
    }

},



// cube jump 
jump: function() {
	if (cube.alive == false)
        return;
    // Add a vertical velocity to the cube
    cube.body.velocity.y = -350;
    

    this.jumpSound.play();


},


};

// Initialize Phaser, and create a 400px by 490px game
var game = new Phaser.Game(window.innerWidth * window.devicePixelRatio,
 (window.innerHeight-20) * window.devicePixelRatio); //800 and 490

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState); 

// Start the state to actually start the game
game.state.start('main');