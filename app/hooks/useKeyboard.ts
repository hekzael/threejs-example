import { useEffect, useState } from "react"

interface IStateKeyboard {
    moveForward: boolean
    moveBackward: boolean
    moveLeft: boolean
    moveRight: boolean
    jump: boolean
    dirt: boolean,
    grass: boolean,
    glass: boolean,
    wood: boolean,
    log: boolean
}

const initialState: IStateKeyboard = {
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    jump: false,
    dirt: false,
    grass: false,
    glass: false,
    wood: false,
    log: false
}

const ACTIONS_KEYBOARD_MAP: { [k: string]: string } = {
    KeyW: 'moveForward',
    KeyS: 'moveBackward',
    KeyA: 'moveLeft',
    KeyD: 'moveRight',
    Space: 'jump',
    Digit1: 'dirt',
    Digit2: 'grass',
    Digit3: 'glass',
    Digit4: 'wood',
    Digit5: 'log'
}

export const useKeyboard = () => {
    const [actions, setActions] = useState<IStateKeyboard>(initialState)

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const { code } = event

            const action = ACTIONS_KEYBOARD_MAP[code]
            if (action) {
                setActions((prev) => ({ ...prev, [action]: true }))
            }
        }

        const handleKeyUp = (event: KeyboardEvent) => {
            const { code } = event

            const action = ACTIONS_KEYBOARD_MAP[code]
            if (action) {
                setActions((prev) => ({ ...prev, [action]: false }))
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        document.addEventListener('keyup', handleKeyUp)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.removeEventListener('keyup', handleKeyUp)
        }
    })

    return { actions }
}