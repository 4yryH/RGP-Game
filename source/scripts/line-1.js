const buttonFirstLine = document.querySelector('.choices__button-line-1');
const buttonFirstLineStep2 = document.querySelector('.button__continue-line-1-step-2');
const chapterFirstLine = document.querySelector('.chapter--story-line-1');
const chapterFirstLineBattle = document.querySelector('.chapter--battle-line-1');

// Выбор пути к сове, скрываем story с кнопками и показываем дальше сюжет
buttonFirstLine.addEventListener('click', (evt) => {
  evt.preventDefault();
  chapterFirstLine.classList.toggle('hidden');
  story.classList.toggle('hidden');
  choices.classList.toggle('hidden');
})

// Переход к следующему шагу - бой с Котом-Тенью
buttonFirstLineStep2.addEventListener('click', (evt) => {
  evt.preventDefault();
  chapterFirstLineBattle.classList.toggle('hidden');
  chapterFirstLine.classList.toggle('hidden');
})
