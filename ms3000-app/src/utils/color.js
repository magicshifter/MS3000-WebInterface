import Color from "color"
import { isInteger } from './types'

export function createRGB(r, g, b) {
  return {
    R: r, G: g, B: b
  }
}

export const RGB = createRGB

export function createRGBFromHex(hex) {
  const color = Color(hex)
  return createRGBFromColor(color)
}

export function createRGBFromColor(color) {
  return createRGB(color.red(), color.green(), color.blue())
}

export function hexFromRGB(c) {
  const color = Color.rgb(c.R, c.G, c.B)
  return color.hex()
}

export function equRGB(a, b) {
  return a.R === b.R && a.G === b.G && a.B === b.B
}

export function avg(rgb) {
  const avg = (rgb.R + rgb.G + rgb.B)/3;
  return avg
}


export function shadeRGB(rgb, offset=100) {
  const a = avg(rgb)

  if (a > 127) {
    return RGB(
      Math.max(rgb.R - offset, 0),
      Math.max(rgb.G - offset, 0),
      Math.max(rgb.B - offset, 0)
    )
  }
  else {
    return RGB(
      Math.min(rgb.R + offset, 255),
      Math.min(rgb.G + offset, 255),
      Math.min(rgb.B + offset, 255)
    )
  }

}

