/**
 Логика отображения шагов в 2 линии сюжета
 */
import { disableCompletedChoices, switchSections } from './ui.js';
import { choices, story } from './preamble.js';
import { startBattle } from './battle.js';

const buttonSecondLine = document.querySelector('.choices__button-line-2');
const buttonSecondLineStep2 = document.querySelector('.button__continue-line-2-step-2');
const chapterSecondLine = document.querySelector('.chapter--story-line-2');
const chapterSecondLineBattle = document.querySelector('.chapter--battle-line-2');
const buttonContinue2 = document.querySelector('.button__after-battle-line-2');


// Выбор пути к сове, скрываем story с кнопками и показываем дальше сюжет
buttonSecondLine.addEventListener('click', (evt) => {
  evt.preventDefault();
  switchSections(story, chapterSecondLine);
  choices.classList.toggle('hidden');
})

// Переход к Вершине Когтя
buttonSecondLineStep2.addEventListener('click', (evt) => {
  evt.preventDefault();
  switchSections(chapterSecondLine, chapterSecondLineBattle);

  // Вызов функции начала боя из battle.js
  startBattle('fox-guard');
});

// отключение кнопки пройденной линии
buttonContinue2?.addEventListener('click', () => {
  switchSections(chapterSecondLineBattle, choices);
  disableCompletedChoices();
});
