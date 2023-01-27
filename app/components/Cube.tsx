import { useStore } from '../hooks/useStore'
import { Triplet, useBox } from '@react-three/cannon'
import { useState } from 'react'
import { textures } from './Textures'
import { BufferGeometry, Material, Mesh } from 'three'

export interface ICube {
    id: string
    position: Triplet
    texture: string
}

export const Cube = ({ id, position, texture }: ICube) => {
    const [isHovered, setIsHovered] = useState(false)
    const [removeCube] = useStore(state => [state.removeCube])

    const [ref] = useBox<Mesh<BufferGeometry, Material | Material[]>>(() => ({
        type: 'Static',
        position
    }))

    const activeTexture = textures.get(texture)

    return (
        <mesh
            onPointerMove={(e) => {
                e.stopPropagation()
                setIsHovered(true)
            }}
            onPointerOut={(e) => {
                e.stopPropagation()
                setIsHovered(false)
            }}
            ref={ref}
            onClick={(e) => {
                e.stopPropagation()

                if (e.altKey) {
                    removeCube(id)
                }
            }}
        >
            <boxBufferGeometry attach='geometry' />
            <meshStandardMaterial
                color={isHovered ? 'grey' : 'white'}
                transparent
                map={activeTexture}
                attach='material'
            />
        </mesh>
    )
}