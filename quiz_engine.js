// AniQuiz — motor de quiz compartilhado
// Requer: questions.js carregado antes, e as variáveis PAGE_START, PAGE_END, NEXT_PAGE definidas na página

(function(){
  // Proteção de acesso
  if(!sessionStorage.getItem('aq_logged')){
    window.location.href = 'login.html'; return;
  }

  let pageIndex = 0; // índice dentro da página (0..PAGE_SIZE-1)
  let globalIndex = parseInt(sessionStorage.getItem('aq_index') || '0');
  let score = parseInt(sessionStorage.getItem('aq_score') || '0');
  let locked = false;

  const PAGE_SIZE = PAGE_END - PAGE_START; // questões nesta página
  const C = 2 * Math.PI * 72; // 452.39

  const ringFill  = document.getElementById('ring-fill');
  const ringLabel = document.getElementById('ring-label');

  function renderQuestion(){
    locked = false;
    const absIdx = PAGE_START + pageIndex;
    const q = QUESTIONS[absIdx];

    document.getElementById('quiz-bg').src = q.bg;
    document.getElementById('step').textContent =
      `Pergunta ${absIdx + 1} de ${TOTAL}`;
    document.getElementById('question-title').textContent =
      `${absIdx + 1}. ${q.q}`;

    // Ring (progresso global)
    const pct = Math.round(((absIdx + 1) / TOTAL) * 100);
    ringFill.style.strokeDashoffset = C - (pct / 100) * C;
    ringLabel.textContent = pct + '%';

    // Barra linear
    document.getElementById('bar-fill').style.width = pct + '%';
    document.getElementById('bar-label').textContent = `${absIdx + 1} / ${TOTAL} questões`;

    // Opções
    const optsEl = document.getElementById('options');
    optsEl.innerHTML = '';
    const letters = ['A','B','C','D'];
    q.options.forEach((opt, i) => {
      const b = document.createElement('button');
      b.className = 'option';
      b.type = 'button';
      b.innerHTML = `<span class="option-letter">${letters[i]}</span> ${opt}`;
      b.addEventListener('click', () => selectOption(i, b));
      optsEl.appendChild(b);
    });
  }

  function selectOption(i, _btnEl){
    if(locked) return;
    locked = true;
    const absIdx = PAGE_START + pageIndex;
    const q = QUESTIONS[absIdx];
    const all = document.querySelectorAll('.option');

    all.forEach((b, idx) => {
      b.disabled = true;
      if(idx === q.answer) b.classList.add('correct');
      else if(idx === i)   b.classList.add('wrong');
    });

    if(i === q.answer) score++;
    sessionStorage.setItem('aq_score', score);

    setTimeout(() => {
      pageIndex++;
      globalIndex++;
      sessionStorage.setItem('aq_index', globalIndex);

      if(pageIndex >= PAGE_SIZE){
        // Fim desta página
        window.location.href = NEXT_PAGE;
      } else {
        renderQuestion();
      }
    }, 1000);
  }

  // Iniciar
  renderQuestion();
})();
