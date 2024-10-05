import React, { useEffect, useRef } from 'react';
import { Game } from '../game/Game';

const ThreeCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const game = new Game(canvasRef.current);
      game.load();
      
      return () => {
        // Cleanup function
        game.dispose();
      };
    }
  }, []);

  return <canvas ref={canvasRef} id="canvas" style={{ opacity: 0 }} />;
};

export default ThreeCanvas;
