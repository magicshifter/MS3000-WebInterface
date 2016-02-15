import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { saveAs } from 'filesaver.js';

import classes from './FileUploadInput.scss';

const mapStateToProps =
  ({ settingsView, pixels, imageView }) => {
    const { host } = settingsView.toJS();
    const pxs = pixels.toJS();
    const { rows, totalColumns, visibleColumns } = imageView.toJS();

    return {
      url: `http://${host}`,
      pixels: pxs,
      height: rows,
      width: visibleColumns,
      totalWidth: totalColumns,
    };
  };

export class FileUploadInput extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    pixels: PropTypes.array.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    totalWidth: PropTypes.number.isRequired,
  };

  static defaultProps = {
    simple: true,
  };

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.getBlob = this.getBlob.bind(this);
    this.onFileDownload = this.onFileDownload.bind(this);
    this.getFileName = this.getFileName.bind(this);
  }

  CalcBufferSize(bitPerPixel, w, h) {
    if (bitPerPixel === 24) {
      return w * h * 3;
    }

    if (bitPerPixel === 8) {
      return w * h;
    } else if (bitPerPixel === 1) {
      if ((w * h) % 8) {
        window.alert('CalcBufferSize: Ugly 1bit BufferSize: ' + (w * h / 8));
        return Math.ceil(w * h / 8);
      }
      return w * h / 8;
    } else {
      window.alert('CalcBufferSize: Unknown bitPerPixel Value: ' + (w * h / 8));
    }
  }

  getBlob() {
    const { height, width, pixels, totalWidth } = this.props;

    const subType = 'bitmap';
    const headerSize = 16;
    const bitPerPixel = 24;
    const delayMs = 500;
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
  }

  getFileName() {
    var fileName = this.refs.fileName.value;
    fileName = fileName + '.magicBitmap';
    return fileName;
  }

  onFileDownload() {
    const blob = this.getBlob();
    const fileName = this.getFileName();
    saveAs(blob, fileName);
  }

  onClick() {
    const blob = this.getBlob();
    const fileName = this.getFileName();

    var url = this.props.url;
    // console.log({url});
    if (url === 'http://') {
      url = '';
    }
    // console.log({url});

    const formData = new window.FormData();
    formData.append('uploadFile', blob, fileName);

    const request = new window.XMLHttpRequest();
    request.onload =
      () =>
        request.status === 200
        ? console.log('Uploaded!')
        : console.warn(`Error ${request.status} occurred when trying to upload your file.`);

    request.timeout = 3000;
    request.ontimeout =
      () =>
        console.warn(`Connection to ${url} timed out!!!`);

    request.open('POST', `${url}/upload`);
    request.send(formData);
  }

  render() {
    return (
      <div className={classes['container']}>

        <div>
          <label>Filename:</label>
          <input
            type='text'
            defaultValue='userImage'
            ref='fileName'
          />
        </div>

        <input
          type='button'
          onClick={this.onClick}
          value='Send to MagicShifter'
        />

        <input
          type='button'
          onClick={this.onFileDownload}
          value='download file'
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, {})(FileUploadInput);
