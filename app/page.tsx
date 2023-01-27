'use client'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import { Canvas } from '@react-three/fiber'
import { Sky } from '@react-three/drei'
import { Physics } from '@react-three/cannon'
import { Ground } from './components/Ground'
import { FPV } from './components/FPV'
import { Player } from './components/Player'
import { TextureSelector } from './components/TextureSelector'
import { Cubes } from './components/Cubes'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>app/page.tsx</code>
        </p>
      </div>

      <div className={styles.center}>
        <Canvas>
          <Sky sunPosition={[100, 100, 20]} />
          <ambientLight intensity={0.5} />
          <FPV />
          <Physics>
            <Cubes />
            <Player />
            <Ground />
          </Physics>
        </Canvas>
        <div className={styles.pointer}>+</div>
        <TextureSelector />
      </div>
    </main>
  )
}
