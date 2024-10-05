import React, { useState, useEffect, useRef } from "react";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Terminal from "./Terminal";
import Controls from "./Controls";
import { Settings } from "./Settings";
import Credits from "./Credits";
import { GameSettings } from "../types/GameSettings";
import { useGameLogic } from "../hooks/useGameLogic";

export const Game: React.FC = () => {
  const [gameSettings, setGameSettings] = useState<GameSettings>({
    mode: "drive",
    worldSeed: 9746,
    renderScaling: 1,
    windshieldShader: true,
  });
  const [showSettings, setShowSettings] = useState(true);
  const [showCredits, setShowCredits] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { perlin, playerPosition, updatePlayerPosition } = useGameLogic(gameSettings);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const controls = new OrbitControls(camera, renderer.domElement);

    // Add a ground plane
    const groundGeometry = new THREE.PlaneGeometry(1000, 1000);
    const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x1a5f1a });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 10);
    scene.add(directionalLight);

    // Generate buildings and trees
    for (let i = 0; i < 100; i++) {
      const buildingGeometry = new THREE.BoxGeometry(5, Math.random() * 20 + 10, 5);
      const buildingMaterial = new THREE.MeshPhongMaterial({ color: 0x808080 });
      const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
      building.position.set(
        (perlin.noise(i * 0.05, 0) - 0.5) * 200,
        buildingGeometry.parameters.height / 2,
        (perlin.noise(0, i * 0.05) - 0.5) * 200
      );
      scene.add(building);

      const treeGeometry = new THREE.ConeGeometry(2, 5, 8);
      const treeMaterial = new THREE.MeshPhongMaterial({ color: 0x2d4c1e });
      const tree = new THREE.Mesh(treeGeometry, treeMaterial);
      tree.position.set(
        (perlin.noise(i * 0.1, 100) - 0.5) * 300,
        2.5,
        (perlin.noise(100, i * 0.1) - 0.5) * 300
      );
      scene.add(tree);
    }

    camera.position.set(0, 10, 20);
    controls.update();

    const animate = () => {
      requestAnimationFrame(animate);
      const newPosition = updatePlayerPosition(0.016); // Assuming 60 FPS
      camera.position.set(newPosition.x, newPosition.y + 5, newPosition.z + 10);
      camera.lookAt(newPosition.x, newPosition.y, newPosition.z);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [perlin, updatePlayerPosition]);

  const handleSettingsChange = (newSettings: GameSettings) => {
    setGameSettings(newSettings);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowSettings(!showSettings);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showSettings]);

  return (
    <div className="game-container">
      <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 }} />
      <Terminal />
      <Controls mode={gameSettings.mode} />
      {showSettings && <Settings onSettingsChange={handleSettingsChange} />}
      {showCredits && <Credits />}
    </div>
  );
};
