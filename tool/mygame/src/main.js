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
		control.add([text("Press 'enter' to continue"), pos(80,560)])
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
			"i  i        ci c       i",
			"i  i         i         i",
			"i  i   iiiiiiiiiiiiii  i",
			"i  i   i  c   h     i  i",
			"i  i                i  i",
			"i             i        i",
			"i        @    i        i",
			"i  i          i        i",
			"i  iiiiii  iiii        i",
			"i            i         i",
			"i            i     i   i",
			"i  iiiiiiii  iii   i   i",
			"i ci           i v i   i",
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
				"h": () => [
					sprite("bad"),
					area(),
					body(),
					scale(3),
					anchor("center"),
					//state("idle","horizontal"),
					"bad",
				],
				"v": () => [
					sprite("bad"),
					area(),
					body(),
					scale(3),
					anchor("center"),
					// state("idle","vertical"),
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

		//score and win condition
		let score = 0;
		const scoreLabel = add([
			text(score),
			pos(24, 24),
			color(0,0,0)
		])

		//enemy code
		// if (score >= 1){
		// 	enemy.enterState("move")
		// }


		//player interactions
		player.onCollide("plastic", (coin) => {
			destroy(coin)
			score++;
			scoreLabel.text = score;
		})
		player.onCollide("bad", () => {
			destroy(player)
			go("gameover")
		})

		//controls
		onKeyDown("down", () => {
			player.move(0,150)
		}),
		onKeyDown("up", () => {
			player.move(0,-150)
		}),
		onKeyDown("left", () => {
			player.move(-150,0)
		}),
		onKeyDown("right", () => {
			player.move(150,0)
		})
		onKeyPress("enter", () => {
			go("gameover")
		})
	},





	2: () => {

		setBackground(0,0,0)
		const player = add([
			rect(10,10),
			pos(1175,775),
			color(255,255,255)
		])
		const position = (player.x, player.y)
		add([
			text("position")
		])
	},





	3: () => {
		add([text("3")])

	},





	gameover: () => {
		setBackground(0,0,0),
		add([
			text("Game Over"),
			pos(center()),
			anchor("center"),
			color(255,255,255)
		])
	},

	end: () => {
		add([
			text("The End"),
		])
	}
}

for (const key in scenes){
	scene(key, scenes[key])
}

go("menu")
