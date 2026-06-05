// AniQuiz — banco de questões compartilhado
const QUESTIONS = [
  // --- Página 1 (quiz1.html) - Q1 a Q3 ---
  {q:"Em Naruto, qual é o sonho de Naruto Uzumaki?",
   options:["Tornar-se um Sannin","Tornar-se Hokage","Tornar-se ANBU","Tornar-se Jinchūriki perfeito"],
   answer:1, bg:"images/q1.jpg"},
  {q:"Em One Piece, qual é o nome do navio dos Chapéus de Palha após a destruição do Going Merry?",
   options:["Red Force","Thousand Sunny","Oro Jackson","Polar Tang"],
   answer:1, bg:"images/q1.jpg"},
  {q:"Em Demon Slayer, qual é o nome da irmã de Tanjiro?",
   options:["Kanao","Shinobu","Nezuko","Mitsuri"],
   answer:2, bg:"images/q1.jpg"},

  // --- Página 2 (quiz2.html) - Q4 a Q7 ---
  {q:"Em Hunter x Hunter, a afinidade nen de Killua Zoldyck é:",
   options:["Emissão","Manipulação","Transmutação","Materialização"],
   answer:2, bg:"images/q2.webp"},
  {q:"Em Jujutsu Kaisen, qual é o nome da expansão de domínio de Satoru Gojo?",
   options:["Malevolent Shrine","Unlimited Void","Self-Embodiment of Perfection","Chimera Shadow Garden"],
   answer:1, bg:"images/q2.webp"},
  {q:"Em Dr. Stone, qual foi o primeiro grande produto científico produzido pelo Reino da Ciência para ganhar a população da vila?",
   options:["Antibiótico de Sulfa","Eletricidade","Vidro","Ramen"],
   answer:3, bg:"images/q2.webp"},
  {q:"Em Solo Leveling, qual foi a primeira sombra de rank elevado extraída por Sung Jin-Woo?",
   options:["Beru","Tank","Iron","Igris"],
   answer:3, bg:"images/q3.jpg"},

  // --- Página 3 (quiz3.html) - Q8 a Q10 ---
  {q:"Em Cyberpunk: Edgerunners, qual era o modelo do implante militar instalado em David Martinez no início da série?",
   options:["Militech Falcon","Sandevistan","Berserk MK.5","Kerenzikov"],
   answer:1, bg:"images/q3.jpg"},
  {q:"Em Re:Zero, qual é uma consequência indireta que Subaru enfrenta ao usar repetidamente 'Return by Death'?",
   options:["Ele começa a perder a capacidade de confiar em seus aliados, pois sabe demais sobre o futuro","Ele fica fisicamente debilitado, envelhecendo a cada retorno","Ele altera eventos críticos, criando loops que afetam apenas os outros","Ele perde a habilidade de usar magia ou habilidades espirituais"],
   answer:0, bg:"images/q3.jpg"},
  {q:"Em JoJo's Bizarre Adventure: Stone Ocean, qual é o detalhe mais sutil sobre como 'Made in Heaven' permite a Pucci alcançar um novo universo?",
   options:["O tempo é acelerado para todos, mas Pucci percebe normalmente graças ao seu stand","Apenas humanos estão sujeitos à aceleração; seres sobrenaturais não","A aceleração cria múltiplos universos paralelos, mas Pucci controla apenas um","Pucci precisa do 'Green Baby' como catalisador para sincronizar o novo universo"],
   answer:3, bg:"images/q4.jpg"},
];

const TOTAL = QUESTIONS.length; // 10
