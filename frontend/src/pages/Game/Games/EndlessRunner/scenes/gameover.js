import k from "../kaplayCtx";
import saveToDatabase from "../api/gameData";

export default function gameover(citySfx) {
  const score = k.getData("score") || 0;
  const time = k.getData("time") || 0;

  if (citySfx && citySfx.stop) citySfx.stop();

  k.add([
    k.text("GAME OVER", { size: 96, font: "mania" }),
    k.pos(960, 240),
    k.anchor("center"),
  ]);

  k.add([
    k.text(`Score: ${score}`, { size: 48, font: "mania" }),
    k.pos(960, 320),
    k.anchor("center"),
  ]);

  k.add([
    k.text(`Time: ${Math.floor(time)}s`, { size: 48, font: "mania" }),
    k.pos(960, 380),
    k.anchor("center"),
  ]);

  saveToDatabase(score, time);

  k.wait(3, () => {
    // Clear old scene entities and reset game state
    k.setData("time", 0);
    k.setData("score", 0);
    k.go("main-menu");
  });
}
