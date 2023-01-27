
import { useEffect, useState } from 'react'
import { useKeyboard } from '../hooks/useKeyboard'
import { IMAGE_MAP } from '../../public/images'
import { useStore } from '../hooks/useStore'
import styles from '../page.module.css'

export const TextureSelector = () => {
    const [visible, setVisible] = useState(true)
    const [texture, setTexture] = useStore(state => [state.texture, state.setTexture])

    const {
        actions: { dirt,
            grass,
            glass,
            wood,
            log }
    } = useKeyboard()

    useEffect(() => {
        const visibilityTimeout = setTimeout(() => {
            setVisible(false)
        }, 1000)

        setVisible(true)

        return () => {
            clearTimeout(visibilityTimeout)
        }
    }, [texture])

    useEffect(() => {
        const options = {
            dirt,
            grass,
            glass,
            wood,
            log
        }

        const selectedTexture = Object
            .entries(options)
            .find(([texture, isEnabled]) => isEnabled)

        if (selectedTexture) {
            const [textureName] = selectedTexture
            setTexture(textureName)
        }
    }, [dirt, grass, glass, wood, log])

    return (
        <div className={styles.texture_selector}>
            {
                Object
                    .entries(IMAGE_MAP)
                    .map(([imgKey, img]) => {
                        return (
                            <img
                                className={texture === imgKey ? styles.selected : ''}
                                key={imgKey}
                                src={img.url}
                                alt={imgKey}
                            />
                        )
                    })
            }
        </div>
    )
}