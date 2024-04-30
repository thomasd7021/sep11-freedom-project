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
		//player spawn
		const player = add([
			sprite("bean"),
			pos(75,50),
			area(),
			body(),

		])

		//background
		setBackground(0,0,200)

		//level
		addLevel([
			"iiiiiiiiiiiiiiiiiiiiiiii",
			"i  i        ci c       i",
			"i  i         i         i",
			"i  i   iiiiiiiiiiiiii  i",
			"i  i   i  c         i  i",
			"i  i          b     i  i",
			"i             i        i",
			"i             i        i",
			"i  i          i        i",
			"i  iiiiii  iiii        i",
			"i            i         i",
			"i            i     i   i",
			"i  iiiiiiii  iii   i   i",
			"i ci           i b i   i",
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
					scale(2),
				],
				"b": () => [
					sprite("bad"),
					area(),
					body(),
					scale(3),
					height(200),
					"bad"
				],
				"c": () => [
					sprite("coin"),
					area(),
					body(),
					scale(3),
					color(255,255,255),
					offscreen({destroy: true}),
					"plastic"
				]
			}
		})
		let score = 0;
		const scoreLabel = add([
			text(score),
			pos(24, 24),
			color(0,0,0)
		])

		player.onCollide("coin", (coin) => {
			score++;
			scoreLabel.text = score;
			destroy(coin)

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

	}
}

for (const key in scenes){
	scene(key, scenes[key])
}

go("menu")
