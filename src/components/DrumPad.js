import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/DrumPad.css';
import sound from './sounds.js'

class DrumPad extends React.Component {
  render() {
    const redButtons = "red-buttons", greenButtons = "green-buttons", blueButtons = "blue-buttons";

    const mapped = sound.map((pad) => (
      <button
        key={pad.keyTrigger}
        id={pad.name.replace(/\s/g, "-")} // Replace spaces with hyphens in the id attribute
        type='button'
        onClick={() => this.props.handleClick(pad.keyTrigger)}
        className={`drum-pad position-absolute translate-middle ${
            pad.keyTrigger === 'Q' ? 'top-0 start-0 '  + redButtons:
            pad.keyTrigger === 'W' ? 'top-0 start-50 '  + redButtons:
            pad.keyTrigger === 'E' ? 'top-0 start-100 '  + redButtons:
            pad.keyTrigger === 'A' ? 'top-50 start-0 ' + greenButtons :
            pad.keyTrigger === 'S' ? 'top-50 start-50 '  + greenButtons:
            pad.keyTrigger === 'D' ? 'top-50 start-100 '  + greenButtons:
            pad.keyTrigger === 'Z' ? 'top-100 start-0 '  + blueButtons:
            pad.keyTrigger === 'X' ? 'top-100 start-50 '  + blueButtons:
            pad.keyTrigger === 'C' ? 'top-100 start-100 '  + blueButtons:
            ''
        }`}
        value={pad.keyTrigger}
      >
        {pad.keyTrigger}
        <audio src={pad.url} className='clip' id={pad.keyTrigger} />
      </button>
    ));

    return (
      <div className='text-white' id='buttons'>
        <div className="container text-center position-relative">
          {mapped}
        </div>
      </div>
    );
  }
}

export default DrumPad;
