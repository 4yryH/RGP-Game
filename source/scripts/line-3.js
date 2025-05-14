/**
 Логика отображения шагов в 3 линии сюжета
 */
const buttonThirdLine = document.querySelector('.choices__button-line-3');
const buttonThirdLineStep2 = document.querySelector('.button__continue-line-3-step-2');
const buttonThirdLineStep3 = document.querySelector('.button__continue-line-3-step-3');
const chapterThirdLine = document.querySelector('.chapter--story-line-3');
const chapterThirdLineStep2 = document.querySelector('.chapter--story-line-3-step-2');
const chapterThirdLineBattle = document.querySelector('.chapter--battle-line-3');
const buttonContinue3 = document.querySelector('.button__after-battle-line-3');

// Выбор пути к сове, скрываем story с кнопками и показываем дальше сюжет
buttonThirdLine.addEventListener('click', (evt) => {
  evt.preventDefault();
  switchSections(story, chapterThirdLine);
  choices.classList.toggle('hidden');
})

// переход к следующему шагу - спасти вожака
buttonThirdLineStep2.addEventListener('click', (evt) => {
  evt.preventDefault();
  switchSections(chapterThirdLine, chapterThirdLineStep2);
})

// переход к следующему шагу - спуск в подземелье
buttonThirdLineStep3.addEventListener('click', (evt) => {
  evt.preventDefault();
  switchSections(chapterThirdLineStep2, chapterThirdLineBattle);

  // Вызов функции начала боя из battle.js
  startBattle('sleep-shadow');
});

// отключение кнопки пройденной линии
buttonContinue3?.addEventListener('click', () => {
  switchSections(chapterThirdLineBattle, choices);
  disableCompletedChoices();
});
