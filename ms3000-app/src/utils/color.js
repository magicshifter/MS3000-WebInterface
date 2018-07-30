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

