import { useEffect, useRef } from "react";
import k from "./kaplayCtx";
import game from "./scenes/game";
import gameover from "./scenes/gameover";
import mainMenu from "./scenes/main-menu";
import {  loadFromDatabase,saveToDatabase } from "./api/gameData";

export default function EndlessRunner() {
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = document.querySelector("canvas");
    if (canvas && containerRef.current) {
      containerRef.current.appendChild(canvas);
    }

    // Load assets
    k.loadSprite("chemical-bg", "/graphics/chemical-bg.png");
    k.loadSprite("platforms", "/graphics/platforms.png");
    k.loadSprite("sonic", "/graphics/sonic.png", {
      sliceX: 8,
      sliceY: 2,
      anims: {
        run: { from: 0, to: 7, loop: true, speed: 30 },
        jump: { from: 8, to: 15, loop: true, speed: 100 },
      },
    });

    k.loadSprite("ring", "/graphics/ring.png", {
      sliceX: 16,
      sliceY: 1,
      anims: {
        spin: { from: 0, to: 15, loop: true, speed: 30 },
      },
    });

    k.loadSprite("motobug", "/graphics/motobug.png", {
      sliceX: 5,
      sliceY: 1,
      anims: {
        run: { from: 0, to: 4, loop: true, speed: 8 },
      },
    });

    k.loadFont("mania", "/fonts/mania.ttf");
    k.loadSound("destroy", "/sounds/Destroy.wav");
    k.loadSound("hurt", "/sounds/Hurt.wav");
    k.loadSound("hyper-ring", "/sounds/HyperRing.wav");
    k.loadSound("jump", "/sounds/Jump.wav");
    k.loadSound("ring", "/sounds/Ring.wav");
    k.loadSound("city", "/sounds/city.mp3");

    // Register scenes only once
    k.scene("main-menu", mainMenu);

    k.scene("game", () => {
      const time = k.getData("time") || 0;
      const bestScore = k.getData("bestScore") || 0;
      game({ time, bestScore });
    });

    k.scene("gameover", gameover).then(() => {
      const score = k.getData("score") || 0;
      const time = k.getData("time") || 0;
      saveToDatabase(score, time);
    }).catch(error => {
      console.error("Error loading gameover scene:", error);
    });

    loadFromDatabase().then(({ time, bestScore }) => {
      k.setData("time", time || 0);
      k.setData("bestScore", bestScore || 0);
      k.go("main-menu");
    });
  }, []);

  return <div ref={containerRef} />;
}
