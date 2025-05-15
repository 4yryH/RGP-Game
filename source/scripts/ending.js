/**
 переход к финальной сцене, когда собраны все три знака
 */

const ending = document.querySelector('.ending');

function checkVictoryCondition() {
  if (
    inventory['wind-sign-1'] &&
    inventory['wind-sign-2'] &&
    inventory['wind-sign-3']
  ) {
    log('✨ Ты собрал все Три Знака Ветра! Портал начинает открываться...');

    // Задержка 3 секунды, что бы перед переходом видно было лог о победе
    setTimeout(() => {
      // Скрыть всё
      document.querySelectorAll('section').forEach(sec => sec.classList.add('hidden'));

      // Показать финал
      if (ending) {
        ending.classList.remove('hidden');
      }
    }, 3000);
  }
}
