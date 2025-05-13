const buttonSecondLine = document.querySelector('.choices__button-line-2');
const buttonSecondLineStep2 = document.querySelector('.button__continue-line-2-step-2');
const chapterSecondLine = document.querySelector('.chapter--story-line-2');
const chapterSecondLineBattle = document.querySelector('.chapter--battle-line-2');

// Выбор пути к сове, скрываем story с кнопками и показываем дальше сюжет
buttonSecondLine.addEventListener('click', (evt) => {
  evt.preventDefault();
  chapterSecondLine.classList.toggle('hidden');
  story.classList.toggle('hidden');
  choices.classList.toggle('hidden');
})

// Переход к Вершине Когтя
buttonSecondLineStep2.addEventListener('click', (evt) => {
  evt.preventDefault();
  chapterSecondLineBattle.classList.toggle('hidden');
  chapterSecondLine.classList.toggle('hidden');
})

