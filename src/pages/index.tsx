import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>SynthCity</title>
        <meta name="description" content="Infinite procedural city in three.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Welcome to SynthCity</h1>
        {/* We'll add the Three.js component here later */}
      </main>
    </>
  )
}
