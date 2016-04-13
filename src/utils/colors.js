import rgba from 'rgba-convert';

import { isString, isObject, isArray } from 'utils/types';

export const colorsTo =
  (convertTo, colors) => {
    let newColors = {};

    Object.keys(colors)
      .forEach(key => {
        const color = colors[key];
        if (isString(color)) {
          if (convertTo === 'obj') {
            newColors[key] = rgba.obj(color);
          } else {
            newColors[key] = rgba(color);
          }
        } else if (isArray(color) || isObject(color)) {
          if (convertTo === 'css') {
            newColors[key] = rgba.css(color);
          } else {
            newColors[key] = colorsTo(convertTo, colors[key]);
          }
        }
      });

    return newColors;
  };

export const colorsToRGBA =
  colors =>
    colorsTo('rgba', colors);

export const colorsToCSS =
  colors =>
    colorsTo('css', colors);

export const colorsToObj =
  colors =>
    colorsTo('obj', colors);

export const rgba_fromArray =
  pixelArray => {
    let convertedColors = [];
    const colorNames = ['r', 'b', 'g', 'a'];

    for (let currentColorId = 0; currentColorId < pixelArray.size; currentColorId += 4) {
      let color = {};

      Object.keys(colorNames)
        .forEach(key => {
          const colorName = colorNames[key];
          const colorKey = currentColorId + key;
          color[colorName] = pixelArray[colorKey];
        });

      convertedColors.push(color);
    }

    return convertedColors;
  };

export const invert =
  pixels =>
    pixels.map(invertPixel);

export const invertPixel =
  px => {
    px.color = {
      r: 255 - px.color.r,
      g: 255 - px.color.g,
      b: 255 - px.color.b,
      a: px.color.a,
    };

    return px;
  };

export const darken =
 pixels =>
    pixels.map(darkenPixel);

export const darkenPixel =
  px => {
    px.color = {
      r: Math.max(0, px.color.r - 10),
      g: Math.max(0, px.color.g - 10),
      b: Math.max(0, px.color.b - 10),
      a: px.color.a,
    };

    return px;
  };

export const lighten =
  pixels =>
    pixels.map(lightenPixel);

export const lightenPixel =
  px => {
    px.color = {
      r: Math.min(255, px.color.r + 10),
      g: Math.min(255, px.color.g + 10),
      b: Math.min(255, px.color.b + 10),
      a: px.color.a,
    };

    return px;
  };

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @return  {Array}           The RGB representation
 */
export const hslToRgb =
  ({ h, s, l, a = 255 }) => {
    let r, g, b;

    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb =
        (p, q, t) => {
          if (t < 0) {
            t += 1;
          }
          if (t > 1) {
            t -= 1;
          }

          if (t < 1 / 6) {
            return p + (q - p) * 6 * t;
          }

          if (t < 1 / 2) {
            return q;
          }

          if (t < 2 / 3) {
            return p + (q - p) * (2 / 3 - t) * 6;
          }

          return p;
        };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255), a];
  };

/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   {number}  r       The red color value
 * @param   {number}  g       The green color value
 * @param   {number}  b       The blue color value
 * @return  {Array}           The HSL representation
 */
export const rgbToHsl =
  ({ r, g, b }) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    let h = (max + min) / 2;
    let s = h;
    const l = h;

    if (max === min) {
      h = 0; // achromatic
      s = 0;
    } else {
      const d = max - min;

      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return [h, s, l];
  };
