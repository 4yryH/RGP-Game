/**
 Логика отображения шагов в 1 линии сюжета
 */
const buttonFirstLine = document.querySelector('.choices__button-line-1');
const buttonFirstLineStep2 = document.querySelector('.button__continue-line-1-step-2');
const chapterFirstLine = document.querySelector('.chapter--story-line-1');
const chapterFirstLineBattle = document.querySelector('.chapter--battle-line-1');
const buttonContinue1 = document.querySelector('.button__after-battle-line-1');

// Выбор пути к сове, скрываем story с кнопками и показываем дальше сюжет
buttonFirstLine.addEventListener('click', (evt) => {
  evt.preventDefault();
  switchSections(story, chapterFirstLine);
  choices.classList.toggle('hidden');
});

// Переход к следующему шагу - бой с Котом-Тенью
buttonFirstLineStep2.addEventListener('click', (evt) => {
  evt.preventDefault();
  switchSections(chapterFirstLine, chapterFirstLineBattle);

  // Вызов функции начала боя из battle.js
  startBattle('cat-shadow');
});

// отключение кнопки пройденной линии и возвращение к начальному выбору
buttonContinue1?.addEventListener('click', () => {
  switchSections(chapterFirstLineBattle, choices);
  disableCompletedChoices();
});
