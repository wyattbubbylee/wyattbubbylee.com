(() => {
  const leafConfig = {
    quantity: 40,
    speedMin: 1,
    speedMax: 3,
    rotationSpeed: 2,
    spriteCount: 1,
    direction: 1,
    leafSize: 16,
    spritePath: 'https://dropper.wayl.one/api/file/69e92e87-8b15-4cd7-b714-f40a5116afc8.png',

    spriteExt: '.png',
    intensity: 0.5, // 0.0 to 1.0, multiplier for visibility
  };

  const style = document.createElement('style');
  style.textContent = `
    #leaf-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      overflow: hidden;
      z-index: 9999;
      opacity: ${leafConfig.intensity};
      transition: opacity 0.5s ease-in-out;
    }
    .leaf {
      position: absolute;
      width: ${leafConfig.leafSize}px;
      height: ${leafConfig.leafSize}px;
      will-change: transform;
      background-size: contain;
      background-repeat: no-repeat;
    }
  `;
  document.head.appendChild(style);

  const container = document.createElement('div');
  container.id = 'leaf-container';

  const bgSurface = document.querySelector('#bg-surface');
  if (bgSurface) {
    bgSurface.insertBefore(container, bgSurface.firstChild);
  } else {
    console.warn('No #bg-surface element found. Appending #leaf-container to body.');
    document.body.appendChild(container);
  }

  const leaves = [];

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function randomHSLFilter() {
    const brightness = random(90, 110);
    return `brightness(${brightness}%)`;
  }

  function createLeaf() {
    const leaf = document.createElement('div');
    leaf.className = 'leaf';
    leaf.style.backgroundImage = `url('${leafConfig.spritePath}')`;
    leaf.style.filter = randomHSLFilter();

    const x = random(-(window.innerWidth * 0.5), window.innerWidth);
    const y = random(0, window.innerHeight);
    const speed = random(leafConfig.speedMin, leafConfig.speedMax);
    const xDrift = random(-0.5, 1.2) * leafConfig.direction;
    const rot = random(0, 360);
    const rotSpeed = random(-leafConfig.rotationSpeed, leafConfig.rotationSpeed);

    leaf.style.left = `${x}px`;
    leaf.style.top = `${0}px`;

    container.appendChild(leaf);

    leaves.push({ el: leaf, x, y, speed, xDrift, rot, rotSpeed });
  }

  function animate() {
    for (const leaf of leaves) {
      leaf.y += leaf.speed;
      leaf.x += leaf.xDrift;
      leaf.rot += leaf.rotSpeed;

      const outOfBounds = (
        leaf.y > window.innerHeight + 40 ||
        leaf.x < -40 ||
        leaf.x > window.innerWidth + 40
      );

      if (outOfBounds) {
        leaf.y = -20;
        leaf.x = random(-(window.innerWidth * 0.5), window.innerWidth);
        leaf.speed = random(leafConfig.speedMin, leafConfig.speedMax);
        leaf.xDrift = random(-0.5, 1.2) * leafConfig.direction;
        leaf.rot = random(0, 360);
        leaf.rotSpeed = random(-leafConfig.rotationSpeed, leafConfig.rotationSpeed);
        leaf.el.style.filter = randomHSLFilter();
      }

      leaf.el.style.transform = `translate(${leaf.x}px, ${leaf.y}px) rotate(${leaf.rot}deg)`;
    }
    requestAnimationFrame(animate);
  }

  for (let i = 0; i < leafConfig.quantity; i++) {
    createLeaf();
  }

  animate();

  // Optional: allow external control of intensity
  window.setLeafIntensity = (value) => {
    leafConfig.intensity = Math.max(0, Math.min(1, value));
    container.style.opacity = leafConfig.intensity;
  };
})();


