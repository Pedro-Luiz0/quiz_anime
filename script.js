// ============ AniQuiz - vanilla JS ============
const questions = [
  {q:"Em Naruto, qual é o sonho de Naruto Uzumaki?",
   options:["Tornar-se um Sannin","Tornar-se Hokage","Tornar-se ANBU","Tornar-se Jinchūriki perfeito"],
   answer:1, bg:"images/q1.jpg"},
  {q:"Em One Piece, qual é o nome do navio que os Chapéus de Palha utilizam após a destruição do Going Merry?",
   options:["Red Force","Thousand Sunny","Oro Jackson","Polar Tang"],
   answer:1, bg:"images/q1.jpg"},
  {q:"Em Demon Slayer, qual é o nome da irmã de Tanjiro?",
   options:["Kanao","Shinobu","Nezuko","Mitsuri"],
   answer:2, bg:"images/q1.jpg"},
  {q:"Em Hunter x Hunter, a afinidade nen de Killua Zoldyck é:",
   options:["Emissão","Manipulação","Transmutação","Materialização"],
   answer:2, bg:"images/q2.webp"},
  {q:"Em Jujutsu Kaisen, qual é o nome da expansão de domínio de Satoru Gojo?",
   options:["Malevolent Shrine","Unlimited Void","Self-Embodiment of Perfection","Chimera Shadow Garden"],
   answer:1, bg:"images/q2.webp"},
  {q:"Em Dr. Stone, qual foi o primeiro grande produto científico produzido em massa pelo Reino da Ciência para ganhar apoio da população da vila?",
   options:["Antibiótico de Sulfa","Eletricidade","Vidro","Ramen"],
   answer:3, bg:"images/q2.webp"},
  {q:"Em Solo Leveling, qual foi a primeira sombra de rank elevado extraída por Sung Jin-Woo?",
   options:["Beru","Tank","Iron","Igris"],
   answer:3, bg:"images/q3.jpg"},
  {q:"Em Cyberpunk: Edgerunners, qual era o modelo do implante militar instalado em David Martinez no início da série?",
   options:["Militech Falcon","Sandevistan","Berserk MK.5","Kerenzikov"],
   answer:1, bg:"images/q3.jpg"},
  {q:"Em Re:Zero, além do trauma psicológico direto, qual é uma consequência indireta que Subaru enfrenta ao usar repetidamente \"Return by Death\", que afeta seu relacionamento com outros personagens?",
   options:["Ele começa a perder a capacidade de confiar em seus aliados, pois sabe demais sobre o futuro","Ele fica fisicamente debilitado, envelhecendo a cada retorno","Ele inadvertidamente altera eventos críticos, criando loops temporais que afetam apenas os outros","Ele perde a habilidade de usar magia ou habilidades espirituais"],
   answer:0, bg:"images/q3.jpg"},
  {q:"Em JoJo's Bizarre Adventure: Stone Ocean, \"Made in Heaven\" acelera o tempo universal. Qual é o detalhe mais sutil, mas crucial, sobre como o stand permite que Pucci alcance um \"novo universo\"?",
   options:["O tempo é acelerado de forma absoluta para todos os seres, mas Pucci percebe o tempo normalmente graças ao seu stand","Apenas os seres humanos estão sujeitos à aceleração; seres sobrenaturais não","A aceleração cria múltiplos universos paralelos, mas Pucci só pode controlar um deles","Pucci precisa de um catalisador especial, o \"Green Baby\", para sincronizar o novo universo"],
   answer:3, bg:"images/q4.jpg"},
];

let currentIndex = 0;
let score = 0;
let locked = false;

const screens = document.querySelectorAll('.screen');
function showScreen(name){
  screens.forEach(s=>s.classList.toggle('active', s.dataset.screen===name));
}

// LOGIN
document.getElementById('login-form').addEventListener('submit', e=>{
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const pass = document.getElementById('password').value.trim();
  if(!email || !pass) return;
  const name = email.split('@')[0] || 'Otaku';
  document.getElementById('intro-text').textContent =
    `${name}, são 10 perguntas. Boa sorte!`;
  showScreen('intro');
});

// INTRO
document.getElementById('start-btn').addEventListener('click', ()=>{
  currentIndex = 0; score = 0;
  renderQuestion();
  showScreen('quiz');
});

// QUIZ
const ringFill = document.getElementById('ring-fill');
const ringLabel = document.getElementById('ring-label');
const C = 2 * Math.PI * 72; // 452.39

function renderQuestion(){
  locked = false;
  const q = questions[currentIndex];
  document.getElementById('quiz-bg').src = q.bg;
  document.getElementById('step').textContent = `Pergunta ${currentIndex+1} de ${questions.length}`;
  document.getElementById('question-title').textContent = `${currentIndex+1}. ${q.q}`;
  const pct = Math.round(((currentIndex+1)/questions.length)*100);
  ringFill.style.strokeDashoffset = C - (pct/100)*C;
  ringLabel.textContent = pct + '%';

  const optsEl = document.getElementById('options');
  optsEl.innerHTML = '';
  const letters = ['A','B','C','D'];
  q.options.forEach((opt, i)=>{
    const b = document.createElement('button');
    b.className = 'option';
    b.type = 'button';
    b.textContent = `${letters[i]}) ${opt}`;
    b.addEventListener('click', ()=>selectOption(i, b));
    optsEl.appendChild(b);
  });
}

function selectOption(i, btnEl){
  if(locked) return;
  locked = true;
  const q = questions[currentIndex];
  const all = document.querySelectorAll('.option');
  all.forEach((b,idx)=>{
    b.disabled = true;
    if(idx === q.answer) b.classList.add('correct');
    else if(idx === i) b.classList.add('wrong');
  });
  if(i === q.answer) score++;
  setTimeout(()=>{
    currentIndex++;
    if(currentIndex >= questions.length) showResult();
    else renderQuestion();
  }, 1000);
}

// RESULT
function showResult(){
  document.getElementById('result-sub').textContent =
    `Você acertou ${score} ${score===1?'questão':'questões'}`;
  const right = score, total = questions.length;
  const pctR = Math.round((right/total)*100);
  const pctW = 100 - pctR;
  document.getElementById('pct-right').textContent = pctR + '%';
  document.getElementById('pct-wrong').textContent = pctW + '%';
  drawPie(pctR);
  showScreen('result');
}

function drawPie(pctRight){
  const svg = document.getElementById('pie');
  svg.innerHTML = '';
  const cx=100, cy=100, r=90;
  if(pctRight <= 0){
    svg.innerHTML = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#a78bfa"/>`;
    return;
  }
  if(pctRight >= 100){
    svg.innerHTML = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#f5a85a"/>`;
    return;
  }
  const angle = (pctRight/100)*2*Math.PI;
  const x = cx + r*Math.sin(angle);
  const y = cy - r*Math.cos(angle);
  const large = pctRight > 50 ? 1 : 0;
  // wrong slice (purple) - full circle behind
  svg.innerHTML =
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#a78bfa"/>` +
    `<path d="M ${cx} ${cy} L ${cx} ${cy-r} A ${r} ${r} 0 ${large} 1 ${x} ${y} Z" fill="#f5a85a"/>`;
  // labels
  svg.innerHTML +=
    `<text x="135" y="60" font-size="12" fill="#fff" font-weight="700">Acertos ${pctRight}%</text>` +
    `<text x="20" y="160" font-size="12" fill="#fff" font-weight="700">Erros ${100-pctRight}%</text>`;
}

document.getElementById('restart-btn').addEventListener('click', ()=>{
  currentIndex=0; score=0;
  showScreen('intro');
});

let url = 'http://localhost:3000/rota2';

let resp = await fetch(url)

let dados = await resp.json()

alert(dados.msg)

console.log(dados)
