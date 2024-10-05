import Head from 'next/head'
import dynamic from 'next/dynamic'
import Script from 'next/script'

const ThreeCanvas = dynamic(() => import('../components/ThreeCanvas'), { ssr: false })

export default function Home() {
  return (
    <>
      <Head>
        <title>SynthCity</title>
        <meta name="description" content="An interactive audiovisual experience by Jeff Beene"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
        <meta httpEquiv="expires" content="0"/>
        <meta property="og:image" content="https://jeff-beene.com/synthcity/img/social.jpg"/>
        <meta property="og:image:type" content="image/jpg"/>
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="675"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap" rel="stylesheet"/>
      </Head>
      <main>
        <div id="blocker">
          <div id="container">
            <div className="tCol leftCol">
              <div className="tRow" style={{height: '100%'}}>
                <div className="tHeader">&gt;Terminal</div>
                <div id="terminal">
                  <span id="cursor">&#9619;</span>
                </div>
              </div>
            </div>
            <div className="tCol rightCol" style={{width: 'calc(100% - 540px)'}}>
              <div className="tRow" style={{height: '25%'}}>
                <div className="tHeader">#Resources</div>
                <div id="resources">&gt;&gt; No resources queued</div>
              </div>
              <div className="tRow" style={{height: '25%'}}>
                <div className="tHeader">#Settings</div>
                <div id="settings" style={{display: 'none'}}>
                  <div id="settingsLockMessage" className="g1" style={{display:'none', marginBottom:'10px'}}>
                    >> Settings locked: refresh page to unlock
                  </div>
                  <div style={{marginBottom: '5px'}}>
                    <span>Mode:</span>
                    <label className="formCheckContainer">
                      <input type="radio" defaultChecked name="settingsMode" value="drive"/>
                      <span className="checkmark">[Drive]</span>
                    </label>
                    <label className="formCheckContainer">
                      <input type="radio" name="settingsMode" value="freeroam"/>
                      <span className="checkmark">[Freeroam]</span>
                    </label>
                  </div>
                  <div style={{marginBottom: '5px'}}>
                    <span>World Seed:</span>
                    <label className="formCheckContainer">
                      <input type="radio" defaultChecked name="settingsWorldSeed" value="curated"/>
                      <span className="checkmark">[Curated]</span>
                    </label>
                    <label className="formCheckContainer">
                      <input type="radio" name="settingsWorldSeed" value="random"/>
                      <span className="checkmark">[Random]</span>
                    </label>
                    <label className="formCheckContainer">
                      <input type="radio" name="settingsWorldSeed" value="custom"/>
                      <span className="checkmark">[Custom]</span>
                    </label>
                  </div>
                  <div id="settingsWorldSeedValueContainer" style={{display:'none', marginBottom: '5px'}}>
                    <span>Seed:</span>
                    <input type="number" id="settingsWorldSeedValue" name="settingsWorldSeedValue" defaultValue="0"/>
                  </div>
                  <div style={{marginBottom: '5px'}}>
                    <span>Render Scaling:</span>
                    <label className="formCheckContainer">
                      <input type="radio" defaultChecked name="settingsRenderScaling" value="1"/>
                      <span className="checkmark">[1.0x]</span>
                    </label>
                    <label className="formCheckContainer">
                      <input type="radio" name="settingsRenderScaling" value="1.5"/>
                      <span className="checkmark">[1.5x]</span>
                    </label>
                    <label className="formCheckContainer">
                      <input type="radio" name="settingsRenderScaling" value="2"/>
                      <span className="checkmark">[2.0x]</span>
                    </label>
                  </div>
                  <div id="settingsWindshieldShaderContainer" style={{marginBottom: '5px'}}>
                    <span>Windshield FX:</span>
                    <label className="formCheckContainer">
                      <input type="radio" defaultChecked name="settingsWindshieldShader" value="simple"/>
                      <span className="checkmark">[Simple]</span>
                    </label>
                    <label className="formCheckContainer">
                      <input type="radio" name="settingsWindshieldShader" value="advanced"/>
                      <span className="checkmark">[Advanced]</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="tRow" style={{height: '25%'}}>
                <div className="tHeader">#Controls</div>
                <div id="controls">&gt;&gt; No program loaded</div>
              </div>
              <div className="tRow" style={{height: '32px'}}>
                <button id="enterBtn" style={{display: 'none'}}>&gt;&gt;Launch&lt;&lt;</button>
              </div>
            </div>
          </div>
        </div>
        <div id="crashMessage" style={{display: 'none'}}>
          <div className="g1">[ You crashed ]</div>
        </div>
        <ThreeCanvas />
      </main>
      <Script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossOrigin="anonymous" />
      <Script src="/js/alea.js" />
      <Script src="/js/proc-noise.js" />
      <Script src="/js/ui-v3.js" />
    </>
  )
}
