just a javascript looper





Notes for better quality sound


```
<script src="path_to_lamejs.js"></script>
<script>
let audioContext, mediaStreamSource, scriptProcessorNode, mp3Encoder;

navigator.mediaDevices.getUserMedia({ audio: true })
.then(stream => {
    audioContext = new AudioContext();
    mediaStreamSource = audioContext.createMediaStreamSource(stream);
    scriptProcessorNode = audioContext.createScriptProcessor(4096, 1, 1);
    mediaStreamSource.connect(scriptProcessorNode);

    mp3Encoder = new lamejs.Mp3Encoder(1, 48000, 128); // 1 channel, 48000 Hz, 128 kbps

    scriptProcessorNode.onaudioprocess = function(audioProcessingEvent) {
        var inputBuffer = audioProcessingEvent.inputBuffer;
        var samples = inputBuffer.getChannelData(0); // Get mono channel
        var mp3buf = mp3Encoder.encodeBuffer(samples);
        if (mp3buf.length > 0) {
            // Process or save the mp3 buffer
        }
    };

    scriptProcessorNode.connect(audioContext.destination);
})
.catch(error => {
    console.error("Error accessing media devices.", error);
});
</script>
```



To download all tracks as one mp3


```

// Assuming you have three audio elements already loaded with files you want to mix and download
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const recorder = new Recorder(audioContext.destination);  // This will record all audio that's played in the context

function mixAndDownload() {
    const sources = [];

    // Connect each audio element source to the audio context
    Object.keys(audioElements).forEach(key => {
        const source = audioContext.createMediaElementSource(audioElements[key]);
        sources.push(source);
        source.connect(audioContext.destination);  // Connect source to destination, which is being recorded
    });

    // Start recording
    recorder.record();

    // Play all audio elements to start mixing
    playAllChannels();  // This function plays all audio as previously defined

    // Assume we stop mixing after a fixed duration or based on some user input
    setTimeout(() => {
        // Stop all sources
        sources.forEach(source => source.disconnect());

        // Stop recording
        recorder.stop();

        // Create the MP3
        recorder.exportMP3((mp3Blob) => {
            const url = URL.createObjectURL(mp3Blob);
            const downloadLink = document.createElement('a');
            downloadLink.href = url;
            downloadLink.download = 'mixedTrack.mp3';
            downloadLink.click();
            URL.revokeObjectURL(url);
        });
    }, 5000);  // Stop recording after 5 seconds
}


```
