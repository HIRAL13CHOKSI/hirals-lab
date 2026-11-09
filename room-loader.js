const frame = document.getElementById('room-frame');
const status = document.getElementById('render-status');

async function openRoom() {
  status.textContent = 'OPENING THE LAB';
  try {
    await import('./room.js?v=welcome-fit');
  } catch (error) {
    console.warn('Unable to open the 3D lab.', error);
  }

  if (!frame.classList.contains('room-ready') && status.textContent !== 'EXHIBITION OPEN · TAKE YOUR TIME') {
    status.textContent = 'PORTFOLIO MODE · PROJECTS BELOW';
  }
}

openRoom();
