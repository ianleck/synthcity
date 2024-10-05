import React, { useState, useEffect } from 'react';
import { controlsText } from '../utils/ui-utils';

interface ControlsProps {
  mode: 'drive' | 'freeroam';
}

const Controls: React.FC<ControlsProps> = ({ mode }) => {
  const [controlsContent, setControlsContent] = useState<string[]>([]);

  useEffect(() => {
    setControlsContent(controlsText[mode]);
  }, [mode]);

  return (
    <div id="controls">
      {controlsContent.map((line, index) => (
        <React.Fragment key={index}>
          <span className="c1">{line}</span>
          <br />
        </React.Fragment>
      ))}
    </div>
  );
};

export default Controls;
