// ============ script.js — lógica exclusiva de resultado.html ============

async function salvarResultado() {
  try {
    const resp = await fetch('http://localhost:3000/rota2');
    const dados = await resp.json();
    alert(dados.msg);
    console.log(dados);
  } catch (err) {
    console.error('Erro ao buscar dados do servidor:', err);
  }
}

salvarResultado();
