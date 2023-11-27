import kaboom from "kaboom"

const k = kaboom()

// k.loadSprite("bean", "sprites/bean.png")

// k.add([
// 	k.pos(120, 80),
// 	k.sprite("bean"),
// ])

// k.onClick(() => k.addKaboom(k.mousePos()))

// const FLOOR_HEIGHT = 48;
// const JUMP_FORCE = 800;
// const SPEED = 480;

// load a sprite "bean" from an image
loadSprite("bean", "sprites/bean.png")



// putting together our player character
const bean = add([
    sprite("bean"),
    pos(80, 40),
    area(),
    body(),
])

// .jump() when "space" key is pressed and only if on the ground (.isGrounded)
onKeyPress("space", () => {
    if (bean.isGrounded()) {
        bean.jump();
    }
});

// adds platform
add([
    rect(width(), 48),
    pos(0, height() - 48),
    outline(4),
    area(),
    body({ isStatic: true }),
    color(127, 200, 255),
])

// sets gravity
setGravity(1600)

// makes trees spawn at random intervals
function spawnTree() {
    add([
		add([
			rect(48, rand(24,64)),
			area(),
			outline(4),
			pos(width(), height() - 48),
			anchor("botleft"),
			color(255, 180, 255),
			move(LEFT, 240),
			"tree", // add a tag here
		]);
    ]);
    wait(rand(0.5, 1.5), () => {
        spawnTree();
    });
}

spawnTree();
// //loop the tree
// loop(1, () => {
// // add tree

// });

// collion feedback. bean and tree
bean.onCollide("tree", () => {
	addKaboom(bean.pos);
	shake();
})