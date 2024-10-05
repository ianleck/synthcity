import { useState, useEffect, useCallback } from "react";
import { Perlin } from "../utils/proc-noise";
import { Alea } from "../utils/alea";
import { GameSettings } from "../types/GameSettings";

interface PlayerPosition {
  x: number;
  y: number;
  z: number;
}

export const useGameLogic = (settings: GameSettings) => {
  const [perlin] = useState(() => new Perlin());
  const [alea] = useState(() => Alea());
  const [gameMode, setGameMode] = useState<GameSettings['mode']>(settings.mode);
  const [playerPosition, setPlayerPosition] = useState<PlayerPosition>({ x: 0, y: 5, z: 0 });

  const initializeEnvironment = useCallback(() => {
    alea(settings.worldSeed);
    perlin.noiseReseed();
  }, [alea, perlin, settings.worldSeed]);

  const initializePlayer = useCallback(() => {
    setPlayerPosition({ x: 0, y: 5, z: 0 });
  }, []);

  const initializeAudio = useCallback(() => {
    // Audio initialization logic
  }, []);

  const updatePlayerPosition = useCallback(
    (delta: number): PlayerPosition => {
      if (gameMode === "drive") {
        setPlayerPosition((prev) => ({
          x: prev.x + delta * 10, // Move forward at constant speed
          y: prev.y,
          z: prev.z + Math.sin(prev.x * 0.01) * 0.5, // Add slight sideways movement
        }));
      } else if (gameMode === "freeroam") {
        // Implement freeroam movement logic here
      }
      return playerPosition;
    },
    [gameMode, playerPosition],
  );

  useEffect(() => {
    initializeEnvironment();
    initializePlayer();
    initializeAudio();
  }, [initializeEnvironment, initializePlayer, initializeAudio]);

  useEffect(() => {
    setGameMode(settings.mode);
  }, [settings.mode]);

  return { gameMode, perlin, alea, playerPosition, updatePlayerPosition };
};
