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
