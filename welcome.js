// My goals navigates to the viewing glass; no modal interrupts the scene.
document.querySelector('#open-goals')?.addEventListener('click',()=>window.dispatchEvent(new Event('lab-goals-toggle')));

// Route the entrance CTA through the same guided-tour control as the door.
document.querySelector('#tour-start').addEventListener('click', () => {
  document.querySelector('#door-enter').click();
});
