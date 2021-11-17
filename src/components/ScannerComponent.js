import React from 'react';

// import { Button, Select, MenuItem } from "@material-ui/core";
import { Button } from '@material-ui/core';
import './Barcode.css';

import {
  BrowserMultiFormatReader,
  // BarcodeFormat,
  // DecodeHintType,
  NotFoundException,
} from '@zxing/library';

export default function ScannerComponent(props) {
  // const [loading, setLoading] = React.useState(props.loading || false);
  const [showButtons, setShowButtons] = React.useState(
    props.showButtons === true ? true : false
  );
  const [, setIsRunning] = React.useState(false);
  const [isLoading, setLoading] = React.useState(true);
  const [source] = React.useState(null);
  // const [devices, setDevices] = React.useState([]);
  const [, setScanResult] = React.useState('');
  const [codeReader] = React.useState(
    new BrowserMultiFormatReader()
  );

  // const [formats] = React.useState([
  //   BarcodeFormat.EAN_13,
  // ]);
  // const [hints] = React.useState(new Map());

  // React.useEffect(() => {
  //   // hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
  // }, []);

  React.useEffect(() => {
    // setLoading(props.loading);
    setShowButtons(props.showButtons);
  }, [props.loading, props.showButtons]);

  // React.useEffect(() => {
  //   if (props.started === true) {
  //     if (isRunning === false) {
  //       captureStart(props.onResult);
  //     }
  //   } else if (props.started === false) {
  //     if (isRunning === true) {
  //       captureStop();
  //     }
  //   } else {
  //   }
  // }, [props.started]);

  const captureStart = (callback = () => {}, stopOnCapture = true) => {
    setIsRunning(true);
    codeReader.decodeFromVideoDevice(source, 'video', (result, err) => {
      setLoading(false);
      if (result) {
        console.debug('decodeFromVideoDevice', source, result);
        setScanResult(result);
        if (stopOnCapture === true) {
          captureStop();
        }
        callback(result, err);
      }
      if (err && !(err instanceof NotFoundException)) {
        console.log('error', err);
      }
    });
  };

  const captureStop = () => {
    setIsRunning(false);
    codeReader.reset();
  };

  return (
    <div>
      {showButtons && (
        <div>
          <Button
            color="primary"
            variant="contained"
            onClick={() => captureStart(props.onResult)}
          >
            Scan Barcode
          </Button>{' '}
          <Button color="primary" variant="contained" onClick={captureStop}>
            Stop Scanner
          </Button>
        </div>
      )}

      <div class="scanner-container">
        <div hidden={isLoading}>
          <video
            id="video"
            width="100%"
            height="100%"
            style={{ border: '1px solid gray' }}
          ></video>
          <div class="overlay-element"></div>
          <div class="laser"></div>
        </div>
      </div>

      {/* <Select value={source} onChange={event => setSource(event.target.value)}>
        {devices.map((device, index) => {
          return (
            <MenuItem key={index} value={device.deviceId}>
              {device.label}
            </MenuItem>
          );
        })}
      </Select> */}
    </div>
  );
}
