import { useState, useEffect } from 'react';
import SoundMeter from './SoundMeter';



function handleSuccess(stream) {
  window.stream = stream;
  const soundMeter = window.soundMeter = new SoundMeter(window.audioContext);
  soundMeter.connectToSource(stream, function(e) {
    if (e) {
      alert(e);
      return;
    }
  });
}

function handleError(error) {
  console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
}


function useVolumeLevel() {

  const [level, setLevel] = useState(0);
  const [isRecording, setIsRecording] = useState(false)
  const [max, setMax] = useState(0)


  const startRecording = () => {
  const constraints = window.constraints = {
    audio: true,
    video: false
  };
  try {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    window.audioContext = new AudioContext();
  } catch (e) {
    alert('Web Audio API not supported.');
  }

  navigator.mediaDevices
      .getUserMedia(constraints)
      .then(handleSuccess)
      .catch(handleError);

  setIsRecording(true)
}


  const updateVolume = () => {
    if(window.soundMeter && isRecording){
    let v = window.soundMeter.instant * 200
    setLevel(Math.min(v, 100))
    setMax(Math.max(max, level))
    }
  } 


  useEffect(() => {
    let intervalId
      intervalId = setInterval(updateVolume, 50)


   return () => clearInterval(intervalId);
  });

  return [startRecording, level];
}

export default useVolumeLevel;