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

let state = { week: 1, current: null, timerInterval: null };

function init() {
  document.getElementById('weekDisplay').textContent = state.week;
  document.getElementById('blockName').textContent = getBlock(state.week);

  const container = document.getElementById('progList');
  container.innerHTML = '';

  Object.keys(PROGRAM).forEach(key => {
    const card = document.createElement('div');
    card.className = 'prog-card card p-3';
    card.innerHTML = `
      <div class="font-bold">${PROGRAM[key].title}</div>
      <div class="muted small">${key}</div>
      <div class="mt-2 flex gap-2">
        <button class="btn btn-ghost open-session">Ouvrir</button>
      </div>
    `;
    card.querySelector('.open-session').addEventListener('click', () => openSession(key));
    container.appendChild(card);
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
  const titleEl = document.getElementById('sessionTitle');
  if (titleEl) titleEl.textContent = session.title;

  const container = document.getElementById('exerciseList');
  container.innerHTML = '';

  session.exercises.forEach((ex, i) => {
    const div = document.createElement('div');
    div.className = 'exercise card p-2';

    const setsHtml = Array.from({ length: ex.sets }, (_, s) => `
      <div class="flex gap-2 items-center mt-2">
        <input class="input w-24" type="number" placeholder="kg" value="${ex.weight}" data-set="${s}" />
        <input class="input w-20" type="number" placeholder="reps" />
        <label class="flex items-center gap-2">
          <input type="checkbox" class="start-timer" data-rest="${ex.rest}" /> Série ${s + 1}
        </label>
      </div>
    `).join('');

    div.innerHTML = `
      <div class="font-bold text-lg">${ex.name}</div>
      <div class="muted small">${ex.sets}×${ex.reps} • ${ex.weight}kg • ${ex.rest}s repos</div>
      ${setsHtml}
    `;

    // attach event listeners for checkboxes
    div.querySelectorAll('.start-timer').forEach(cb => {
      cb.addEventListener('change', (e) => {
        if (e.target.checked) startTimer(parseInt(e.target.getAttribute('data-rest'), 10));
      });
    });

    container.appendChild(div);
  });
}

function startTimer(duration) {
  clearInterval(state.timerInterval);
  const timerEl = document.getElementById('restTimer');
  const timerText = document.getElementById('timerText');
  if (!timerEl || !timerText) return;

  timerEl.classList.add('visible');
  let time = duration;
  timerText.textContent = formatTime(time);

  state.timerInterval = setInterval(() => {
    time--;
    if (time < 0) {
      clearInterval(state.timerInterval);
      state.timerInterval = null;
      timerEl.classList.remove('visible');
      return;
    }
    timerText.textContent = formatTime(time);
  }, 1000);
}

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

// UI bindings
const prevBtn = document.getElementById('prevWeek');
const nextBtn = document.getElementById('advanceWeek');
const backBtn = document.getElementById('backHomeBtn');
const skipTimerBtn = document.getElementById('skipTimerBtn');
const addExerciseBtn = document.getElementById('addExerciseBtn');

if (prevBtn) prevBtn.addEventListener('click', () => { if (state.week > 1) state.week--; init(); });
if (nextBtn) nextBtn.addEventListener('click', () => { if (state.week < 26) state.week++; init(); });
if (backBtn) backBtn.addEventListener('click', () => { document.getElementById('session').classList.remove('active'); document.getElementById('home').classList.add('active'); });
if (skipTimerBtn) skipTimerBtn.addEventListener('click', () => { clearInterval(state.timerInterval); state.timerInterval = null; document.getElementById('restTimer').classList.remove('visible'); });

if (addExerciseBtn) addExerciseBtn.addEventListener('click', () => {
  alert('Fonction "Ajouter" non implémentée dans cette version.');
});

// initialize
init();