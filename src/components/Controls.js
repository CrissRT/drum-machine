import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/Controls.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Controls(props) {

    const [counter, setCounter] = React.useState(props.volume);
    const intervalRef = React.useRef(null);

    React.useEffect(() => {
        setCounter(props.volume);
    }, [props.volume]);

  const increaseVolume = () => {
    setCounter((prevCounter) => {
      const newCounter = prevCounter + 1;
      if (newCounter > 100) {
        stopCounter();
        props.handleVolumeChange(100);
        return 100;
      } else {
        props.handleVolumeChange(newCounter);
        return newCounter;
      }
    });
  };

  const decreaseVolume = () => {
    setCounter((prevCounter) => {
      const newCounter = prevCounter - 1;
      if (newCounter < 0) {
        stopCounter();
        props.handleVolumeChange(0);
        return 0;
      } else {
        props.handleVolumeChange(newCounter);
        return newCounter;
      }
    });
  };

    const startCounter = (button) => {
        if (intervalRef.current || (props.volume > 100 && props.volume < 0)) return;
        if(button === "button-volume-increase")
        {
            intervalRef.current = setInterval(increaseVolume, 50);
            increaseVolume(); // Call increaseVolume immediately when LMB is pressed
        }
        else if(button === "button-volume-decrease")
        {
            intervalRef.current = setInterval(decreaseVolume, 50);
            decreaseVolume(); // Call decreaseVolume immediately when LMB is pressed
        }
    };

    const stopCounter = () => {
        if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        }
    };

    React.useEffect(() => {
        return () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        };
    }, []);

    return (
        <div id="display">
            <div id="volume-display" className='text-center'>
                <div id='volume-text'>
                    Volume<br />
                    {counter}%
                </div>

                <div id="volume-buttons">
                    <i
                        className="bi bi-arrow-up-circle px-1"
                        onMouseDown={() => startCounter("button-volume-increase")}
                        onMouseUp={stopCounter}
                        onMouseLeave={stopCounter}
                        onTouchStart={() => startCounter("button-volume-increase")}
                        onTouchEnd={stopCounter}
                        onTouchCancel={stopCounter}
                    />
                    <i 
                        className="bi bi-arrow-down-circle px-1" 
                        onMouseDown={() => startCounter("button-volume-decrease")}
                        onMouseUp={stopCounter}
                        onMouseLeave={stopCounter}
                        onTouchStart={() => startCounter("button-volume-decrease")}
                        onTouchEnd={stopCounter}
                        onTouchCancel={stopCounter}
                    />
                </div>
            </div>

            <div id='text-wrapper'>
                <div id='text' className='text-white'>{props.message}</div>
            </div>

            <div id='power-wrapper'>
                <div id='power' className='d-flex' onClick={props.handlePower}>
                    <div className='power-button' style={props.power ? { backgroundColor: 'red' } : {backgroundColor:"black"}} />
                    <div className='power-button' style={props.power ? { backgroundColor: 'black' } : {backgroundColor:"red"}} />
                </div>
            </div>
        </div>
    );
}

export default Controls;
