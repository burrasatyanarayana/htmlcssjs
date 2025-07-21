let startTime, interval;
console.log(interval)
let isRunning = false;
let lapCount = 0;
let participants = [];
let laps = [];

const display = document.getElementById('display');

const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');
const addBtn = document.getElementById('add');
const nameInput = document.getElementById('name');
const participantList = document.getElementById('participant-list');
const lapsDiv = document.getElementById('laps');

function formatTime(ms) {
  let date = new Date(ms);
  let min = String(date.getUTCMinutes()).padStart(2, '0');
  let sec = String(date.getUTCSeconds()).padStart(2, '0');
  let msStr = String(date.getUTCMilliseconds()).padStart(3, '0').slice(0, 2);
  console.log()
  return `${min}:${sec}:${msStr}`;
}

function updateTime() {
  let elapsed = Date.now() - startTime;
  display.textContent = formatTime(elapsed);
}

startBtn.onclick = () => {
  if (!isRunning) {
    startTime = Date.now() - lapCount;
    interval = setInterval(updateTime, 10);
    isRunning = true;
    addBtn.disabled = true;
  }
};

stopBtn.onclick = () => {
  if (isRunning) {
    clearInterval(interval);
    isRunning = false;
    lapCount = Date.now() - startTime;
    addBtn.disabled = false;
  }
};

resetBtn.onclick = () => {
  clearInterval(interval);
  isRunning = false;
  lapCount = 0;
  display.textContent = '00:00:00';
  lapsDiv.innerHTML = '';
  participants = [];
  laps = [];
  participantList.innerHTML = '';
  addBtn.disabled = false;
};

addBtn.onclick = () => {
  const name = nameInput.value.trim();
  if (!name || participants.includes(name)) return;

  participants.push(name);

  const tr = document.createElement('tr');
  const index = participants.length;

  tr.innerHTML = `
    <td>${index}</td>
    <td>${name}</td>
    <td><button onclick="recordLap('${name}', this)">Lap</button></td>
  `;
  participantList.appendChild(tr);
  nameInput.value = '';
};

window.recordLap = function (name, btn) {
  if (!isRunning || laps.find(lap => lap.name === name)) return;

  const time = display.textContent;
  laps.push({ name, time });

  const pos = laps.length;
  const div = document.createElement('div');
  div.className = 'lap-time';
  div.innerText = `${pos}. ${name} - ${time}`;
  lapsDiv.appendChild(div);

  btn.disabled = true;

};
