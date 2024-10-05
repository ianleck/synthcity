import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import Perlin from '../utils/proc-noise';
import Alea from '../utils/alea';
import Terminal from './Terminal';
import Controls from './Controls';
import Settings from './Settings';
import Credits from './Credits';
import { curatedWorldSeeds, isMobile } from '../utils/ui-utils';

const ThreeCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameMode, setGameMode] = useState<'drive' | 'freeroam'>('drive');
  const [showSettings, setShowSettings] = useState(true);
  const [showCredits, setShowCredits] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    if (canvasRef.current && typeof window !== 'undefined') {
      const canvas = canvasRef.current;
      
      // Initialize the game
      window.game = {
        scene: new THREE.Scene(),
        camera: new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000),
        renderer: new THREE.WebGLRenderer({ canvas }),
        perlin: new Perlin(),
        alea: new Alea(),

        load: () => {
          console.log('Game loading...');
          const { scene, camera, renderer, perlin } = window.game;

          renderer.setSize(window.innerWidth, window.innerHeight);

          // Add a simple cube to the scene (placeholder for more complex objects)
          const geometry = new THREE.BoxGeometry();
          const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
          const cube = new THREE.Mesh(geometry, material);
          scene.add(cube);

          camera.position.z = 5;

          const animate = () => {
            requestAnimationFrame(animate);

            // Rotate the cube
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;

            // Use Perlin noise to modify the cube's position
            const time = Date.now() * 0.001;
            cube.position.x = perlin.noise(time, 0) * 2;
            cube.position.y = perlin.noise(0, time) * 2;

            renderer.render(scene, camera);
          };

          animate();

          const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
          };

          window.addEventListener('resize', handleResize);

          // Simulate asset loading
          let progress = 0;
          const loadingInterval = setInterval(() => {
            progress += 10;
            setLoadingProgress(progress);
            if (progress >= 100) {
              clearInterval(loadingInterval);
              setShowSettings(false);
            }
          }, 500);

          // Clean up function
          return () => {
            window.removeEventListener('resize', handleResize);
            scene.remove(cube);
            geometry.dispose();
            material.dispose();
            renderer.dispose();
            clearInterval(loadingInterval);
          };
        },

        // Add more game-specific methods here
        initializeEnvironment: () => {
          // Initialize game environment, terrain, etc.
        },

        initializePlayer: () => {
          // Initialize player character, controls, etc.
        },

        update: () => {
          // Update game state, handle input, etc.
        }
      };

      // Check if mobile
      if (isMobile()) {
        console.error('Mobile devices not supported');
        return;
      }

      // Load the game
      const cleanup = window.game.load();

      // Clean up on component unmount
      return () => {
        if (cleanup) cleanup();
      };
    }
  }, []);

  const handleSettingsChange = (settings: any) => {
    setGameMode(settings.mode);
    window.userSettings = settings;
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setShowSettings(!showSettings);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showSettings]);

  return (
    <>
      <canvas ref={canvasRef} id="canvas" />
      <Terminal />
      <Controls mode={gameMode} />
      {showSettings && (
        <Settings onSettingsChange={handleSettingsChange} />
      )}
      {showCredits && <Credits />}
      {loadingProgress < 100 && (
        <div id="loading-progress">
          Loading: {loadingProgress}%
        </div>
      )}
    </>
  );
};

export default ThreeCanvas;
