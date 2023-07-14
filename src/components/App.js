import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Controls from './Controls.js'
import DrumPad from './DrumPad.js';
import '../styles/App.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      volume: 50, // Initial volume level
    };
  }

  

  
  
  handleVolumeChange = (event) => {
    const volume = parseFloat(event.target.value);
    this.setState({ volume });
  };

  render() {
    return (
      <div className='App'>
        <header>
          <h1 className='text-center'>Drum Machine</h1>
        </header>
        <div id='drum-machine' className='rounded mt-3 d-inline-flex position-relative'>
        <DrumPad />
          <Controls handleVolumeChange={this.handleVolumeChange} volume={this.state.volume}/>
        </div>        
      </div>
    );
  }
}

export default App;
