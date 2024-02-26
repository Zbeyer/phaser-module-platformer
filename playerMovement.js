class PlayerMovement
{
	constructor(player)
	{
		if (!PlayerMovement.instance)
		{
			this.speed = 64 * 8;
			this.jumpStrength = 64 * 7;
			PlayerMovement.instance = this;
		}
		return PlayerMovement.instance;
	}
	movement ()
	{
		const cursors = this.cursors;
		const input = this.input;
		if (this.player.body.onFloor())
		{
			this.player.jumps = 0;
		}
		
		// let liftSpeed = Math.abs(this.player.velocity.y);

		const isDoubleJumpAvailable = this.player.jumps < 2;

		const shouldMoveLeft = cursors.left.isDown || input.keyboard.addKey('A').isDown;
		const shouldMoveRight = cursors.right.isDown || input.keyboard.addKey('D').isDown;
		const shouldDecelerate = !shouldMoveLeft && !shouldMoveRight;
		const shouldJump =  (cursors.up.isDown && (this.player.body.onFloor() || isDoubleJumpAvailable)
			|| (input.keyboard.addKey('W').isDown && (this.player.body.onFloor() || isDoubleJumpAvailable)
			|| (cursors.space.isDown && (this.player.body.onFloor() || isDoubleJumpAvailable))));
		// this.player.setVelocityX(0);
		if (shouldMoveLeft) {
			this.moveLeft();
		}
		if (shouldMoveRight) {
			this.moveRight();
		}
		if (shouldDecelerate) {
			this.player.setVelocityX(0);
		}
		if (shouldJump) {
			let now = (new Date()).getTime();
			if (now - this.player.lastJump < 320) {
				return;
			}
			this.moveUp();

			this.player.lastJump = now;
			this.player.jumps++;
		}
		let isMoving = shouldMoveLeft || shouldMoveRight;
		if (!isMoving)
		{
			// console.log('idle');
			if(this.player.idle) this.player.idle();
		}

		this.player.previousX = this.player.x;
		this.player.previousY = this.player.y;
	}
	moveLeft ()
	{
		this.player.setVelocityX(-1 * this.speed);
		if (this.player.onLeft) this.player.onLeft();
	}
	moveRight ()
	{
		this.player.setVelocityX(this.speed);
		if (this.player.onRight) this.player.onRight();
	}
	moveUp ()
	{
		this.player.setVelocityY(-1 * this.jumpStrength);
		let now = (new Date()).getTime();
		this.player.lastJump = now;
	}
}