import Immutable from 'immutable';

export const getPixelId =
  (columns, column, row) =>
    (((row - 1) * columns) - 1) + column;

export const createPixel =
  (color, column, row, visible = false) =>
    Immutable.Map({
      color: Immutable.Map(color),
      row,
      column,
      visible,
    });

export const createPixels =
  (totalColumns, visibleColumns, rows) => {
    let pixelArray = [];
    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < totalColumns; column++) {
        const visible = column <= visibleColumns;
        pixelArray.push(
          createPixel(
            {r: 0, b: 0, g: 0, a: 155},
            column + 1,
            row + 1,
            visible,
          )
        );
      }
    }

    return Immutable.List(pixelArray);
  };
