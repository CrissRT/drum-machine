import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/DrumPad.css';
import sound from './sounds.js'

class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }
  
  handleKeyDown = (event) => {
    const keyTrigger = event.key.toUpperCase();
    const pad = sound.find((pad) => pad.keyTrigger === keyTrigger);
    if (pad) {
      const audioFile = document.getElementById(keyTrigger);
      if (audioFile) {
        audioFile.currentTime = 0;
        audioFile.play().catch((error) => {
          console.log('Playback error:', error);
        });
      }
    }
  };

  handleClick(keyTrigger) {
    const audioFile = document.getElementById(keyTrigger);
    audioFile.play();
    audioFile.currentTime = 0;
  }

  render() {

    const mapped = sound.map((pad) => (
      <button
        key={pad.keyTrigger}
        id={pad.name.replace(/\s/g, "-")} // Replace spaces with hyphens in the id attribute
        type='button'
        onClick={() => this.handleClick(pad.keyTrigger)}
        className={`drum-pad position-absolute translate-middle ${
            pad.keyTrigger === 'Q' ? 'top-0 start-0' :
            pad.keyTrigger === 'W' ? 'top-0 start-50' :
            pad.keyTrigger === 'E' ? 'top-0 start-100' :
            pad.keyTrigger === 'A' ? 'top-50 start-0' :
            pad.keyTrigger === 'S' ? 'top-50 start-50' :
            pad.keyTrigger === 'D' ? 'top-50 start-100' :
            pad.keyTrigger === 'Z' ? 'top-100 start-0' :
            pad.keyTrigger === 'X' ? 'top-100 start-50' :
            pad.keyTrigger === 'C' ? 'top-100 start-100' :
            ''
        }`}
        value={pad.keyTrigger}
      >
        {pad.keyTrigger}
        <audio src={pad.url} className='clip' id={pad.keyTrigger} />
      </button>
    ));

    return (
      <div className='py-4 text-white' id='buttons'>
        <div className="container text-center position-relative">
          {mapped}
        </div>
      </div>
    );
  }
}

export default DrumPad;
