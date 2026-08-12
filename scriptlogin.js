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
  