(function () {
  const style = document.createElement('style');
  style.textContent = `
    .hamster {
      position: fixed;
      z-index: 2147483647;
      font-size: 2rem;
      background: none;
      border: none;
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);

  function spawnHamster() {
    const hamster = document.createElement('button');
    hamster.className = 'hamster';
    hamster.textContent = '🐹';
    hamster.style.top = `${Math.random() * 90}vh`;
    hamster.style.left = `${Math.random() * 90}vw`;

    const despawn = setTimeout(() => hamster.remove(), 1000);

    hamster.addEventListener('click', () => {
      clearTimeout(despawn);
      hamster.remove();
      chrome.storage.local.get('score', ({ score = 0 }) => {
        chrome.storage.local.set({ score: score + 1 });
      });
    });

    document.body.appendChild(hamster);
  }

  chrome.runtime.onMessage.addListener((message) => {
    if (message.type === 'spawn-hamster') {
      spawnHamster();
    }
  });

  setInterval(spawnHamster, 1000 + Math.random() * 4000);
})();
