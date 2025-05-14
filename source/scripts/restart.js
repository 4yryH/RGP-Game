/**
 Перезапуск игры
 */
const restartButton = document.querySelector('.button__restart');

restartButton.addEventListener('click', () => {
  // Сброс характеристик героя
  hero.health = 10;
  hero.magic = 2;

  // Сброс врагов
  enemies['cat-shadow'].health = enemies['cat-shadow'].maxHealth;
  enemies['fox-guard'].health = enemies['fox-guard'].maxHealth;
  enemies['sleep-shadow'].health = enemies['sleep-shadow'].maxHealth;

  // Сброс инвентаря
  inventory['health-potion'] = 2;
  inventory['magic-potion'] = 2;
  inventory['wind-sign-1'] = false;
  inventory['wind-sign-2'] = false;
  inventory['wind-sign-3'] = false;

  // Сброс флагов
  completedLines.line1 = false;
  completedLines.line2 = false;
  completedLines.line3 = false;

  // Очистка лога
  logMessages.innerHTML = '';

  // Скрыть все секции, исключение для инвентаря - он лежит в секции stats, показать preamble
  document.querySelectorAll('section').forEach(sec => sec.classList.add('hidden'));
  preamble.classList.remove('hidden');
  inventorySection.classList.remove('hidden');

  // Сброс здоровья, магии и инвентаря
  updateHealthDisplay();
  updateInventoryUI();

  // сброс кнопок выбора линий
  document.querySelectorAll('.choices__button').forEach(btn => {
    btn.disabled = false;
  });

  // сброс кнопки действий в бою
  document.querySelectorAll('.chapter__choices-button').forEach((btn) => {
    btn.disabled = false;
  });

  log('🔄 Игра перезапущена. Начни путь заново!');
});
