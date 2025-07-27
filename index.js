const secondsHand = document.querySelector('.second-hand');
const minutesHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');

const toggleSeconds = document.getElementById('toggle-seconds');
const toggleMinutes = document.getElementById('toggle-minutes');
const toggleHours = document.getElementById('toggle-hours');

function setDate() {
  const now = new Date();
  const seconds = now.getSeconds();
  const milliseconds = now.getMilliseconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();

  const smoothSeconds = toggleSeconds.checked;
  const smoothMinutes = toggleMinutes.checked;
  const smoothHours = toggleHours.checked;

  // SEGUNDOS
  let secondsDegrees = ((seconds / 60) * 360) + 90;
  if (smoothSeconds) {
    secondsDegrees = (((seconds + milliseconds / 1000) / 60) * 360) + 90;
    secondsHand.style.transition = 'none';
  } else {
    secondsHand.style.transition = seconds === 0 ? 'none' : 'transform 0.05s cubic-bezier(0.1, 2.7, 0.58, 1)';
  }
  secondsHand.style.transform = `rotate(${secondsDegrees}deg)`;

  // MINUTOS
  let minutesDegrees = ((minutes / 60) * 360) + 90;
  if (smoothMinutes) {
    minutesDegrees = (((minutes + seconds / 60 + milliseconds / 60000) / 60) * 360) + 90;
    minutesHand.style.transition = 'none';
  } else {
    minutesHand.style.transition = (minutes === 0 && seconds === 0) ? 'none' : 'transform 0.05s cubic-bezier(0.1, 2.7, 0.58, 1)';
  }
  minutesHand.style.transform = `rotate(${minutesDegrees}deg)`;

  // HORAS
  let hourDegrees = ((hours % 12) / 12 * 360) + 90;
  if (smoothHours) {
    hourDegrees = (((hours % 12 + minutes / 60 + seconds / 3600) / 12) * 360) + 90;
    hourHand.style.transition = 'none';
  } else {
    hourHand.style.transition = (hours % 12 === 0 && minutes === 0 && seconds === 0)
      ? 'none'
      : 'transform 0.05s cubic-bezier(0.1, 2.7, 0.58, 1)';
  }
  hourHand.style.transform = `rotate(${hourDegrees}deg)`;

  requestAnimationFrame(setDate);
}

requestAnimationFrame(setDate);
