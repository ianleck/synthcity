import React, { useState, useEffect } from 'react';
import { curatedWorldSeeds } from '../utils/ui-utils';

interface SettingsProps {
  onSettingsChange: (settings: any) => void;
}

const Settings: React.FC<SettingsProps> = ({ onSettingsChange }) => {
  const [mode, setMode] = useState('drive');
  const [worldSeedType, setWorldSeedType] = useState('curated');
  const [worldSeedValue, setWorldSeedValue] = useState('');
  const [renderScaling, setRenderScaling] = useState('1');
  const [windshieldShader, setWindshieldShader] = useState('on');

  useEffect(() => {
    const settings = {
      mode,
      worldSeed: worldSeedType === 'custom' ? worldSeedValue : curatedWorldSeeds[Math.floor(Math.random() * curatedWorldSeeds.length)],
      renderScaling,
      windshieldShader: windshieldShader === 'on',
    };
    onSettingsChange(settings);
  }, [mode, worldSeedType, worldSeedValue, renderScaling, windshieldShader]);

  return (
    <div id="settings">
      <h2>Settings</h2>
      <div>
        <h3>Mode</h3>
        <label>
          <input
            type="radio"
            name="settingsMode"
            value="drive"
            checked={mode === 'drive'}
            onChange={() => setMode('drive')}
          />
          Drive
        </label>
        <label>
          <input
            type="radio"
            name="settingsMode"
            value="freeroam"
            checked={mode === 'freeroam'}
            onChange={() => setMode('freeroam')}
          />
          Free Roam
        </label>
      </div>
      <div>
        <h3>World Seed</h3>
        <label>
          <input
            type="radio"
            name="settingsWorldSeed"
            value="curated"
            checked={worldSeedType === 'curated'}
            onChange={() => setWorldSeedType('curated')}
          />
          Curated
        </label>
        <label>
          <input
            type="radio"
            name="settingsWorldSeed"
            value="random"
            checked={worldSeedType === 'random'}
            onChange={() => setWorldSeedType('random')}
          />
          Random
        </label>
        <label>
          <input
            type="radio"
            name="settingsWorldSeed"
            value="custom"
            checked={worldSeedType === 'custom'}
            onChange={() => setWorldSeedType('custom')}
          />
          Custom
        </label>
        {worldSeedType === 'custom' && (
          <input
            type="number"
            value={worldSeedValue}
            onChange={(e) => setWorldSeedValue(e.target.value)}
          />
        )}
      </div>
      <div>
        <h3>Render Scaling</h3>
        <label>
          <input
            type="radio"
            name="settingsRenderScaling"
            value="1"
            checked={renderScaling === '1'}
            onChange={() => setRenderScaling('1')}
          />
          1x
        </label>
        <label>
          <input
            type="radio"
            name="settingsRenderScaling"
            value="0.5"
            checked={renderScaling === '0.5'}
            onChange={() => setRenderScaling('0.5')}
          />
          0.5x
        </label>
      </div>
      <div>
        <h3>Windshield Shader</h3>
        <label>
          <input
            type="radio"
            name="settingsWindshieldShader"
            value="on"
            checked={windshieldShader === 'on'}
            onChange={() => setWindshieldShader('on')}
          />
          On
        </label>
        <label>
          <input
            type="radio"
            name="settingsWindshieldShader"
            value="off"
            checked={windshieldShader === 'off'}
            onChange={() => setWindshieldShader('off')}
          />
          Off
        </label>
      </div>
      <button id="enterBtn">Enter</button>
    </div>
  );
};

export default Settings;
