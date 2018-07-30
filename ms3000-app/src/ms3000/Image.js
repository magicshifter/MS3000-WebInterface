import { List }  from 'immutable'
import UPNG from 'upng-js'
import { RGB } from '../utils/color'

export default class Image {
  constructor(width, height, pixel) {
    this.width = width
    this.height = height
    this.pixel = pixel
  }

  toPNG() {
    const { width, height, pixel } = this

    const rgba = new Uint8Array(width * height * 4);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = y * width + x
        const rgbaIdx = (y * width + x) * 4
        const rgb = pixel.get(idx)

        rgba[rgbaIdx + 0] = rgb.R
        rgba[rgbaIdx + 1] = rgb.G
        rgba[rgbaIdx + 2] = rgb.B
        rgba[rgbaIdx + 3] = 255
      }
    }
    console.log("encoding PNG", rgba)

    const ab = rgba.buffer

    return UPNG.encode([ab], width, height, 0)
  }

  static fromPNG(arrayBuffer) {
    var png = UPNG.decode(arrayBuffer);
    const pngRGBAs = UPNG.toRGBA8(png)
    // TODO: implement frames
    const pngRGBA = new Uint8Array(pngRGBAs[0])

    console.log(pngRGBA)

    const sizeX = png.width
    const sizeY = png.height
    const patternData = []

    if (sizeY !== 16) {
      alert("PNG must be 16 pixel high. the given one is " + sizeY)
      return
    }

    for (let yy = 0; yy < sizeY; yy++) {
      for (let xx = 0; xx < sizeX; xx++) {
        const idxPng = (yy * sizeX + xx) * 4
        const r = pngRGBA[idxPng]
        const g = pngRGBA[idxPng + 1]
        const b = pngRGBA[idxPng + 2]
        console.log("pixel png", r, g, b, idxPng)
        const rgb = RGB(r, g, b)
        patternData.push(rgb)
      }
    }

    console.log("decoded PNG", patternData)
    return new Image(sizeX, sizeY, List(patternData))
  }

  static fromMagicBitmap(arrayBuffer) {
   throw "Not implemented yet"
  }

  static toMagicBitmap() {
    throw "Not implemented yet"
  }

  clone() {
    const { width, height, pixel } = this
    return new Image(width, height, pixel)
  }

  mirror(x, y) {
    throw Error('TODO: implement flip')
  }

  rotate(rad) {
    // const { channels, width, height, patternData: oldData } = this
    // const [nW, nH] = Utils.rotate2DSize(width, height, rad)
    // const [nWS, nHS] = Utils.rotate2D(width, height, rad)
    //
    //
    // const newPatternData = new Uint8Array(nW * nH * channels)
    //
    // for (let y = 0; y < height; y++) {
    //   for (let x = 0; x < width; x++) {
    //     const idx = (y * width + x) * channels
    //     let [xx, yy] = Utils.rotate2D(x, y, rad)
    //     if (nWS < 0) xx = (nW - 1) + xx
    //     if (nHS < 0) yy = (nH - 1) + yy
    //     const newIdx = (yy * nW + xx) * channels
    //     for (let i = 0; i < channels; i++) {
    //       newPatternData[newIdx + i] = oldData[idx + i]
    //     }
    //   }
    // }
    // this.width = nW
    // this.height = nH
    // this.patternData = newPatternData
  }
}
