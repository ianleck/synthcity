import React, { useState } from 'react'
import ThreeCanvas from './ThreeCanvas'
import { Terminal } from './Terminal'
import { Controls } from './Controls'
import { Settings } from './Settings'
import { Credits } from './Credits'
import { GameSettings } from '../types/GameSettings'

export const Game: React.FC = () => {
  const [gameSettings, setGameSettings] = useState<GameSettings>({
    mode: 'drive',
    worldSeed: 9746,
    renderScaling: 1,
    windshieldShader: true,
  })
  const [showSettings, setShowSettings] = useState(true)
  const [showCredits, setShowCredits] = useState(false)

  const handleSettingsChange = (newSettings: GameSettings) => {
    setGameSettings(newSettings)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setShowSettings(!showSettings)
    }
  }

  return (
    <div className="game-container" onKeyDown={handleKeyDown} tabIndex={0}>
      <ThreeCanvas settings={gameSettings} />
      <Terminal />
      <Controls mode={gameSettings.mode} />
      {showSettings && <Settings onSettingsChange={handleSettingsChange} />}
      {showCredits && <Credits />}
    </div>
  )
}
import React, { useState, useEffect } from 'react'
import ThreeCanvas from './ThreeCanvas'
import Terminal from './Terminal'
import Controls from './Controls'
import { Settings } from './Settings'
import Credits from './Credits'
import { GameSettings } from '../types/GameSettings'

export const Game: React.FC = () => {
  const [gameSettings, setGameSettings] = useState<GameSettings>({
    mode: 'drive',
    worldSeed: 9746,
    renderScaling: 1,
    windshieldShader: true,
  })
  const [showSettings, setShowSettings] = useState(true)
  const [showCredits, setShowCredits] = useState(false)

  const handleSettingsChange = (newSettings: GameSettings) => {
    setGameSettings(newSettings)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowSettings(!showSettings)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [showSettings])

  return (
    <div className="game-container">
      <ThreeCanvas settings={gameSettings} />
      <Terminal />
      <Controls mode={gameSettings.mode} />
      {showSettings && <Settings onSettingsChange={handleSettingsChange} />}
      {showCredits && <Credits />}
    </div>
  )
}
