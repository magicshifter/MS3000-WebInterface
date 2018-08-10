import { List }  from 'immutable'
import UPNG from 'upng-js'
import { RGB } from '../utils/color'

function calcBufferSize(bitPerPixel, w, h) {
  if (bitPerPixel === 24) {
    return w * h * 3;
  }
  if (bitPerPixel === 8) {
    return w * h;
  }
  else if (bitPerPixel === 1) {
    if ((w * h) % 8) {
      window.alert('CalcBufferSize: Ugly 1bit BufferSize: ' + (w * h / 8));
      return Math.ceil(w * h / 8);
    }
    return w * h / 8;
  }
  else {
    window.alert('CalcBufferSize: Unknown bitPerPixel Value: ' + bitPerPixel);
  }
}

export default class MagicBitmap {
  static TYPES = {
    'bitmap': 0xBA,
    'font': 0xF0,
    'bitmap2': 0xB2 // V2 with delay for each frame
  };

  constructor(type, bitPerPixel, width, height, frames, delayOrFirstCharOrDelayArray) {
    if (!MagicBitmap.isValidType(type)) {
      const txt = "unknown type for MagicBitmap: " + type
      alert(txt)
      throw new Error(txt)
    }
    this.type = type
    this.bitPerPixel = bitPerPixel
    this.width = width
    this.height = height
    this.frames = frames
    this.delayOrFirstCharOrDelayArray = delayOrFirstCharOrDelayArray
  }

  static isValidType = (type) => {
    const ts = MagicBitmap.TYPES
    const kk = Object.keys(ts)

    for (var i=0; i < kk.length; i++) {
      const k = kk[i]
      const t = ts[k]

      if (t === type) {
        return true
      }
    }
    return false
  }

  getBlob =
    () => {
      const {type, bitPerPixel, width, height, frames, delayOrFirstCharOrDelayArray} = this;

      if (type !== 'bitmap' && type !== 'font' && type !== 'bitmap2')

      const headerSize = 16;
      const v2BlockSize = type === 'bitmap2' ?

      const fileSize = this.CalcBufferSize(bitPerPixel, width, height) + headerSize;
      const frames = 1;
      const firstChar = 0;

      const fileData = new Uint8Array(fileSize);

      // write header
      fileData[0] = 0x23;
      fileData[1] = (fileSize & 0xFF0000) >> 16;
      fileData[2] = (fileSize & 0xFF00) >> 8;
      fileData[3] = (fileSize & 0xFF) >> 0;

      fileData[4] = bitPerPixel;
      fileData[5] = (frames - 1); // 0 for static images larger for animations and fonts
      fileData[6] = width;
      fileData[7] = height;

      fileData[8] = subType === 'font' ? 0xF0 : subType === 'bitmap' ? 0xBA : 0x00;
      fileData[9] = firstChar; // >= 1 for fonts/ 0 for animations
      fileData[10] = (delayMs & 0xFF00) >> 8; // 0 for fonts
      fileData[11] = (delayMs & 0xFF) >> 0;

      for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
          const idx = x + (y * totalWidth);
          const pixel = pixels[idx];
          const fileDataIdx = headerSize + 3 * (y + x * height);

          fileData[fileDataIdx + 0] = pixel.color.r;
          fileData[fileDataIdx + 1] = pixel.color.g;
          fileData[fileDataIdx + 2] = pixel.color.b;
        }
      }

      const blob = new window.Blob([fileData]);
      return blob;
    };

  toBlob(frameDelay = 1000) {
    const { width, height, frames } = this

    const fS = frames.length
    const buffers = []
    const delays = []

    for (var i=0; i < fS; i++) {
      const pixel = frames[i]

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
      buffers.push(rgba.buffer)
      delays.push(frameDelay)
    }

    return UPNG.encode(buffers, width, height, 0, delays)
  }

  static fromArrayBuffer(arrayBuffer) {
    var png = UPNG.decode(arrayBuffer);

    const sizeX = png.width
    const sizeY = png.height
    // if (sizeY !== 16) {
    //   alert("PNG must be 16 pixel high. the given one is " + sizeY)
    //   return
    // }

    if (sizeY > 1000 || sizeX > 1000) {
      alert("PNG is largert than 1000px no thanx! " + sizeX + "/" + sizeY)
      return
    }


    const frames = []
    const pngRGBAs = UPNG.toRGBA8(png)
    for (var i = 0; i < pngRGBAs.length; i++) {
      const pngRGBA = new Uint8Array(pngRGBAs[i])
      //console.log("working on frame", i, pngRGBA)

      const patternData = []

      for (let yy = 0; yy < sizeY; yy++) {
        for (let xx = 0; xx < sizeX; xx++) {
          const idxPng = (yy * sizeX + xx) * 4
          const r = pngRGBA[idxPng]
          const g = pngRGBA[idxPng + 1]
          const b = pngRGBA[idxPng + 2]
          //console.log("pixel png", r, g, b, idxPng)
          const rgb = RGB(r, g, b)
          patternData.push(rgb)
        }
      }

      frames.push(List(patternData))
    }

    console.log("decoded PNG", frames)
    return new Image(sizeX, sizeY, frames)
  }

  static fromMagicBitmap(arrayBuffer) {
    throw "Not implemented yet"
  }

  static toMagicBitmap() {
    throw "Not implemented yet"
  }

  clone() {
    const { width, height, frames } = this
    return new Image(width, height, frames)
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
