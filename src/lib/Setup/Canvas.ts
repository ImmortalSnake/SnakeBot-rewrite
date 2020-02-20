import { Canvas } from 'canvas-constructor';
import { assetFolder } from '../utils/constants';
import { join } from 'path';

export default Canvas
    .registerFont(join(assetFolder, 'fonts', 'RobotoMedium.ttf'), 'RobotoMedium')
    .registerFont(join(assetFolder, 'fonts', 'RobotoRegular.ttf'), 'RobotoRegular')
    .registerFont(join(assetFolder, 'fonts', 'SegoeUIRegular.ttf'), 'SegoeUIRegular');

