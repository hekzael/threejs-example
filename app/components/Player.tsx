import { useEffect, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { useSphere } from '@react-three/cannon'
import { BufferGeometry, Material, Mesh, Vector3 } from 'three'
import { useKeyboard } from '../hooks/useKeyboard'

export const Player = () => {
    const { actions } = useKeyboard()
    const position = useRef([0, 0, 0])
    const velocity = useRef([0, 0, 0])
    const { camera } = useThree()

    const [ref, api] = useSphere<Mesh<BufferGeometry, Material | Material[]>>(() => ({
        mass: 1,
        type: "Dynamic",
        position: [0, 0.5, 0]
    }))

    console.log("actions", actions)

    useEffect(() => {
        api.position.subscribe(p => {
            position.current = p
        })
    }, [api.position])

    useEffect(() => {
        api.velocity.subscribe(p => {
            velocity.current = p
        })
    }, [api.velocity])


    useFrame(() => {
        camera.position.copy(
            new Vector3(position.current[0], position.current[1], position.current[2])
        )
        const direcrtion = new Vector3();
        const frontVector = new Vector3(0, 0, ((actions.moveBackward ? 1 : 0) - (actions.moveForward ? 1 : 0)))
        const sideVector = new Vector3((actions.moveLeft ? 1 : 0) - (actions.moveRight ? 1 : 0), 0, 0)
        direcrtion.subVectors(frontVector, sideVector).normalize().multiplyScalar(4).applyEuler(camera.rotation)
        api.velocity.set(direcrtion.x, velocity.current[1], direcrtion.z)

        if (actions.jump && Math.abs(velocity.current[1]) < 0.05) {
            api.velocity.set(
                velocity.current[0],
                4,
                velocity.current[2]
            )
        }
    })

    return (
        <mesh ref={ref} />
    )
}
