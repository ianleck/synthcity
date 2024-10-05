import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Perlin } from '../utils/proc-noise';
import { Alea } from '../utils/alea';
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
        perlin: Perlin(),
        alea: Alea(),
        player: null,
        audioListener: new THREE.AudioListener(),
        backgroundMusic: new THREE.Audio(new THREE.AudioListener()),

        load: () => {
          console.log('Game loading...');
          const { scene, camera, renderer } = window.game;

          renderer.setSize(window.innerWidth, window.innerHeight);

          // Use LoadingManager for asset loading
          const loadingManager = new THREE.LoadingManager();
          loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
            const progress = (itemsLoaded / itemsTotal) * 100;
            setLoadingProgress(progress);
          };
          loadingManager.onLoad = () => {
            setShowSettings(false);
            window.game.initializeEnvironment();
            window.game.initializePlayer();
            window.game.initializeAudio();
          };

          // Load assets here (e.g., textures, models)
          const textureLoader = new THREE.TextureLoader(loadingManager);
          const gltfLoader = new GLTFLoader(loadingManager);

          // Example: Load a texture
          textureLoader.load('/textures/ground.jpg', (texture) => {
            const groundMaterial = new THREE.MeshBasicMaterial({ map: texture });
            const groundGeometry = new THREE.PlaneGeometry(100, 100);
            const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
            groundMesh.rotation.x = -Math.PI / 2;
            scene.add(groundMesh);
          });

          // Example: Load a 3D model
          gltfLoader.load('/models/car.glb', (gltf) => {
            window.game.player = gltf.scene;
            scene.add(window.game.player);
          });

          camera.position.set(0, 5, 10);
          camera.lookAt(0, 0, 0);

          const animate = () => {
            requestAnimationFrame(animate);
            window.game.update();
            renderer.render(scene, camera);
          };

          animate();

          const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
          };

          window.addEventListener('resize', handleResize);

          // Clean up function
          return () => {
            window.removeEventListener('resize', handleResize);
            scene.traverse((object) => {
              if (object instanceof THREE.Mesh) {
                object.geometry.dispose();
                object.material.dispose();
              }
            });
            renderer.dispose();
          };
        },

        initializeEnvironment: () => {
          const { scene, perlin } = window.game;

          // Add ambient light
          const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
          scene.add(ambientLight);

          // Add directional light (sun)
          const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
          directionalLight.position.set(10, 20, 10);
          scene.add(directionalLight);

          // Create ground
          const groundGeometry = new THREE.PlaneGeometry(1000, 1000);
          const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x1a5f1a });
          const ground = new THREE.Mesh(groundGeometry, groundMaterial);
          ground.rotation.x = -Math.PI / 2;
          scene.add(ground);

          // Generate simple buildings
          for (let i = 0; i < 100; i++) {
            const buildingHeight = perlin.noise(i * 0.1, 0) * 20 + 10;
            const buildingGeometry = new THREE.BoxGeometry(5, buildingHeight, 5);
            const buildingMaterial = new THREE.MeshPhongMaterial({ color: 0x808080 });
            const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
            
            const x = (perlin.noise(i * 0.05, 0) - 0.5) * 200;
            const z = (perlin.noise(0, i * 0.05) - 0.5) * 200;
            building.position.set(x, buildingHeight / 2, z);
            
            scene.add(building);
          }

          // Add some trees
          const treeGeometry = new THREE.ConeGeometry(2, 5, 8);
          const treeMaterial = new THREE.MeshPhongMaterial({ color: 0x2d4c1e });
          for (let i = 0; i < 200; i++) {
            const tree = new THREE.Mesh(treeGeometry, treeMaterial);
            const x = (perlin.noise(i * 0.1, 100) - 0.5) * 300;
            const z = (perlin.noise(100, i * 0.1) - 0.5) * 300;
            tree.position.set(x, 2.5, z);
            scene.add(tree);
          }
        },

        initializePlayer: () => {
          const { scene, camera, player } = window.game;
          if (gameMode === 'drive' && player) {
            player.add(camera);
            camera.position.set(0, 2, -5);
            camera.lookAt(player.position);
            player.position.set(0, 0, 0);
            scene.add(player);
          } else {
            // Free roam mode
            camera.position.set(0, 10, 0);
            camera.lookAt(0, 0, 0);
          }
        },

        initializeAudio: () => {
          const { scene, camera, audioListener, backgroundMusic } = window.game;
          
          // Add audio listener to the camera
          camera.add(audioListener);

          // Load and play background music
          const audioLoader = new THREE.AudioLoader();
          audioLoader.load('/audio/background_music.mp3', (buffer) => {
            backgroundMusic.setBuffer(buffer);
            backgroundMusic.setLoop(true);
            backgroundMusic.setVolume(0.5);
            backgroundMusic.play();
          });

          // Add positional audio for car engine sound
          if (window.game.player) {
            const engineSound = new THREE.PositionalAudio(audioListener);
            audioLoader.load('/audio/engine_sound.mp3', (buffer) => {
              engineSound.setBuffer(buffer);
              engineSound.setRefDistance(20);
              engineSound.setLoop(true);
              engineSound.setVolume(0.5);
              engineSound.play();
            });
            window.game.player.add(engineSound);
          }
        },

        update: () => {
          const { player, camera } = window.game;
          const time = Date.now() * 0.001;

          if (gameMode === 'drive' && player) {
            // Simple circular movement for the car
            player.position.x = Math.sin(time * 0.5) * 50;
            player.position.z = Math.cos(time * 0.5) * 50;
            player.rotation.y = time * 0.5 + Math.PI / 2;
          } else {
            // Free roam camera movement
            camera.position.y = 10 + Math.sin(time) * 2;
            camera.position.x = Math.sin(time * 0.5) * 30;
            camera.position.z = Math.cos(time * 0.5) * 30;
            camera.lookAt(0, 0, 0);
          }
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
  }, [gameMode]);

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
