<details>
<summary>⚡ Clique ici pour voir le code script.js</summary>
````javascript
const PROGRAM = {
  dimanche: { title: "Dos + Jambes", exercises: [
    { name: "Trap Bar Deadlift", sets: 4, reps: "6-8", rest: 150, weight: 75 },
    { name: "Leg Press", sets: 3, reps: 10, rest: 90, weight: 110 },
    { name: "Lat Pulldown", sets: 3, reps: 10, rest: 90, weight: 60 }
  ]},
  mardi: { title: "Pecs + Épaules", exercises: [
    { name: "Dumbbell Press", sets: 4, reps: 10, rest: 120, weight: 22 },
    { name: "Lateral Raises", sets: 3, reps: 15, rest: 60, weight: 8 },
    { name: "Face Pull", sets: 4, reps: 15, rest: 60, weight: 20 }
  ]},
  vendredi: { title: "Dos + Bras", exercises: [
    { name: "Landmine Row", sets: 4, reps: 10, rest: 120, weight: 55 },
    { name: "Leg Curl", sets: 3, reps: 12, rest: 75, weight: 40 },
    { name: "EZ Bar Curl", sets: 3, reps: 12, rest: 60, weight: 20 }
  ]}
};
let state = { week: 1, current: null };
function init() {
document.getElementById('week').textContent = state.week;
document.getElementById('block').textContent = getBlock(state.week);
const container = document.getElementById('sessions');
container.innerHTML = '';
Object.keys(PROGRAM).forEach(key => {
const btn = document.createElement('button');
btn.textContent = PROGRAM[key].title;
btn.onclick = () => openSession(key);
container.appendChild(btn);
});
}
function getBlock(w) {
if (w <= 5) return "Fondation (B1)";
if (w <= 11) return "Surcharge (B2)";
return "Intensification (B3)";
}
function openSession(key) {
state.current = key;
document.getElementById('home').classList.remove('active');
document.getElementById('session').classList.add('active');
const session = PROGRAM[key];
document.getElementById('title').textContent = session.title;
const container = document.getElementById('exercises');
container.innerHTML = '';
session.exercises.forEach((ex, i) => {
const div = document.createElement('div');
div.className = 'exercise';
div.innerHTML =       <h3>${ex.name}</h3>       <p>${ex.sets}×${ex.reps} • ${ex.weight}kg • ${ex.rest}s repos</p>       ${Array.from({length: ex.sets}, (_, s) =>
<div>
<input type="number" placeholder="kg" value="${ex.weight}">
<input type="number" placeholder="reps">
<input type="checkbox" onchange="startTimer(${ex.rest})"> Série ${s+1}
</div>
).join('')}     ;
container.appendChild(div);
});
}
function startTimer(duration) {
const timer = document.getElementById('timer');
timer.classList.add('visible');
let time = duration;
const interval = setInterval(() => {
const min = Math.floor(time / 60);
const sec = time % 60;
timer.textContent = ${min}:${sec.toString().padStart(2, '0')};
if (time <= 0) {
  clearInterval(interval);
  timer.classList.remove('visible');
}
time--;
}, 1000);
}
document.getElementById('back').onclick = () => {
document.getElementById('session').classList.remove('active');
document.getElementById('home').classList.add('active');
};
document.getElementById('next').onclick = () => {
if (state.week < 26) state.week++;
init();
};
document.getElementById('prev').onclick = () => {
if (state.week > 1) state.week--;
init();
};
init();
</details>
