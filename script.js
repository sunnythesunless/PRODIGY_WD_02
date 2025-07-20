let startTime, elapsedTime = 0, intervalId;
let isRunning = false;
let laps = [];

const timeDisplay = document.querySelector('.time-display');
const startBtn = document.querySelector('.start-btn');
const stopBtn = document.querySelector('.stop-btn');
const resetBtn = document.querySelector('.reset-btn');
const lapBtn = document.querySelector('.lap-btn');
const lapsContainer = document.getElementById('laps');

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000));
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}

function updateTime() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    timeDisplay.textContent = formatTime(elapsedTime);
}

function startStopwatch() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime, 10);
        isRunning = true;
        startBtn.disabled = true;
        stopBtn.disabled = false;
        resetBtn.disabled = false;
        lapBtn.disabled = false;
    }
}

function stopStopwatch() {
    if (isRunning) {
        clearInterval(intervalId);
        isRunning = false;
        startBtn.disabled = false;
        stopBtn.disabled = true;
    }
}

function resetStopwatch() {
    clearInterval(intervalId);
    isRunning = false;
    elapsedTime = 0;
    timeDisplay.textContent = '00:00:00.000';
    startBtn.disabled = false;
    stopBtn.disabled = true;
    resetBtn.disabled = true;
    lapBtn.disabled = true;
    laps = [];
    lapsContainer.innerHTML = '';
}

function recordLap() {
    if (isRunning) {
        laps.push(elapsedTime);
        const lapTime = formatTime(elapsedTime);
        const lapNumber = laps.length;
        const lapElement = document.createElement('div');
        lapElement.className = 'lap-item';
        lapElement.innerHTML = `<span>Lap ${lapNumber}</span><span>${lapTime}</span>`;
        lapsContainer.prepend(lapElement);
    }
}

// Keyboard accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 's') startStopwatch();
    if (e.key === 't') stopStopwatch();
    if (e.key === 'r') resetStopwatch();
    if (e.key === 'l') recordLap();
});