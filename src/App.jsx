import React, { useRef, useState, useEffect, useCallback } from 'react';

// --- Icon Component (Placeholder for Lucide React) ---
// This component renders SVG icons. In a real project, you would typically install
// a library like 'lucide-react' (npm install lucide-react) and import icons directly.
// For this environment, inline SVGs are used to simulate the icons.
const Icon = ({ name, className, ariaLabel }) => {
  const icons = {
    Mic: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>,
    Video: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"/><path d="m10 12.5 8.5 5.5V7l-8.5 5.5z"/></svg>,
    VideoOff: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2l4-4 2 2h3.5M10 10l-2 2"/><line x1="2" x2="22" y1="2" y2="22"/></svg>,
    Play: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="5 3 19 12 5 21 5 3"/></svg>,
    StopCircle: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><rect width="6" height="6" x="9" y="9"/></svg>,
    RotateCcw: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.76 2.75L3 8"/><path d="M3 3v5h5"/></svg>,
    Save: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>,
    Lightbulb: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 6c0 1.8.7 3.3 1.5 4.5 1 .8 1.5 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 14v8"/></svg>,
    TrendingUp: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
    BookOpen: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
    MessageSquareText: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><line x1="9" x2="15" y1="10" y2="10"/><line x1="9" x2="13" y1="14" y2="14"/></svg>,
    Target: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
    Briefcase: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
    Zap: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    Presentation: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h20"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7"/><path d="M12 12V3"/><path d="M12 12l-4 4"/><path d="M12 12l4 4"/></svg>,
    Feather: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" x2="2" y1="8" y2="22"/><line x1="17.5" x2="6.5" y1="6.5" y2="17.5"/></svg>,
    Edit: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
    Calendar: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>,
    Clock: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    User: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    Settings: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.04.04a2 2 0 0 1 0 2.83l-.04.04a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.04-.04a2 2 0 0 1 0-2.83l.04-.04a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>,
    X: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>,
    Award: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 22 12 18 17 22 15.79 13.88"/></svg>,
    Gauge: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 14 4-4"/><path d="M3.34 19.16a14 14 0 0 1 17.32 0"/><path d="M2.26 13.8a18 18 0 0 1 20.48 0"/><path d="M12 2v20"/></svg>,
    Star: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
  };
  return <span role="img" aria-label={ariaLabel}>{icons[name]}</span>;
};


// --- Mock Data ---
// This data simulates responses from AI analysis and charting libraries.
const mockTranscript = `
  Hello everyone, and welcome to the Confident Speaker Studio.
  Uh, today we're going to talk about the importance of clear communication.
  Um, it's really vital, you know, in all aspects of life.
  From professional settings to personal relationships, effective communication, like, builds bridges.
  It helps us, uh, convey our ideas clearly and, um, avoid misunderstandings.
  So, mastering this skill is super important for personal and professional growth.
`;

const mockPacingData = [
  { time: 0, wpm: 120 }, { time: 5, wpm: 135 }, { time: 10, wpm: 150 },
  { time: 15, wpm: 140 }, { time: 20, wpm: 160 }, { time: 25, wpm: 130 }
];

// --- Pacing Graph Component ---
// This component renders a mock pacing graph using SVG.
// In a production app, you might use a charting library like Chart.js or D3.js
// for more interactive and robust visualizations.
const PacingGraph = ({ data }) => {
  if (!data || data.length === 0) return <p className="text-gray-500 text-center py-4">No pacing data available yet.</p>;

  const maxWPM = Math.max(...data.map(d => d.wpm)) * 1.1; // 10% buffer for max WPM
  const minWPM = Math.min(...data.map(d => d.wpm)) * 0.9; // 10% buffer for min WPM
  const height = 150; // Fixed height for the SVG canvas
  const width = 300;  // Fixed width for the SVG canvas

  // Generates SVG path points for the line graph based on data
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((d.wpm - minWPM) / (maxWPM - minWPM)) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="flex flex-col items-center">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto bg-white rounded-lg shadow-inner border border-gray-200">
        {/* Conceptual Ideal pacing range (120-150 WPM) */}
        <rect
          x="0"
          y={height - ((150 - minWPM) / (maxWPM - minWPM)) * height}
          width={width}
          height={((150 - 120) / (maxWPM - minWPM)) * height}
          fill="#D1FAE5" // Light green for ideal range background
        />
        {/* Lines for ideal pacing boundaries */}
        <line x1="0" y1={height - ((120 - minWPM) / (maxWPM - minWPM)) * height} x2={width} y2={height - ((120 - minWPM) / (maxWPM - minWPM)) * height} stroke="#10B981" strokeDasharray="4 2" strokeWidth="1" />
        <line x1="0" y1={height - ((150 - minWPM) / (maxWPM - minWPM)) * height} x2={width} y2={height - ((150 - minWPM) / (maxWPM - minWPM)) * height} stroke="#10B981" strokeDasharray="4 2" strokeWidth="1" />

        {/* The actual pacing data line */}
        <polyline
          fill="none"
          stroke="#4F46E5" // Indigo-600
          strokeWidth="3"
          points={points}
        />
        {/* Y-axis labels (min/max WPM) */}
        <text x="5" y="15" fontSize="10" fill="#4B5563">{Math.round(maxWPM)} WPM</text>
        <text x="5" y={height - 5} fontSize="10" fill="#4B5563">{Math.round(minWPM)} WPM</text>
        {/* X-axis labels (start/end time) */}
        <text x="5" y={height - 5} fontSize="10" fill="#4B5563">{data[0].time}s</text>
        <text x={width - 25} y={height - 5} fontSize="10" fill="#4B5563">{data[data.length - 1].time}s</text>
      </svg>
      <p className="text-sm text-gray-600 mt-2">Pacing over time (Words Per Minute)</p>
    </div>
  );
};


// --- Main App Component ---
const App = () => {
  // --- Refs for DOM elements and Media Streams ---
  const videoRef = useRef(null); // Reference to the <video> element for live camera feed
  const recordedVideoRef = useRef(null); // Reference to the <video> element for recorded playback
  const mediaRecorderRef = useRef(null); // Reference to the MediaRecorder instance
  const recordedChunks = useRef([]); // Stores video data chunks during recording
  const notesRef = useRef(null); // Reference to the notes textarea
  const currentStream = useRef(null); // Holds the active MediaStream (audio and/or video)

  // --- State Variables ---
  const [isRecording, setIsRecording] = useState(false); // True when recording is active
  const [hasRecording, setHasRecording] = useState(false); // True if a recording has been made
  const [currentNotes, setCurrentNotes] = useState(''); // Stores user's notes
  const [feedback, setFeedback] = useState({ // Stores AI feedback data
    overall: 'AI feedback will appear here after recording.',
    pacing: null,
    fillerWords: null,
    tone: null,
    suggestions: [],
    transcript: ''
  });
  const [message, setMessage] = useState(''); // Displays user messages (e.g., success, error)
  const [isFeedbackLoading, setIsFeedbackLoading] = useState(false); // True when AI feedback is being processed
  const [isCameraOn, setIsCameraOn] = useState(false); // Tracks if camera is actively streaming video (default: OFF)
  const [micLevel, setMicLevel] = useState(0); // Current microphone input level (0-100)
  const [recordingTime, setRecordingTime] = useState(0); // Elapsed time during recording (in seconds)
  const [countdown, setCountdown] = useState(0); // Countdown before recording starts
  const [selectedPracticeMode, setSelectedPracticeMode] = useState('General Practice'); // Current practice scenario
  const [practicePrompt, setPracticePrompt] = useState('Speak on any topic you like. Focus on clarity and confidence.'); // Prompt for the current practice mode
  const [activeFeedbackTab, setActiveFeedbackTab] = useState('summary'); // Currently active tab in AI feedback section
  const [showRealTimeTip, setShowRealTimeTip] = useState(false); // Controls visibility of real-time tips during recording

  // --- Media Stream Acquisition Function ---
  // This function requests access to user's media devices (camera and/or microphone).
  // It handles stopping previous streams and setting up mic level visualization.
  const getMedia = useCallback(async (videoEnabled = true) => {
    // Stop all tracks from the previous stream if it exists to release hardware
    if (currentStream.current) {
      currentStream.current.getTracks().forEach(track => track.stop());
      currentStream.current = null; // Clear the stream reference
    }
    try {
      // Request media stream based on videoEnabled flag
      const stream = await navigator.mediaDevices.getUserMedia({ video: videoEnabled, audio: true });
      currentStream.current = stream; // Store the new stream reference
      if (videoRef.current) {
        videoRef.current.srcObject = stream; // Assign stream to video element
      }
      setMessage(""); // Clear any previous error messages
      setIsCameraOn(videoEnabled); // Update camera state based on what was requested

      // Setup AudioContext for microphone level visualization
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      microphone.connect(analyser);
      analyser.fftSize = 256; // Fast Fourier Transform size
      const dataArray = new Uint8Array(analyser.frequencyBinCount); // Array to hold frequency data

      // Function to periodically update mic level
      const updateMicLevel = () => {
        analyser.getByteFrequencyData(dataArray); // Get frequency data
        const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
        setMicLevel(Math.min(100, Math.round(average * 0.8))); // Scale average to 0-100
      };

      // Set up interval to update mic level
      const micInterval = setInterval(updateMicLevel, 100); // Update every 100ms
      // Return a cleanup function for the interval to be called on unmount or new stream request
      return () => clearInterval(micInterval);
    } catch (err) {
      console.error("Error accessing media devices: ", err);
      setMessage("Error: Could not access webcam/microphone. Please ensure permissions are granted in your browser settings.");
      setIsCameraOn(false); // Indicate camera is off due to error or user denial
      currentStream.current = null; // Clear stream on error
    }
  }, []); // useCallback dependency array: empty, as it doesn't depend on external state that changes

  // --- Initial Media Stream Request (on component mount) ---
  // This useEffect runs once on component mount to initialize media access.
  // It requests audio only by default to keep the camera light off initially.
  useEffect(() => {
    // Call getMedia with videoEnabled: false to start with camera off (audio only)
    // This requests microphone access but not camera, so the camera light should remain off.
    const cleanupMic = getMedia(false); // Store the cleanup function returned by getMedia
    return () => {
      // Cleanup function for component unmount
      if (currentStream.current) {
        currentStream.current.getTracks().forEach(track => track.stop()); // Stop all tracks
      }
      if (cleanupMic) cleanupMic(); // Clean up mic level interval
    };
  }, [getMedia]); // Dependency on getMedia ensures it's called correctly

  // --- Recording Timer Effect ---
  // Manages the recording duration timer and real-time tip visibility.
  useEffect(() => {
    let timer;
    if (isRecording) {
      timer = setInterval(() => setRecordingTime(prev => prev + 1), 1000); // Increment timer every second
      setShowRealTimeTip(true); // Display real-time tips
    } else {
      clearInterval(timer); // Stop timer when not recording
      setShowRealTimeTip(false); // Hide tips
    }
    return () => clearInterval(timer); // Cleanup timer on effect re-run or unmount
  }, [isRecording]); // Effect runs when isRecording state changes

  // --- Toggle Camera Function ---
  // Controls turning the camera on/off explicitly.
  const toggleCamera = () => {
    if (isRecording) {
      setMessage("Cannot toggle camera while recording. Please stop recording first.");
      return;
    }
    // Call getMedia to either turn camera on (true) or off (false)
    // getMedia handles stopping existing tracks and requesting new ones,
    // which correctly controls the camera light.
    getMedia(!isCameraOn);
  };

  // --- Start Recording Function ---
  // Initiates the recording process, including a countdown.
  const startRecording = async () => {
    // Reset states for a new recording
    setMessage('');
    recordedChunks.current = [];
    setHasRecording(false);
    setFeedback({
      overall: 'AI feedback will appear here after recording.',
      pacing: null,
      fillerWords: null,
      tone: null,
      suggestions: [],
      transcript: ''
    });
    setIsFeedbackLoading(false);
    setRecordingTime(0); // Reset recording timer

    let streamToRecord = currentStream.current; // Get the currently active stream

    // If camera is currently off, but user wants to record video, try to turn it on
    if (!isCameraOn) {
        setMessage("Attempting to turn on camera to start recording...");
        await getMedia(true); // Request stream with video enabled
        streamToRecord = currentStream.current; // Update stream reference after acquisition
        // Check if video track was successfully obtained
        if (!streamToRecord || !streamToRecord.getVideoTracks().length) {
            setMessage("Failed to turn on camera. Cannot record video without camera access.");
            return;
        }
    }

    // Final check for active streams before starting MediaRecorder
    if (!streamToRecord || (!streamToRecord.getVideoTracks().length && !streamToRecord.getAudioTracks().length)) {
        setMessage("No active camera or microphone. Please enable at least one to record.");
        return;
    }

    // Ensure video tracks are present and enabled if recording video (and camera was intended to be on)
    const videoTracks = streamToRecord.getVideoTracks();
    if (isCameraOn && videoTracks.length === 0) { // isCameraOn here means we *intended* for it to be on
        setMessage("Camera stream not active. Please ensure camera permissions are granted.");
        return;
    }

    // Start 3-second countdown before actual recording begins
    setCountdown(3);
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev === 1) {
          clearInterval(countdownInterval); // Stop countdown
          // --- Actual MediaRecorder Setup & Start ---
          mediaRecorderRef.current = new MediaRecorder(streamToRecord, { mimeType: 'video/webm' });

          // Event listener for when video data chunks are available
          mediaRecorderRef.current.ondataavailable = (event) => {
            if (event.data.size > 0) {
              recordedChunks.current.push(event.data);
            }
          };

          // Event listener for when recording stops
          mediaRecorderRef.current.onstop = () => {
            const blob = new Blob(recordedChunks.current, { type: 'video/webm' });
            const url = URL.createObjectURL(blob); // Create URL for the recorded video blob
            if (recordedVideoRef.current) {
              recordedVideoRef.current.src = url; // Set recorded video source
              recordedVideoRef.current.controls = true; // Show playback controls
            }
            setHasRecording(true); // Indicate that a recording is available
            setMessage("Recording stopped. Your video is ready for playback and analysis.");
            setIsFeedbackLoading(true); // Start AI feedback loading indicator

            // Simulate AI feedback generation with a delay
            setTimeout(() => {
              setFeedback({
                overall: "Excellent effort! Your delivery was clear and engaging. Focus on varying your vocal tone to maintain audience interest.",
                pacing: "145 WPM (Good)",
                fillerWords: "3 (Low)",
                tone: "Confident (85%)",
                suggestions: [
                  "Try incorporating more vocal variety to emphasize key points.",
                  "Practice pausing strategically for impact.",
                  "Review your speech for any repetitive phrases."
                ],
                transcript: mockTranscript
              });
              setIsFeedbackLoading(false); // Stop loading indicator
            }, 2500); // 2.5 seconds delay for mock analysis
          };

          mediaRecorderRef.current.start(); // Start the MediaRecorder
          setIsRecording(true); // Update recording state
          setMessage("Recording started! Speak clearly and confidently. Click 'Stop Recording' when done.");
          return 0; // Reset countdown display
        }
        return prev - 1; // Decrement countdown
      });
    }, 1000); // Countdown interval (1 second)

  };

  // --- Stop Recording Function ---
  // Stops the active recording.
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop(); // Stop the MediaRecorder
      setIsRecording(false); // Update recording state
      setCountdown(0); // Clear any active countdown
    }
  };

  // --- Play Recorded Video Function ---
  // Plays the recorded video in the playback element.
  const playRecording = () => {
    if (recordedVideoRef.current && hasRecording) {
      recordedVideoRef.current.play(); // Play the video
      setMessage("Playing back your recording. Pay attention to your delivery!");
    } else {
      setMessage("No recording available to play. Start a new session!");
    }
  };

  // --- Reset Session Function (with Confirmation) ---
  // Clears current recording, notes, and AI feedback.
  const resetRecording = () => {
    // Confirmation dialog to prevent accidental data loss
    if (window.confirm("Are you sure you want to reset? This will clear your current recording and notes.")) {
      stopRecording(); // Ensure recording is stopped
      recordedChunks.current = []; // Clear recorded video data
      setHasRecording(false); // Reset recording presence
      if (recordedVideoRef.current) {
        recordedVideoRef.current.src = ''; // Clear video source from playback element
        recordedVideoRef.current.controls = false; // Hide controls
      }
      setCurrentNotes(''); // Clear notes
      setFeedback({ // Reset AI feedback to initial state
        overall: 'AI feedback will appear here after recording.',
        pacing: null,
        fillerWords: null,
        tone: null,
        suggestions: [],
        transcript: ''
      });
      setMessage("Session cleared. Ready for your next confident speech!");
      setIsFeedbackLoading(false); // Stop any loading indication
      setCountdown(0); // Clear countdown
      setActiveFeedbackTab('summary'); // Reset active feedback tab
      setRecordingTime(0); // Reset recording timer display

      // Turn camera off after reset for a fresh start, if it was on
      if (isCameraOn) {
        getMedia(false); // Request audio-only stream to turn off camera light
      }
    }
  };

  // --- Handle Notes Change ---
  // Updates the currentNotes state as the user types.
  const handleNotesChange = (e) => {
    setCurrentNotes(e.target.value);
  };

  // --- Save Notes Function (Mock) ---
  // In a real application, this would send notes to a backend for persistent storage.
  const saveNotes = () => {
    setMessage("Notes saved! (In a real application, these would be securely stored.)");
    console.log("Notes saved:", currentNotes);
  };

  // --- Handle Practice Mode Selection ---
  // Updates the selected practice mode and its corresponding prompt.
  const handlePracticeModeSelect = (mode, prompt) => {
    setSelectedPracticeMode(mode);
    setPracticePrompt(prompt);
    setMessage(`Practice mode set to: "${mode}".`);
  };

  // --- Jump to Timestamp in Video Function (Mock for Interactive Transcript) ---
  // Simulates jumping to a specific point in the recorded video based on word index.
  const jumpToTimestamp = (wordIndex) => {
    if (recordedVideoRef.current && hasRecording) {
      // Mock timestamp: assume each word is roughly 0.5 seconds for demo purposes
      const mockTime = wordIndex * 0.5;
      recordedVideoRef.current.currentTime = mockTime; // Set video current time
      recordedVideoRef.current.play(); // Play video from that point
      setMessage(`Jumped to ${mockTime.toFixed(1)}s in recording.`);
    } else {
      setMessage("Please record and play back a session first to use the interactive transcript.");
    }
  };

  // --- Main Render Function ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center p-4 sm:p-8 font-sans antialiased text-gray-800">
      {/* Tailwind CSS CDN and Google Fonts Link */}
      {/* In a local React project, these would typically be handled by your build process (e.g., in index.html and index.css) */}
 


      {/* --- Header Section --- */}
      <header role="banner" className="w-full max-w-6xl flex flex-col sm:flex-row justify-between items-center py-4 px-6 bg-white rounded-xl shadow-lg mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4 sm:mb-0">
          <span className="text-blue-700">Confident Speaker</span> Studio
        </h1>
        <nav role="navigation" className="flex flex-wrap justify-center sm:justify-end items-center space-x-2 sm:space-x-4">
          <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200" aria-label="View My Sessions">
            <Icon name="BookOpen" className="w-5 h-5 mr-2" ariaLabel="Book icon" /> My Sessions
          </button>
          <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200" aria-label="Set and track your goals">
            <Icon name="Target" className="w-5 h-5 mr-2" ariaLabel="Target icon" /> Goals
          </button>
          <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200" aria-label="Manage your profile">
            <Icon name="User" className="w-5 h-5 mr-2" ariaLabel="User icon" /> Profile
          </button>
          <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200" aria-label="Access application settings">
            <Icon name="Settings" className="w-5 h-5 mr-2" ariaLabel="Settings icon" /> Settings
          </button>
        </nav>
      </header>

      {/* --- Global Message Alert --- */}
      {message && (
        <div className="bg-blue-100 border border-blue-400 text-blue-800 px-6 py-4 rounded-xl mb-6 w-full max-w-6xl text-center shadow-md animate-fade-in-down flex items-center justify-between" role="alert">
          <p className="font-medium text-lg">{message}</p>
          <button onClick={() => setMessage('')} className="ml-4 text-blue-600 hover:text-blue-800 transition-colors" aria-label="Dismiss message">
            <Icon name="X" className="w-5 h-5" ariaLabel="Close icon" />
          </button>
        </div>
      )}

      {/* --- Main Content Area --- */}
      <main className="w-full max-w-6xl bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-10 border border-gray-200 grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* --- Left Panel: Video & Controls --- */}
        <section className="lg:col-span-2 flex flex-col">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3 border-gray-200">Your Practice Session</h2>

          <div className="flex flex-col md:flex-row gap-6 mb-6">
            {/* Live Camera Feed Section */}
            <div className="flex flex-col items-center flex-1 bg-gray-50 p-5 rounded-xl shadow-inner border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Icon name="Video" className="w-6 h-6 mr-2 text-blue-600" ariaLabel="Live video feed icon" /> Live Camera
              </h3>
              <div className={`relative w-full aspect-video rounded-lg border-2 ${isRecording ? 'border-red-500 recording-border' : 'border-blue-300'} bg-gray-300 shadow-md overflow-hidden`}>
                <video ref={videoRef} autoPlay muted className="w-full h-full object-cover"></video>
                {/* Countdown overlay */}
                {countdown > 0 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 text-white text-8xl font-bold">
                    {countdown}
                  </div>
                )}
                {/* Camera Off overlay */}
                {!isCameraOn && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-white text-center text-lg">
                    Camera Off
                  </div>
                )}
                {/* Real-time tip overlay */}
                {isRecording && showRealTimeTip && (
                  <div className="absolute top-4 left-4 bg-blue-100 text-blue-800 p-3 rounded-lg text-sm animate-fade-in-down shadow-md">
                    Tip: {selectedPracticeMode === 'Presentation Mode' ? 'Pause after key points for emphasis.' : 'Maintain a steady pace.'}
                    <button onClick={() => setShowRealTimeTip(false)} className="ml-2 text-blue-600 hover:text-blue-800" aria-label="Dismiss tip">
                      <Icon name="X" className="w-4 h-4" ariaLabel="Close tip icon" />
                    </button>
                  </div>
                )}
              </div>
              {/* Microphone Level Indicator */}
              <div className="w-full mt-4">
                <div className="flex items-center mb-2">
                  <Icon name="Mic" className="w-5 h-5 mr-2 text-gray-800" ariaLabel="Microphone icon" />
                  <span className="text-sm text-gray-800">Mic Level:</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-green-500 h-2.5 rounded-full mic-level-bar"
                    style={{ width: `${micLevel}%` }}
                  ></div>
                </div>
              </div>
              {/* Recording Timer Display */}
              {isRecording && (
                <p className="text-base text-gray-800 mt-2 font-semibold">
                  Recording: {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, '0')}
                </p>
              )}
              {/* Control Buttons for Live Camera */}
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                <div className="tooltip-container">
                  <button
                    onClick={startRecording}
                    disabled={isRecording || !currentStream.current || countdown > 0}
                    className={`flex items-center px-7 py-3 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg
                      ${isRecording || !currentStream.current || countdown > 0
                        ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                      }`}
                    aria-label={isRecording ? "Recording in progress" : "Start recording your speech"}
                  >
                    <Icon name="Video" className="w-6 h-6 mr-2" ariaLabel="Video camera icon" />
                    {isRecording ? 'Recording...' : 'Start Recording'}
                  </button>
                  <span className="tooltip-text">Start recording your speech</span>
                </div>
                <div className="tooltip-container">
                  <button
                    onClick={stopRecording}
                    disabled={!isRecording}
                    className={`flex items-center px-7 py-3 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg
                      ${!isRecording
                        ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                        : 'bg-red-600 hover:bg-red-700 text-white'
                      }`}
                    aria-label="Stop recording"
                  >
                    <Icon name="StopCircle" className="w-6 h-6 mr-2" ariaLabel="Stop icon" />
                    Stop Recording
                  </button>
                  <span className="tooltip-text">Stop the current recording</span>
                </div>
                <div className="tooltip-container">
                  <button
                    onClick={toggleCamera}
                    disabled={isRecording}
                    className={`flex items-center px-7 py-3 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg
                      ${isRecording
                        ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                        : (isCameraOn ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-500 hover:bg-blue-600') + ' text-white'
                      }`}
                    aria-label={isCameraOn ? "Turn camera off" : "Turn camera on"}
                  >
                    <Icon name={isCameraOn ? "VideoOff" : "Video"} className="w-6 h-6 mr-2" ariaLabel={isCameraOn ? "Video off icon" : "Video on icon"} />
                    {isCameraOn ? 'Turn Camera Off' : 'Turn Camera On'}
                  </button>
                  <span className="tooltip-text">{isCameraOn ? 'Turn off your webcam' : 'Turn on your webcam'}</span>
                </div>
              </div>
            </div>

            {/* Recorded Video Playback Section */}
            <div className="flex flex-col items-center flex-1 bg-gray-50 p-5 rounded-xl shadow-inner border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Icon name="Play" className="w-6 h-6 mr-2 text-purple-600" ariaLabel="Play icon" /> Your Recording
              </h3>
              <div className="relative w-full aspect-video rounded-lg border-2 border-purple-300 bg-gray-300 shadow-md overflow-hidden">
                <video ref={recordedVideoRef} className="w-full h-full object-cover"></video>
                {/* Overlay when no recording is present */}
                {!hasRecording && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 text-white text-center text-lg p-4">
                        <Icon name="Video" className="w-12 h-12 mb-4 text-gray-400" ariaLabel="Video icon" />
                        <p>Record a session to see playback here.</p>
                    </div>
                )}
              </div>
              {/* Control Buttons for Playback */}
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                <div className="tooltip-container">
                  <button
                    onClick={playRecording}
                    disabled={!hasRecording}
                    className={`flex items-center px-7 py-3 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg
                      ${!hasRecording
                        ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    aria-label="Play recorded video"
                  >
                    <Icon name="Play" className="w-6 h-6 mr-2" ariaLabel="Play icon" />
                    Play Recording
                  </button>
                  <span className="tooltip-text">Play back your recorded speech</span>
                </div>
                <div className="tooltip-container">
                  <button
                    onClick={resetRecording}
                    className="flex items-center px-7 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full font-bold text-lg shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
                    aria-label="Reset current session"
                  >
                    <Icon name="RotateCcw" className="w-6 h-6 mr-2" ariaLabel="Reset icon" />
                    Reset Session
                  </button>
                  <span className="tooltip-text">Clear current recording and notes</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Middle Panel: Practice Mode & Notes --- */}
        <section className="lg:col-span-1 flex flex-col space-y-8">
          {/* Current Practice Mode & Prompt Display */}
          <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 flex-1">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <Icon name="BookOpen" className="w-6 h-6 mr-2 text-teal-600" ariaLabel="Open book icon" /> Current Practice
            </h3>
            <p className="text-xl font-bold text-blue-700 mb-2">{selectedPracticeMode}</p>
            <p className="text-gray-800 italic">{practicePrompt}</p>
          </div>

          {/* Notes & Self-Reflection Section */}
          <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 flex-1 flex flex-col">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <Icon name="MessageSquareText" className="w-6 h-6 mr-2 text-purple-600" ariaLabel="Message icon" /> Your Notes & Self-Reflection
            </h3>
            <textarea
              ref={notesRef}
              value={currentNotes}
              onChange={handleNotesChange}
              placeholder="Jot down your thoughts here. What went well? What could be improved? (e.g., 'At 0:45, I used a filler word.')"
              rows="10"
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none text-lg resize-y shadow-sm flex-1 text-gray-800"
              aria-label="Your notes and self-reflection"
            ></textarea>
            <button
              onClick={saveNotes}
              className="mt-5 px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-bold text-lg shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center"
              aria-label="Save your notes"
            >
              <Icon name="Save" className="w-6 h-6 mr-2" ariaLabel="Save icon" />
              Save Notes
            </button>
          </div>
        </section>

        {/* --- Right Panel: AI Feedback & Analysis --- */}
        <section className="lg:col-span-1 flex flex-col space-y-8">
          <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 flex-1 flex flex-col">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <Icon name="Lightbulb" className="w-6 h-6 mr-2 text-yellow-600" ariaLabel="Lightbulb icon" /> AI Feedback & Analysis
            </h3>
            {/* Tabbed Navigation for Feedback */}
            <div className="flex border-b border-gray-200 mb-4" role="tablist">
              <button
                className={`flex-1 py-2 text-center text-lg transition-colors duration-200 tab-button ${activeFeedbackTab === 'summary' ? 'active' : 'text-gray-700 hover:text-blue-600'}`}
                onClick={() => setActiveFeedbackTab('summary')}
                role="tab"
                aria-selected={activeFeedbackTab === 'summary'}
                aria-controls="summary-panel"
                tabIndex={activeFeedbackTab === 'summary' ? 0 : -1}
              >
                Summary
              </button>
              <button
                className={`flex-1 py-2 text-center text-lg transition-colors duration-200 tab-button ${activeFeedbackTab === 'transcript' ? 'active' : 'text-gray-700 hover:text-blue-600'}`}
                onClick={() => setActiveFeedbackTab('transcript')}
                role="tab"
                aria-selected={activeFeedbackTab === 'transcript'}
                aria-controls="transcript-panel"
                tabIndex={activeFeedbackTab === 'transcript' ? 0 : -1}
              >
                Transcript
              </button>
              <button
                className={`flex-1 py-2 text-center text-lg transition-colors duration-200 tab-button ${activeFeedbackTab === 'pacing' ? 'active' : 'text-gray-700 hover:text-blue-600'}`}
                onClick={() => setActiveFeedbackTab('pacing')}
                role="tab"
                aria-selected={activeFeedbackTab === 'pacing'}
                aria-controls="pacing-panel"
                tabIndex={activeFeedbackTab === 'pacing' ? 0 : -1}
              >
                Pacing
              </button>
            </div>

            {/* AI Feedback Content Area */}
            <div className="bg-blue-50 p-5 rounded-lg border border-blue-200 text-blue-800 text-lg flex-1 overflow-auto" role="tabpanel" id="feedback-panel">
              {isFeedbackLoading ? (
                // Loading spinner for AI analysis
                <div className="flex items-center justify-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mr-3" aria-hidden="true"></div>
                  <p className="font-medium">Analyzing your speech... Please wait.</p>
                </div>
              ) : (
                <>
                  {!hasRecording ? (
                    // Empty state when no recording is available
                    <div className="text-center py-6 text-gray-800">
                      <Icon name="Lightbulb" className="w-12 h-12 mx-auto text-gray-400 mb-2" ariaLabel="Lightbulb icon" />
                      <p className="mt-2">Record a session to receive AI feedback.</p>
                    </div>
                  ) : (
                    <>
                      {/* Summary Tab Content */}
                      {activeFeedbackTab === 'summary' && (
                        <div id="summary-panel" role="tabpanel">
                          <p className="font-bold mb-3 text-blue-900">{feedback.overall}</p>
                          {/* Feedback metrics displayed as cards */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <div className="bg-blue-100 p-3 rounded-lg shadow-sm">
                              <p className="text-base text-blue-700 font-semibold">Pacing</p>
                              <p className="text-xl font-bold text-blue-900">{feedback.pacing || 'N/A'}</p>
                            </div>
                            <div className="bg-yellow-100 p-3 rounded-lg shadow-sm">
                              <p className="text-base text-yellow-700 font-semibold">Filler Words</p>
                              <p className="text-xl font-bold text-yellow-900">{feedback.fillerWords || 'N/A'}</p>
                            </div>
                            <div className="bg-green-100 p-3 rounded-lg shadow-sm">
                              <p className="text-base text-green-700 font-semibold">Tone</p>
                              <p className="text-xl font-bold text-green-900">{feedback.tone || 'N/A'}</p>
                            </div>
                          </div>
                          {/* AI Suggestions */}
                          {feedback.suggestions.length > 0 && (
                            <>
                              <p className="font-bold mt-4 mb-2 text-blue-900">Suggestions:</p>
                              <ul className="list-disc list-inside space-y-1">
                                {feedback.suggestions.map((sug, index) => (
                                  <li key={index}>{sug}</li>
                                ))}
                              </ul>
                            </>
                          )}
                        </div>
                      )}
                      {/* Transcript Tab Content */}
                      {activeFeedbackTab === 'transcript' && (
                        <div id="transcript-panel" role="tabpanel">
                          <p className="font-bold mb-2 text-blue-900">Full Transcript:</p>
                          <div className="bg-white p-3 rounded-md border border-gray-200 text-gray-800 text-base max-h-60 overflow-y-auto">
                            {/* Mock highlighting for filler words and clickable words */}
                            {feedback.transcript.split(/(\b(?:um|uh|like|you know)\b|\s+)/gi).map((part, index) => (
                              /^(um|uh|like|you know)$/i.test(part) ? (
                                <span
                                  key={index}
                                  className="bg-yellow-200 rounded px-1 font-semibold cursor-pointer hover:bg-yellow-300 transition-colors"
                                  onClick={() => jumpToTimestamp(index)}
                                  role="button"
                                  tabIndex={0}
                                  aria-label={`Jump to ${part} in video`}
                                >
                                  {part}
                                </span>
                              ) : (
                                <span
                                  key={index}
                                  className="cursor-pointer hover:underline transition-colors"
                                  onClick={() => jumpToTimestamp(index)}
                                  role="button"
                                  tabIndex={0}
                                  aria-label={`Jump to ${part} in video`}
                                >
                                  {part}
                                </span>
                              )
                            ))}
                            {!feedback.transcript && <p className="text-gray-500 italic">Transcript will appear here after recording.</p>}
                          </div>
                          <p className="mt-2 text-sm text-blue-600 italic">
                            (Click on words to jump to that point in the video for review.)
                          </p>
                        </div>
                      )}
                      {/* Pacing Tab Content */}
                      {activeFeedbackTab === 'pacing' && (
                        <div id="pacing-panel" role="tabpanel">
                          <p className="font-bold mb-2 text-blue-900">Pacing Over Time:</p>
                          <PacingGraph data={mockPacingData} />
                          <p className="mt-2 text-sm text-blue-600 italic">
                            (Ideal pacing is typically 120-150 WPM for most speeches.)
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* --- Practice Scenarios & Topics Section --- */}
      <section className="w-full max-w-6xl bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200 mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3 border-gray-200">Practice Scenarios & Topics</h2>
        <p className="text-gray-800 text-lg mb-6">
          Select a structured scenario to practice, or create your own custom topic.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <button
            onClick={() => handlePracticeModeSelect('Interview Practice', 'Imagine you are interviewing for your dream job. Answer: "Tell me about yourself."')}
            className={`px-6 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center ${selectedPracticeMode === 'Interview Practice' ? 'bg-indigo-700 ring-2 ring-indigo-300 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
            aria-label="Select interview practice mode"
          >
            <Icon name="Briefcase" className="w-6 h-6 mr-2" ariaLabel="Briefcase icon" />
            Interview Practice
          </button>
          <button
            onClick={() => handlePracticeModeSelect('Impromptu Speaking', 'Speak for 2 minutes on "The Importance of Adaptability in the Modern World."')}
            className={`px-6 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center ${selectedPracticeMode === 'Impromptu Speaking' ? 'bg-indigo-700 ring-2 ring-indigo-300 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
            aria-label="Select impromptu speaking mode"
          >
            <Icon name="Zap" className="w-6 h-6 mr-2" ariaLabel="Zap icon" />
            Impromptu Speaking
          </button>
          <button
            onClick={() => handlePracticeModeSelect('Presentation Mode', 'Imagine you are presenting a new project idea to stakeholders. Focus on clarity and persuasion.')}
            className={`px-6 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center ${selectedPracticeMode === 'Presentation Mode' ? 'bg-indigo-700 ring-2 ring-indigo-300 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
            aria-label="Select presentation mode"
          >
            <Icon name="Presentation" className="w-6 h-6 mr-2" ariaLabel="Presentation icon" />
            Presentation Mode
          </button>
          <button
            onClick={() => handlePracticeModeSelect('Storytelling', 'Tell a short story about a time you overcame a challenge.')}
            className={`px-6 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center ${selectedPracticeMode === 'Storytelling' ? 'bg-indigo-700 ring-2 ring-indigo-300 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
            aria-label="Select storytelling mode"
          >
            <Icon name="Feather" className="w-6 h-6 mr-2" ariaLabel="Feather icon" />
            Storytelling
          </button>
          <div className="md:col-span-2 lg:col-span-3 xl:col-span-4 flex flex-col sm:flex-row gap-4 mt-4">
            <input
              type="text"
              placeholder="Enter your custom practice topic (e.g., 'Pitching a new idea')..."
              className="flex-grow p-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none text-lg shadow-sm text-gray-800"
              onChange={(e) => setPracticePrompt(e.target.value)}
              value={selectedPracticeMode === 'General Practice' ? '' : practicePrompt} // Clear placeholder on custom input
              aria-label="Custom practice topic input"
            />
            <button
              onClick={() => handlePracticeModeSelect('Custom Topic', practicePrompt || 'Custom Topic')}
              className="px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold text-lg shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center"
              aria-label="Start custom practice session"
            >
              <Icon name="Edit" className="w-6 h-6 mr-2" ariaLabel="Edit icon" />
              Start Custom Practice
            </button>
          </div>
        </div>
      </section>

      {/* --- Conceptual Progress Overview Section --- */}
      <section className="w-full max-w-6xl bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200 mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3 border-gray-200 flex items-center">
          <Icon name="TrendingUp" className="w-7 h-7 mr-3 text-green-600" ariaLabel="Trending up icon" /> Your Progress Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-green-50 p-5 rounded-lg shadow-sm border border-green-200">
            <p className="text-5xl font-extrabold text-green-700">75%</p>
            <p className="text-lg font-semibold text-gray-800 mt-2">Filler Word Reduction</p>
            {/* Conceptual badge */}
            <span className="inline-flex items-center mt-3 px-3 py-1 bg-green-200 text-green-800 text-sm font-medium rounded-full">
              <Icon name="Award" className="w-4 h-4 mr-1" ariaLabel="Award icon" /> {/* Placeholder for Award icon */}
              Master of Brevity
            </span>
          </div>
          <div className="bg-yellow-50 p-5 rounded-lg shadow-sm border border-yellow-200">
            <p className="text-5xl font-extrabold text-yellow-700">150</p>
            <p className="text-lg font-semibold text-gray-800 mt-2">Avg. WPM (Pacing)</p>
            {/* Conceptual badge */}
            <span className="inline-flex items-center mt-3 px-3 py-1 bg-yellow-200 text-yellow-800 text-sm font-medium rounded-full">
              <Icon name="Gauge" className="w-4 h-4 mr-1" ariaLabel="Gauge icon" /> {/* Placeholder for Gauge icon */}
              Pacing Pro
            </span>
          </div>
          <div className="bg-blue-50 p-5 rounded-lg shadow-sm border border-blue-200">
            <p className="text-5xl font-extrabold text-blue-700">8/10</p>
            <p className="text-lg font-semibold text-gray-800 mt-2">Overall Confidence Score</p>
            {/* Conceptual badge */}
            <span className="inline-flex items-center mt-3 px-3 py-1 bg-blue-200 text-blue-800 text-sm font-medium rounded-full">
              <Icon name="Star" className="w-4 h-4 mr-1" ariaLabel="Star icon" /> {/* Placeholder for Star icon */}
              Confident Speaker
            </span>
          </div>
        </div>
        <p className="mt-8 text-center text-gray-800 italic">
          (This section would dynamically update with your actual progress over time, tracking key metrics
          and showing your improvement journey as a confident speaker.)
        </p>
      </section>

      {/* --- Conceptual My Past Sessions Section --- */}
      <section className="w-full max-w-6xl bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3 border-gray-200 flex items-center">
          <Icon name="BookOpen" className="w-7 h-7 mr-3 text-blue-600" ariaLabel="Open book icon" /> My Past Sessions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Mock Session Card 1 */}
          <div className="bg-gray-50 p-5 rounded-lg shadow-sm border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer" tabIndex={0} role="button" aria-label="Review Interview Practice session">
            <h4 className="text-xl font-semibold text-gray-800 mb-2">Interview Practice - Round 1</h4>
            <p className="text-gray-800 text-sm mb-3 flex items-center"><Icon name="Calendar" className="w-4 h-4 mr-1" ariaLabel="Calendar icon" /> July 24, 2025 <Icon name="Clock" className="w-4 h-4 ml-3 mr-1" ariaLabel="Clock icon" /> 10:30 AM</p>
            <p className="text-gray-800 mb-4">Focus: "Tell me about yourself."</p>
            <div className="flex justify-between items-center text-sm text-gray-800">
              <span>Filler Words: <span className="font-semibold text-red-600">High (7)</span></span>
              <span>Pacing: <span className="font-semibold text-yellow-600">Fast (170 WPM)</span></span>
            </div>
            <button className="mt-4 w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-semibold transition-colors duration-200" aria-label="Review this session">
              Review Session
            </button>
          </div>
          {/* Mock Session Card 2 */}
          <div className="bg-gray-50 p-5 rounded-lg shadow-sm border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer" tabIndex={0} role="button" aria-label="Review Presentation Project Alpha session">
            <h4 className="text-xl font-semibold text-gray-800 mb-2">Presentation - Project Alpha</h4>
            <p className="text-gray-800 text-sm mb-3 flex items-center"><Icon name="Calendar" className="w-4 h-4 mr-1" ariaLabel="Calendar icon" /> July 23, 2025 <Icon name="Clock" className="w-4 h-4 ml-3 mr-1" ariaLabel="Clock icon" /> 03:00 PM</p>
            <p className="text-gray-800 mb-4">Focus: Clarity & Persuasion</p>
            <div className="flex justify-between items-center text-sm text-gray-800">
              <span>Filler Words: <span className="font-semibold text-green-600">Low (2)</span></span>
              <span>Pacing: <span className="font-semibold text-green-600">Good (130 WPM)</span></span>
            </div>
            <button className="mt-4 w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-semibold transition-colors duration-200" aria-label="Review this session">
              Review Session
            </button>
          </div>
          {/* Mock Session Card 3 */}
          <div className="bg-gray-50 p-5 rounded-lg shadow-sm border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer" tabIndex={0} role="button" aria-label="Review Impromptu Adaptability session">
            <h4 className="text-xl font-semibold text-gray-800 mb-2">Impromptu - Adaptability</h4>
            <p className="text-gray-800 text-sm mb-3 flex items-center"><Icon name="Calendar" className="w-4 h-4 mr-1" ariaLabel="Calendar icon" /> July 22, 2025 <Icon name="Clock" className="w-4 h-4 ml-3 mr-1" ariaLabel="Clock icon" /> 09:00 AM</p>
            <p className="text-gray-800 mb-4">Focus: Quick Thinking</p>
            <div className="flex justify-between items-center text-sm text-gray-800">
              <span>Filler Words: <span className="font-semibold text-yellow-600">Medium (5)</span></span>
              <span>Pacing: <span className="font-semibold text-green-600">Good (140 WPM)</span></span>
            </div>
            <button className="mt-4 w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-semibold transition-colors duration-200" aria-label="Review this session">
              Review Session
            </button>
          </div>
        </div>
        <p className="mt-8 text-center text-gray-800 italic">
          (This section would list all your saved practice sessions, allowing you to easily revisit and track your progress over time.)
        </p>
      </section>
    </div>
  );
};

export default App;
