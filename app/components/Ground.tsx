import { usePlane } from '@react-three/cannon'
import { ThreeEvent } from '@react-three/fiber';
import { BufferGeometry, Material, Mesh } from 'three';
import { useStore } from '../hooks/useStore';
import { textures } from './Textures'

export const Ground = () => {
    const [ref] = usePlane<Mesh<BufferGeometry, Material | Material[]>>(() => ({
        rotation: [-Math.PI / 2, 0, 0],    // [x,y,z]
        position: [0, -0.5, 0]     // [x,y,z]
    }))

    const groundTexture = textures.get("brick")!;
    groundTexture.repeat.set(100, 100)

    const [addCube] = useStore(state => [state.addCube])

    const handleClickGround = (event: ThreeEvent<MouseEvent>) => {
        event.stopPropagation()
        const [x, y, z] = Object.values(event.point)
            .map(n => Math.ceil(n))
        addCube(x, y, z)
    }

    return (
        <mesh ref={ref} onClick={handleClickGround} >
            <planeBufferGeometry attach='geometry' args={[1000, 1000]} />
            <meshStandardMaterial attach="material" map={groundTexture} />
        </mesh>
    )
}
