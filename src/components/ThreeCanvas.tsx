import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

declare global {
  interface Window {
    game: any;
    userSettings: any;
  }
}

const ThreeCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current && typeof window !== 'undefined') {
      const canvas = canvasRef.current;
      
      // Initialize the game
      window.game = {
        load: () => {
          console.log('Game loading...');
          const scene = new THREE.Scene();
          const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
          const renderer = new THREE.WebGLRenderer({ canvas });

          renderer.setSize(window.innerWidth, window.innerHeight);

          const animate = () => {
            requestAnimationFrame(animate);
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
            renderer.dispose();
          };
        }
      };

      // Initialize user settings
      window.userSettings = {};

      // Load the game
      const cleanup = window.game.load();

      // Clean up on component unmount
      return () => {
        if (cleanup) cleanup();
      };
    }
  }, []);

  return <canvas ref={canvasRef} id="canvas" style={{ opacity: 0 }} />;
};

export default ThreeCanvas;
