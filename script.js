const words = [
  { term: "Curious", def: "Wanting to know or learn something.", example: "Children are curious about everything." },
  { term: "Grateful", def: "Feeling thankful.", example: "I am grateful for your help." },
  { term: "Improve", def: "To make or become better.", example: "Reading daily will improve your English." },
  { term: "Confident", def: "Feeling sure about yourself.", example: "She felt confident before the exam." },
  { term: "Journey", def: "Travelling from one place to another.", example: "The journey took five hours." },
  { term: "Brave", def: "Ready to face danger or pain.", example: "The brave firefighter saved the cat." },
  { term: "Patient", def: "Able to wait calmly.", example: "Be patient — learning takes time." },
  { term: "Explore", def: "To travel through a place to learn about it.", example: "We explored the old city." }
];

const quiz = [
  { q: "Choose the correct article: ___ umbrella", options: ["a", "an", "the", "no article"], answer: 1 },
  { q: "She ___ to school every day.", options: ["go", "going", "goes", "gone"], answer: 2 },
  { q: "What is the opposite of 'brave'?", options: ["Cowardly", "Strong", "Happy", "Curious"], answer: 0 },
  { q: "I ___ my homework yesterday.", options: ["do", "did", "does", "doing"], answer: 1 },
  { q: "Which word means 'feeling thankful'?", options: ["Patient", "Grateful", "Confident", "Curious"], answer: 1 }
];

// Word of the day: changes daily
const dayIndex = Math.floor(Date.now() / 86400000) % words.length;
const wod = words[dayIndex];
document.getElementById("wod-word").textContent = wod.term;
document.getElementById("wod-meaning").textContent = wod.def;
document.getElementById("wod-example").textContent = `"${wod.example}"`;

// Vocabulary flip cards
const grid = document.getElementById("vocab-grid");
words.forEach(w => {
  const card = document.createElement("div");
  card.className = "card flip";
  card.innerHTML = `<span class="term">${w.term}</span><span class="def">${w.def}<br><em>${w.example}</em></span>`;
  card.addEventListener("click", () => card.classList.toggle("open"));
  grid.appendChild(card);
});

// Quiz
let current = 0;
let score = 0;
const qEl = document.getElementById("quiz-question");
const optsEl = document.getElementById("quiz-options");
const fbEl = document.getElementById("quiz-feedback");
const progEl = document.getElementById("quiz-progress");
const nextBtn = document.getElementById("quiz-next");

function showQuestion() {
  const item = quiz[current];
  progEl.textContent = `Question ${current + 1} of ${quiz.length}`;
  qEl.textContent = item.q;
  fbEl.textContent = "";
  nextBtn.hidden = true;
  optsEl.innerHTML = "";
  item.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.addEventListener("click", () => choose(i, btn));
    optsEl.appendChild(btn);
  });
}

function choose(i, btn) {
  const item = quiz[current];
  const buttons = optsEl.querySelectorAll("button");
  buttons.forEach(b => (b.disabled = true));
  buttons[item.answer].classList.add("correct");
  if (i === item.answer) {
    score++;
    fbEl.textContent = "✅ Correct!";
    fbEl.style.color = "var(--good)";
  } else {
    btn.classList.add("wrong");
    fbEl.textContent = `❌ The answer is "${item.options[item.answer]}".`;
    fbEl.style.color = "var(--bad)";
  }
  nextBtn.textContent = current === quiz.length - 1 ? "See score" : "Next";
  nextBtn.hidden = false;
}

nextBtn.addEventListener("click", () => {
  if (current >= quiz.length) {
    current = 0;
    score = 0;
    showQuestion();
    return;
  }
  current++;
  if (current < quiz.length) {
    showQuestion();
  } else {
    progEl.textContent = "Finished!";
    qEl.textContent = `You scored ${score} out of ${quiz.length}.`;
    optsEl.innerHTML = "";
    fbEl.textContent = score === quiz.length ? "🎉 Perfect score!" : "Keep practising!";
    fbEl.style.color = "var(--primary)";
    nextBtn.textContent = "Try again";
  }
});

showQuestion();
document.getElementById("year").textContent = new Date().getFullYear();
