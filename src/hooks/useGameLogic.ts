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
    alea();
  }, [alea, settings.worldSeed]);

  const initializePlayer = useCallback(() => {
    setPlayerPosition({ x: 0, y: 5, z: 0 });
  }, []);

  const initializeAudio = useCallback(() => {
    // Audio initialization logic
  }, []);

  const updatePlayerPosition = useCallback(
    (delta: number): PlayerPosition => {
      if (gameMode === "drive") {
        // Update player position for drive mode
        setPlayerPosition((prev) => ({
          x: prev.x + delta * 10, // Move forward at constant speed
          y: prev.y,
          z: prev.z,
        }));
      } else if (gameMode === "freeroam") {
        // Update player position for freeroam mode
        // This could be controlled by user input
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
