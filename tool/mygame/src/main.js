import kaboom from "kaboom"

kaboom({
	width: 1200,
	height: 800,
	letterbox: "true"
})

// load sprites that will be used
loadSprite("bean", "sprites/bean.png")
loadSprite("bad", "sprites/bad.png")
loadSprite("coin", "sprites/coin.png")
loadSprite("wall", "sprites/wall.png")


//scenes
const scenes = {
	// main menu
	menu: () => {
		setBackground(0,0,0),
		add([
			text("Press Enter to Start"),
			pos(50,40),
		])
		// next scene
		onKeyPress("enter", () => {
			go("controls")
		})
	},



	//controls
	controls: () => {
		//controls text
		const control = add([])
		control.add([text("Controls"), pos(50,40)])
		control.add([text("Up arrow = Up"), pos(80,100)])
		control.add([text("Down arrow= Down"), pos(80,160)])
		control.add([text("Left arrow = Left"), pos(80,220)])
		control.add([text("Right arrow = Right"), pos(80,280)])
		control.add([text("Collect the plastics and avoid the red dudes"), pos(80,500),color(255,255,0)])
		control.add([text("Press 'enter' to continue"), pos(80,height()-48)])
		onKeyPress("enter", () => {
			go("1")
		})
	},





	1: () => {

		//background
		setBackground(0,0,200)

		//level
		const level = addLevel([
			"iiiiiiiiiiiiiiiiiiiiiiii",
			"i @i        ci c       i",
			"i  i         i         i",
			"i  i   iiiiiiiiiiiiii  i",
			"i  i   i  c         i  i",
			"i  i          b     i  i",
			"i                      i",
			"i             i        i",
			"i  i          i        i",
			"i  iiiiii  iiii b      i",
			"i            i         i",
			"i            i     i   i",
			"i  iiiiiiii  iii   i   i",
			"i ci           i   i   i",
			"i  i    c      i c i c i",
			"iiiiiiiiiiiiiiiiiiiiiiii",
		], {
			tileWidth: 50,
			tileHeight: 50,
			tiles: {
				"x": () => [
					sprite("bean"),
					area(),
					body({isStatic: true}),
				],
				"i": () => [
					sprite("wall"),
					area(),
					body({isStatic: true}),
					anchor("center"),
					scale(2),
				],
				"b": () => [
					sprite("bad"),
					area(),
					body(),
					scale(2),
					anchor("center"),
					patrol(),
					"bad",
				],
				"c": () => [
					sprite("coin"),
					area(),
					body(),
					anchor("center"),
					"plastic",
				],
				"@": () => [
					sprite("bean"),
					area(),
					body(),
					anchor("center"),
					"player",
				]
			}
		})

		const player = level.get("player")[0]
		const enemy = level.get("bad")[0]

		//score and win condition
		let score = 0;
		add([
			rect(75,75),
			pos(0,0),
			color(0,0,0)
		])
		let coinCount = get("plastic", {recursive: true}).length
		const scoreLabel = add([
			text(score),
			pos(24, 24),
		])

		//enemy code

		function patrol(speed = 60, dir = 1) {
			return {
				id: "patrol",
				require: [ "pos", "area" ],
				add() {
					this.on("collide", (obj, col) => {
						if (col.isLeft() || col.isRight()) {
							dir = -dir
						}
					})
				},
				update() {
					this.move(speed * dir, 0)
				},
			}
		}


		//player interactions
		player.onCollide("plastic", (coin) => {
			destroy(coin)
			score++;
			scoreLabel.text = score;
			if(score == 7){
				go("2")
			}
		})
		player.onCollide("bad", () => {
			destroy(player)
			go("gameover")
		})

		//controls
		onKeyDown("down", () => {
			player.move(0,200)
		}),
		onKeyDown("up", () => {
			player.move(0,-200)
		}),
		onKeyDown("left", () => {
			player.move(-200,0)
		}),
		onKeyDown("right", () => {
			player.move(200,0)
		})
		onKeyPress("7",() => {
			go("3")
		})
		onKeyPress("8",() => {
			go("2")
		})
	},





	2: () => {
		//background
		setBackground(0,100,200)

		//level
		const level = addLevel([
			"iiiiiiiiiiiiiiiiiiiiiiii",
			"i         i         c  i",
			"i        ci            i",
			"ii   iiiiii        iiiii",
			"i                      i",
			"i            b         i",
			"iiiii         iiiiii   i",
			"i      b      i        i",
			"i             i        i",
			"i   i         i        i",
			"i   i   iiiiiiiiii   iii",
			"i   i   i  c  i        i",
			"i   i   i     i        i",
			"i   i   b     i    @   i",
			"i c i         i        i",
			"iiiiiiiiiiiiiiiiiiiiiiii",
		], {
			tileWidth: 50,
			tileHeight: 50,
			tiles: {
				"x": () => [
					sprite("bean"),
					area(),
					body({isStatic: true}),
				],
				"i": () => [
					sprite("wall"),
					area(),
					body({isStatic: true}),
					anchor("center"),
					scale(2),
				],
				"b": () => [
					sprite("bad"),
					area(),
					body(),
					scale(2),
					anchor("center"),
					patrol(),
					"bad",
				],
				"c": () => [
					sprite("coin"),
					area(),
					body(),
					anchor("center"),
					"plastic",
				],
				"@": () => [
					sprite("bean"),
					area(),
					body(),
					anchor("center"),
					"player",
				]
			}
		})
		const player = level.get("player")[0]
		const enemy = level.get("bad")[0]

		//score and win condition
		let score = 0;
		add([
			rect(75,75),
			pos(0,0),
			color(0,0,0)
		])
		let coinCount = get("plastic", {recursive: true}).length
		const scoreLabel = add([
			text(score),
			pos(24, 24),
		])

		//enemy code

		function patrol(speed = 60, dir = 1) {
			return {
				id: "patrol",
				require: [ "pos", "area" ],
				add() {
					this.on("collide", (obj, col) => {
						if (col.isLeft() || col.isRight()) {
							dir = -dir
						}
					})
				},
				update() {
					this.move(speed * dir, 0)
				},
			}
		}


		//player interactions
		player.onCollide("plastic", (coin) => {
			destroy(coin)
			score++;
			scoreLabel.text = score;
			if(score == 4){
				go("3")
			}
		})
		player.onCollide("bad", () => {
			destroy(player)
			go("gameover")
		})

		//controls
		onKeyDown("down", () => {
			player.move(0,200)
		}),
		onKeyDown("up", () => {
			player.move(0,-200)
		}),
		onKeyDown("left", () => {
			player.move(-200,0)
		}),
		onKeyDown("right", () => {
			player.move(200,0)
		})
		onKeyPress("7",() => {
			go("3")
		})
		onKeyPress("8",() => {
			go("1")
		})


	},





	3: () => {
		//background
		setBackground(0,100,200)

		//level
		const level = addLevel([
			"iiiiiiiiiiiiiiiiiiiiiiii",
			"i          i        ic i",
			"i                      i",
			"i   b i       i        i",
			"i     iiiiiiiixiii   iii",
			"i     i         i      i",
			"i  c  i    @    i      i",
			"iiiiiii         i   b  i",
			"i  c  iiii   iiii      i",
			"i    bi                i",
			"i     i                i",
			"iiii  iiiiiiiiiiiii    i",
			"i     i       i        i",
			"i                 b    i",
			"i        i         i   i",
			"iiiiiiiiiiiiiiiiiiiiiiii",
		], {
			tileWidth: 50,
			tileHeight: 50,
			tiles: {
				"x": () => [
					sprite("wall"),
					area(),
					body({isStatic: true}),
				],
				"i": () => [
					sprite("wall"),
					area(),
					body({isStatic: true}),
					anchor("center"),
					scale(2),
				],
				"b": () => [
					sprite("bad"),
					area(),
					body(),
					scale(2),
					anchor("center"),
					patrol(),
					"bad",
				],
				"c": () => [
					sprite("coin"),
					area(),
					body(),
					anchor("center"),
					"plastic",
				],
				"@": () => [
					sprite("bean"),
					area(),
					body(),
					anchor("center"),
					"player",
				]
			}
		})
		const player = level.get("player")[0]
		const enemy = level.get("bad")[0]

		//score and win condition
		let score = 0;
		add([
			rect(75,75),
			pos(0,0),
			color(0,0,0)
		])
		let coinCount = get("plastic", {recursive: true}).length
		const scoreLabel = add([
			text(score),
			pos(24, 24),
		])

		//enemy walking

		function patrol(speed = 60, dir = 1) {
			return {
				id: "patrol",
				require: [ "pos", "area" ],
				add() {
					this.on("collide", (obj, col) => {
						if (col.isLeft() || col.isRight()) {
							dir = -dir
						}
					})
				},
				update() {
					this.move(speed * dir, 0)
				},
			}
		}


		//player interactions
		player.onCollide("plastic", (coin) => {
			destroy(coin)
			score++;
			scoreLabel.text = score;
			if(score == 3){
				go("end")
			}
		})
		player.onCollide("bad", () => {
			destroy(player)
			go("gameover")
		})

		//controls
		onKeyDown("down", () => {
			player.move(0,200)
		}),
		onKeyDown("up", () => {
			player.move(0,-200)
		}),
		onKeyDown("left", () => {
			player.move(-200,0)
		}),
		onKeyDown("right", () => {
			player.move(200,0)
		})
		onKeyPress("enter", () => {
			go("gameover")
		})
		onKeyPress("7",() => {
			go("2")
		})
		onKeyPress("8",() => {
			go("1")
		})

	},





	gameover: () => {
		setBackground(0,0,0),
		add([
			text("Game Over"),
			pos(center()),
			anchor("center"),
			color(255,255,255),
		])
		add([
			text("Press 'enter' to retry"),
			pos(center().x-250,center().y+150),
			// anchor("center"),
			color(255,255,255),
		])
		onKeyPress("enter", () => {
			go("1")
		})
	},

	end: () => {
		const theEnd = add([
			text("Did you think you did anything?"),
			pos(center()),
			anchor()
		])
		theEnd
	}
}

for (const key in scenes){
	scene(key, scenes[key])
}

go("menu")
