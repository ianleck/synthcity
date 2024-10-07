import Head from 'next/head'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    // Load the game script
    const script = document.createElement('script')
    script.src = '/js/game.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      // Clean up the script when the component unmounts
      document.body.removeChild(script)
    }
  }, [])

  return (
    <>
      <Head>
        <title>SynthCity</title>
        <meta name="description" content="Infinite procedural city in three.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div id="blocker">
          <div id="instructions">
            <p style={{fontSize: '36px'}}>
              Click to play
            </p>
            <p>
              Move: WASD<br/>
              Look: MOUSE<br/>
              Jump: SPACE<br/>
              Radio: R
            </p>
          </div>
        </div>
        <canvas id="canvas"></canvas>
        <div id="terminal"></div>
      </main>
    </>
  )
}
