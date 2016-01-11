import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';

import {actions} from 'redux/modules/pixelEditor';

import {colorType} from 'utils/propTypes';

import Pixel from 'components/inputs/Pixel';

import RGBAInput from 'components/inputs/RGBAInput';
import ImageInput from 'components/inputs/ImageInput';
import FileUploadInput from 'components/inputs/FileUploadInput';

import classes from './PixelEditorView.scss';

const mapStateToProps = (state) => {
  const {pixelEditor, settings, layout} = state;
  return {
    pixelEditor,
    settings,
    layout,
  };
};

export class PixelEditorView extends Component {
  static propTypes = {
    setColor: PropTypes.func.isRequired,
    setColorValue: PropTypes.func.isRequired,

    pixelEditor: PropTypes.shape({
      pixels: PropTypes.array.isRequired,
      rows: PropTypes.number.isRequired,
      columns: PropTypes.number.isRequired,
      color: colorType.isRequired,
    }).isRequired,

    settings: PropTypes.shape({
      protocol: PropTypes.string.isRequired,
      host: PropTypes.string.isRequired,
    }).isRequired,

    layout: PropTypes.shape({
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
    }).isRequired,
  };

  render() {
    const {setColorValue, pixelEditor, settings, layout} = this.props;
    const {pixels, color, rows, columns} = pixelEditor;
    const {host, protocol} = settings;

    const width = layout.height > layout.width
                    ? ((100 / columns) / 1.6) - 0.42 + 'vw'
                    : (100 / columns) - 0.2 + 'vw';

    const height = width;

    return (
      <div className={classes['container']}>
        <ul className={classes['list']}>
          {pixels && pixels.map(p => (
            <Pixel
              key={`${p.column}-${p.row}`}
              pixel={p}
              pixelId={(((p.row - 1) * columns) - 1) + p.column}
              height={height}
              width={width}
            />
          ))}
        </ul>

        <div className={classes['picker']}>
          <RGBAInput
            color={color}
            setColorValue={setColorValue}
          />

          <ImageInput label='upload image' />

          <FileUploadInput
            pixels={pixels}
            height={rows}
            width={columns}
            url={[protocol, host].join('://')}
            text='send to MS3000'
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, actions)(PixelEditorView);
