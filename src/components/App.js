import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Controls from './Controls.js'
import DrumPad from './DrumPad.js';
import '../styles/App.css'
import sound from './sounds.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      volume: 50, // Initial volume level
      message: '',
      power:true,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleVolumeChange = this.handleVolumeChange.bind(this);
    this.display = this.display.bind(this);
    this.handlePower = this.handlePower.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  display(props){
    this.setState({
      message: props.name,
    });
    setTimeout(() =>{
      this.setState({
        message: "",
      })
    }, 2000)
  }
  
  handleKeyDown(event) {
    const keyTrigger = event.key.toUpperCase();
    const pad = sound.find((pad) => pad.keyTrigger === keyTrigger);
    if (pad && this.state.power) {
      this.playAudio(keyTrigger, pad);
    }
  };
  
  handleClick(keyTrigger) {
    const pad = sound.find((pad) => pad.keyTrigger === keyTrigger);
    if (pad  && this.state.power) {
      this.playAudio(keyTrigger, pad);
    }
  };
  
  playAudio(keyTrigger, pad) {
    const audioFile = document.getElementById(keyTrigger);
    if (audioFile) {
      audioFile.currentTime = 0;
      audioFile.volume = this.state.volume / 100;
      audioFile.play().catch((error) => {
        console.log('Playback error:', error);
      });
      this.display(pad);
    }
  }
  
 
  handleVolumeChange(props){
    this.setState({ volume: props });
  };

  handlePower(){
    if(this.state.power === true)
      this.setState({
        power: false
      });
    else
    this.setState({
      power: true
    })
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1 className="text-center">Drum Machine {!this.state.power && <span className='text-danger'>is OFF</span>}</h1>
        </header>
        <div 
          id="drum-machine" 
          className="rounded mt-3 d-inline-flex position-relative text-white"
        >
          <DrumPad 
            handleClick={this.handleClick} 
            handleKeyDown={this.handleKeyDown} 
          />
          <Controls
            volume={this.state.volume}
            handleVolumeChange={this.handleVolumeChange}
            message={this.state.message}
            handlePower={this.handlePower}
            power={this.state.power}
          />
        </div>
        
        <footer id='author' className='d-flex flex-column align-items-center justify-content-center mt-3'>
          Made by RTCriss
          <br />
          <a
            className="button"
            id="github-button"
            title="Author Github"
            target="_blank"
            rel="noopener noreferrer"
            href='https://github.com/CrissRT'
            style={{color: "black"}}
          >
            <i className="bi bi-github text-center" />
          </a>
          </footer>
      </div>
    );
  }
}

export default App;