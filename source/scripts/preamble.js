/**
 Вступление
 */
const startButton = document.querySelector('.button__start');
const preamble = document.querySelector('.preamble');
const stats = document.querySelector('.stats');
const story = document.querySelector('.story');
const choices = document.querySelector('.choices');

// Функция на старте скрыть предисловие,
// показать первую главу, действия, характеристику героя
function showGameUI() {
  preamble.classList.add('hidden');
  stats.classList.remove('hidden');
  story.classList.remove('hidden');
  choices.classList.remove('hidden');
}

// подписка на кнопку "начать приключения" для старта игры
startButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  showGameUI();
  updateInventoryUI(); // первоначальное обновление инвентаря
});
