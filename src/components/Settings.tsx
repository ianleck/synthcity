import React, { useState, useEffect } from 'react'
import { curatedWorldSeeds } from '../utils/ui-utils'
import { GameSettings } from '../types/GameSettings'

interface SettingsProps {
  onSettingsChange: (settings: GameSettings) => void
}

export const Settings: React.FC<SettingsProps> = ({ onSettingsChange }) => {
  const [settings, setSettings] = useState<GameSettings>({
    mode: 'drive',
    worldSeed: curatedWorldSeeds[Math.floor(Math.random() * curatedWorldSeeds.length)],
    renderScaling: 1,
    windshieldShader: true,
  })

  useEffect(() => {
    onSettingsChange(settings)
  }, [settings, onSettingsChange])

  const handleModeChange = (mode: 'drive' | 'freeroam') => {
    setSettings(prev => ({ ...prev, mode }))
  }

  const handleWorldSeedChange = (seedType: string) => {
    let worldSeed: number
    if (seedType === 'curated') {
      worldSeed = curatedWorldSeeds[Math.floor(Math.random() * curatedWorldSeeds.length)]
    } else if (seedType === 'random') {
      worldSeed = Math.floor(Math.random() * 1000000)
    } else {
      worldSeed = settings.worldSeed
    }
    setSettings(prev => ({ ...prev, worldSeed }))
  }

  const handleRenderScalingChange = (renderScaling: number) => {
    setSettings(prev => ({ ...prev, renderScaling }))
  }

  const handleWindshieldShaderChange = (windshieldShader: boolean) => {
    setSettings(prev => ({ ...prev, windshieldShader }))
  }

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
            checked={settings.mode === 'drive'}
            onChange={() => handleModeChange('drive')}
          />
          Drive
        </label>
        <label>
          <input
            type="radio"
            name="settingsMode"
            value="freeroam"
            checked={settings.mode === 'freeroam'}
            onChange={() => handleModeChange('freeroam')}
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
            checked={curatedWorldSeeds.includes(settings.worldSeed)}
            onChange={() => handleWorldSeedChange('curated')}
          />
          Curated
        </label>
        <label>
          <input
            type="radio"
            name="settingsWorldSeed"
            value="random"
            checked={!curatedWorldSeeds.includes(settings.worldSeed)}
            onChange={() => handleWorldSeedChange('random')}
          />
          Random
        </label>
        <label>
          <input
            type="radio"
            name="settingsWorldSeed"
            value="custom"
            checked={false}
            onChange={() => handleWorldSeedChange('custom')}
          />
          Custom
        </label>
        <input
          type="number"
          value={settings.worldSeed}
          onChange={(e) => setSettings(prev => ({ ...prev, worldSeed: parseInt(e.target.value) }))}
        />
      </div>
      <div>
        <h3>Render Scaling</h3>
        <label>
          <input
            type="radio"
            name="settingsRenderScaling"
            value="1"
            checked={settings.renderScaling === 1}
            onChange={() => handleRenderScalingChange(1)}
          />
          1x
        </label>
        <label>
          <input
            type="radio"
            name="settingsRenderScaling"
            value="0.5"
            checked={settings.renderScaling === 0.5}
            onChange={() => handleRenderScalingChange(0.5)}
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
            checked={settings.windshieldShader}
            onChange={() => handleWindshieldShaderChange(true)}
          />
          On
        </label>
        <label>
          <input
            type="radio"
            name="settingsWindshieldShader"
            value="off"
            checked={!settings.windshieldShader}
            onChange={() => handleWindshieldShaderChange(false)}
          />
          Off
        </label>
      </div>
      <button id="enterBtn">Enter</button>
    </div>
  )
}
