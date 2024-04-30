import kaboom from "kaboom"

kaboom({
	width: 1200,
	height: 800,
	letterbox: "true"
})

loadSprite("bean", "sprites/bean.png")
loadSprite("bad", "sprites/bad.png")
loadSprite("coin", "sprites/coin.png")
// const control = {
	// onKeyPress("space", () => {
	// 	player.jump()
	// })
	// onKeyPress("up", () => {
	// 	player.jump()
	// }),
	// onKeyDown("left", () => {
	// 	player.move(-150,0)
	// }),
	// onKeyDown("right", () => {
	// 	player.move(150,0)
	// })
// }
const scenes = {
	menu: () => {
		add([
			rect(width(),height()),
			color(0,0,0),
		])
		add([
			text("Press Enter to Start"),
			pos(50,40),
		])
		onKeyPress("enter", () => {
			go("controls")
		})
	},
	controls: () => {
		add([
			rect(width(),height()),
			color(0,0,0)
		])
		add([
			text("Controls"),
			pos(50,40)
		]),
		add([
			text("Up arrow = Up"),
			pos(80,100)
		])
		add([
			text("Down arrow= Down"),
			pos(80,160)
		])
		add([
			text("Left arrow = Left"),
			pos(80,220)
		])
		add([
			text("Right arrow = Right"),
			pos(80,280)
		])
		add([
			text("Press 'enter' to continue"),
			pos(80,560)
		])
		onKeyPress("enter", () => {
			go("1")
		})
		const player = add([
			sprite("bean"),
			pos(80, 40),
			area(),
			body(),
		])
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
		add([
			rect(width(),50),
			pos(0,height()-50),
			area(),
			color(0,0,0),
			body({isStatic: true})
		])

	},
	1: () => {
		//control

		const player = add([
			sprite("bean"),
			pos(center().x, center().y),
			area(),
			body(),
			doubleJump({doubleJump: false})
		])
		add([
			rect(width(),50),
			pos(0,height()-50),
			area(),
			color(0,0,0),
			body({isStatic: true})
		])

		addLevel([
			"                    ",
			"                    ",
			"                    ",
			"                    ",
			"                    ",
			"                    ",
			"                    ",
			"xxxxxxxxxxxxxxxxxxxx",
		], {
			tileWidth: 100,
			tileHeight: 100,
			tiles: {
				"x": () => [
					sprite("coin"),
					area(),
					body(),
					scale(4)
				]
			}
		})

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
	},
	2: () => {

	},
	3: () => {

	},
	gameover: () => {

	},
	end: () => {

	}
}

for (const key in scenes){
	scene(key, scenes[key])
}

go("menu")
