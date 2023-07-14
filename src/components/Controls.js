import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/Controls.css'

class Controls extends React.Component {
    render() {
        return (
            <div className='display'>
                <label htmlFor="customRange2" className="form-label">
                Example range
                </label>
                <input
                    type="range"
                    className="form-range"
                    min="0"
                    max="100"
                    step="1"
                    value={this.props.volume}
                    onChange={this.props.handleVolumeChange}
                    id="customRange2"
                />
            </div>
        );
    }
}

export default Controls