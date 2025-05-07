import k from "../kaplayCtx";

export function makeSonic(pos, isDummy = false) {
  const components = [
    k.sprite("sonic", { anim: "run" }),
    k.scale(4),
    k.area(),
    k.anchor("center"),
    k.pos(pos),
    "sonic",
  ];

  if (!isDummy) {
    components.push(k.body({ jumpForce: 1700 }), {
      ringCollectUI: null,
      setControls() {
        k.onButtonPress("jump", () => {
          if (this.isGrounded()) {
            this.play("jump");
            this.jump();
            k.play("jump", { volume: 0.3 });
          }
        });
      },
      setEvents() {
        this.onGround(() => {
          this.play("run");
        });
      },
    });
  }

  const sonic = k.add(components);

  if (!isDummy) {
    sonic.ringCollectUI = sonic.add([
      k.text("", { font: "mania", size: 24 }),
      k.color(255, 255, 0),
      k.anchor("center"),
      k.pos(30, -10),
    ]);
  }

  return sonic;
}
