import brick from './ladrillos.jpg';
import green_table from './ladrillos-verdes.jpg';
import purple_soil from './violeta.jpg';
import dirt from './dirt.jpg';
import wood from './wood.png';
import grass from './grass.jpg';
import log from './log.jpg';
import glass from './glass.png';
import { Wrapping, TextureFilter, RepeatWrapping, NearestFilter } from 'three'

interface TextureConfig {
    url: string
    wrapS?: Wrapping
    wrapT?: Wrapping
    minFilter?: TextureFilter
}
interface IImageMap {
    [k: string]: TextureConfig
}

export const IMAGE_MAP: IImageMap = {
    "brick": { url: brick.src, wrapS: RepeatWrapping, wrapT: RepeatWrapping, minFilter: NearestFilter },
    "green_table": { url: green_table.src, minFilter: NearestFilter },
    "purple_soil": { url: purple_soil.src, minFilter: NearestFilter },
    "dirt": { url: dirt.src, minFilter: NearestFilter },
    "wood": { url: wood.src, minFilter: NearestFilter },
    "grass": { url: grass.src, minFilter: NearestFilter },
    "log": { url: log.src, minFilter: NearestFilter },
    "glass": { url: glass.src, minFilter: NearestFilter },
}