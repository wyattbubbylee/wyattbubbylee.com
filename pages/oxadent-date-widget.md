---
date: 2025-02-08 1:00:00
title: oxadent
published: True
tags:
  - dst

---




<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Oxadent Widget</title>
  <style>
    body {
      background: #1a1a1a;
      color: limegreen;
      font-family: monospace;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2rem;
    }

    #oxadent-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      perspective: 1000px;
    }

    .planet-wrapper {
      position: relative;
      width: 150px;
      height: 150px;
      margin-bottom: 1rem;
      transform-style: preserve-3d;
      z-index: 1;
    }

    .spinning-planet {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: url('https://upload.wikimedia.org/wikipedia/commons/4/4f/Earth_Eastern_Hemisphere.jpg') center/cover no-repeat;
      animation: spinX 4s linear infinite, spinY 2s linear infinite;
      box-shadow: 0 0 40px rgba(50, 255, 50, 0.4);
      overflow: hidden;
    }

    .planet-night-shade,
    .planet-light-mask,
    .planet-stars,
    .planet-sun {
      position: absolute;
      top: 0; left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      pointer-events: none;
      z-index: 2;
      transition: transform 0.5s linear;
    }

    .planet-night-shade {
      background: radial-gradient(circle at center, transparent 40%, rgba(0, 0, 0, 0.6) 100%);
      z-index: 3;
    }

    .planet-light-mask {
      background: radial-gradient(circle at center, rgba(255, 255, 255, 0.2) 10%, transparent 50%);
      mix-blend-mode: screen;
      z-index: 2;
    }

    .planet-stars {
      background: url('https://upload.wikimedia.org/wikipedia/commons/e/e7/Starsinthesky.jpg') center/cover;
      opacity: 0;
      z-index: 1;
      transition: opacity 0.5s ease-in-out;
      mix-blend-mode: lighten;
    }

    .planet-sun {
      width: 20px;
      height: 20px;
      margin: auto;
      background: radial-gradient(circle, yellow, orange);
      border-radius: 50%;
      transform: rotate(0deg) translateY(-80px) rotate(0deg);
      z-index: 4;
      mix-blend-mode: screen;
    }

    .clock-overlay {
      position: absolute;
      bottom: 5px;
      left: 0;
      right: 0;
      text-align: center;
      font-size: 1.2rem;
      color: #00ff88;
      background-color: rgba(0, 0, 0, 0.4);
      padding: 2px 0;
      border-radius: 0 0 50% 50%;
      z-index: 5;
    }

    .rings {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 220px;
      height: 80px;
      margin-top: -40px;
      margin-left: -110px;
      border: 2px solid rgba(0,255,0,0.4);
      border-radius: 50%;
      transform: rotateX(75deg);
      animation: spinRings 10s linear infinite;
      pointer-events: none;
      z-index: 0;
    }

    .moon {
      position: absolute;
      top: -30px;
      left: 50%;
      width: 25px;
      height: 25px;
      margin-left: -12.5px;
      background: radial-gradient(circle at 30% 30%, #ccc, #333);
      border-radius: 50%;
      animation: orbitMoon 6s linear infinite;
      z-index: -1;
    }

    @keyframes spinX {
      0%   { transform: rotateX(0deg); }
      100% { transform: rotateX(360deg); }
    }

    @keyframes spinY {
      0%   { transform: rotateY(0deg); }
      100% { transform: rotateY(360deg); }
    }

    @keyframes spinRings {
      0%   { transform: rotateX(75deg) rotateZ(0deg); }
      100% { transform: rotateX(75deg) rotateZ(360deg); }
    }

    @keyframes orbitMoon {
      0%   { transform: rotateZ(0deg) translateX(50px) rotateZ(0deg); }
      100% { transform: rotateZ(360deg) translateX(50px) rotateZ(-360deg); }
    }

    #oxadent-date {
      font-size: 1.8rem;
      text-align: center;
      color: limegreen;
    }
  </style>
</head>
<body>

<h1>Oxadent</h1>

<div id="oxadent-container">
  <div class="planet-wrapper">
    <div class="spinning-planet" id="oxadent-planet">
      <div class="planet-light-mask" id="light-mask"></div>
      <div class="planet-night-shade" id="night-shade"></div>
      <div class="planet-stars" id="stars"></div>
      <div class="planet-sun" id="sun"></div>
      <div class="clock-overlay" id="oxadent-hour">Hour 00</div>
    </div>
    <div class="rings"></div>
    <div class="moon"></div>
  </div>
  <div id="oxadent-date"></div>
</div>

<script>
(function () {
    const MS_PER_OXADENT_HOUR = 5000; // 5 seconds per Oxadent hour
    const OXADENT_HOURS_PER_DAY = 30;
    const OXADENT_DAYS_PER_MONTH = 10;
    const OXADENT_MONTHS_PER_YEAR = 12;
    const OXADENT_DAYS_PER_YEAR = OXADENT_DAYS_PER_MONTH * OXADENT_MONTHS_PER_YEAR;

    const dayNames = [
        "Zenthday-1", "Zenthday-2", "Zenthday-3", "Zenthday-4", "Zenthday-5",
        "Zenthday-6", "Zenthday-7", "Zenthday-8", "Zenthday-9", "Zenthday-10"
    ];

    const oxadentEpoch = new Date(); // current time = day 1, year 1

    function getOxadentTime() {
        const now = new Date();
        const elapsedMs = now.getTime() - oxadentEpoch.getTime();
        const totalOxadentHours = elapsedMs / MS_PER_OXADENT_HOUR;
        const totalOxadentDays = Math.floor(totalOxadentHours / OXADENT_HOURS_PER_DAY);
        const currentHour = Math.floor(totalOxadentHours % OXADENT_HOURS_PER_DAY);

        const year = Math.floor(totalOxadentDays / OXADENT_DAYS_PER_YEAR) + 1;
        const month = Math.floor((totalOxadentDays % OXADENT_DAYS_PER_YEAR) / OXADENT_DAYS_PER_MONTH) + 1;
        const dayIndex = totalOxadentDays % OXADENT_DAYS_PER_MONTH;

        return {
            dateText: `${dayNames[dayIndex]}, Month ${month}, Year ${year} on Oxadent`,
            hour: currentHour
        };
    }

    function updateOxadentDisplay() {
        const time = getOxadentTime();
        const angle = (time.hour / 30) * 360;

        document.getElementById("oxadent-date").textContent = time.dateText;
        document.getElementById("oxadent-hour").textContent = `Hour ${String(time.hour).padStart(2, '0')}`;

        document.getElementById("night-shade").style.transform = `rotate(${angle}deg)`;
        document.getElementById("light-mask").style.transform = `rotate(${angle}deg)`;

        const sun = document.getElementById("sun");
        const sunAngle = (angle + 180) % 360;
        sun.style.transform = `rotate(${sunAngle}deg) translateY(-80px) rotate(-${sunAngle}deg)`;

        const stars = document.getElementById("stars");
        stars.style.opacity = (time.hour >= 20 || time.hour <= 5) ? 0.4 : 0;
    }

    updateOxadentDisplay();
    setInterval(updateOxadentDisplay, 1000); // update every second
})();
</script>

</body>
</html>






