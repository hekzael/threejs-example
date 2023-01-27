
import { TextureLoader, Texture, ClampToEdgeWrapping, LinearMipmapLinearFilter } from 'three';
import { IMAGE_MAP } from '../../public/images';

export const textures = new Map<string, Texture>()

const loadTextures = async () => {
    for (const [key, value] of Object.entries(IMAGE_MAP)) {
        const texture = new TextureLoader().load(value.url)
        texture.wrapS = value.wrapS || ClampToEdgeWrapping
        texture.wrapT = value.wrapS || ClampToEdgeWrapping
        texture.minFilter = value.minFilter || LinearMipmapLinearFilter
        if (textures.has(key)) {
            textures.set(key, texture)
        } else {
            textures.set(key, texture)
        }
    }
}

loadTextures();
