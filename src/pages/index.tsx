import Head from 'next/head'
import dynamic from 'next/dynamic'

const ThreeCanvas = dynamic(() => import('../components/ThreeCanvas'), { ssr: false })

export default function Home() {
  return (
    <>
      <Head>
        <title>SynthCity</title>
        <meta name="description" content="An interactive audiovisual experience by Jeff Beene" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap" rel="stylesheet" />
      </Head>
      <main>
        <div id="blocker">
          <div id="container">
            {/* Add the content of the blocker div from index.html */}
          </div>
        </div>
        <div id="crashMessage" style={{ display: 'none' }}>
          <div className="g1">[ You crashed ]</div>
        </div>
        <ThreeCanvas />
      </main>
    </>
  )
}
