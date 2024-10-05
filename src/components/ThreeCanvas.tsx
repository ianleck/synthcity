import React, { useEffect, useRef, useState } from 'react';
import { Game } from '../game/Game';

const ThreeCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (canvasRef.current) {
      const game = new Game(canvasRef.current);
      game.load().then(() => {
        setIsLoading(false);
      }).catch((error) => {
        console.error('Failed to load game:', error);
        setIsLoading(false);
      });
      
      return () => {
        game.dispose();
      };
    }
  }, []);

  return (
    <>
      {isLoading && <div>Loading...</div>}
      <canvas ref={canvasRef} id="canvas" style={{ opacity: isLoading ? 0 : 1 }} />
    </>
  );
};

export default ThreeCanvas;
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const ThreeCanvas = () => {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    // Three.js code here
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer()

    renderer.setSize(window.innerWidth, window.innerHeight)
    mountRef.current.appendChild(renderer.domElement)

    camera.position.z = 5

    const animate = () => {
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }

    animate()

    return () => {
      mountRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} />
}

export default ThreeCanvas
