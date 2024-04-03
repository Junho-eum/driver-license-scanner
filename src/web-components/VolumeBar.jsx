import React from "react";
import VolumeIndicator from "./volumeJS/VolumeIndicator";
import UseVolumeLevel from "./volumeJS/UseVolumeLevel";

export default function VolumeBar() {

    const [startRecording, volume] = UseVolumeLevel();
        return (
        <div>
            <VolumeIndicator backgroundColor="#321199" indicatorColor="#989876" volume={volume} />
            <button onClick={startRecording} id="test" style={{backgroundColor: '#2ECC71', padding: 10, margin: 10}}>
            Record
            </button>
        </div>
        );
}
