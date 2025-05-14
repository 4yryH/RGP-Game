// Функция для скрыть/показать элемент
function switchSections(hide, show) {
  hide.classList.add('hidden');
  show.classList.remove('hidden');
}

// блок пройденных линий
function disableCompletedChoices() {
  if (completedLines.line1) {
    document.querySelector('.choices__button-line-1').disabled = true;
  }
  if (completedLines.line2) {
    document.querySelector('.choices__button-line-2').disabled = true;
  }
  if (completedLines.line3) {
    document.querySelector('.choices__button-line-3').disabled = true;
  }
}
