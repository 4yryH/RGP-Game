/**
 Здесь вся логика боя, характеристики персонажей и получение награды за бой
 */
const heroHealthEl = document.querySelector('.stats__hero-health');
const heroMagicEl = document.querySelector('.stats__hero-magic');
const logMessages = document.querySelector('.log__messages');

let isPlayerTurn = true; // для блока кнопок

// здесь хранятся линии, на которых был бой, при завершении боя будет прилетать true
const completedLines = {
  line1: false,
  line2: false,
  line3: false
};

// хар-ка героя
const hero = {
  health: 10,
  strength: 3,
  magic: 2,
  cunning: 1,
};

// хар-ки противников
const enemies = {
  'cat-shadow': {
    name: 'Кот-Тень',
    health: 8,
    maxHealth: 8,
    power: 2,
    element: chapterFirstLineBattle
  },
  'fox-guard': {
    name: 'Лисица-Страж',
    health: 10,
    maxHealth: 12,
    power: 3,
    element: chapterSecondLineBattle
  },
  'sleep-shadow': {
    name: 'Тень Сна',
    health: 12,
    maxHealth: 12,
    power: 4,
    element: chapterThirdLineBattle
  }
};

// текущий противник
let currentEnemy = null;

// Рендер здоровья и магии.
// Да называется она про здоровье, но потом понял что и магию надо обновлять
function updateHealthDisplay() {
  if (heroHealthEl) {
    heroHealthEl.textContent = hero.health;
  }
  if (heroMagicEl) {
    heroMagicEl.textContent = hero.magic;
  }

  if (!currentEnemy) return;

  const healthEls = currentEnemy.element.querySelectorAll('.chapter__enemy-health');
  healthEls.forEach(el => el.textContent = currentEnemy.health);
}

// действия в бою
// Атака
function attack() {
  const damage = hero.strength + Math.floor(Math.random() * 3);
  currentEnemy.health -= damage;
  log(`Ты атакуешь ${currentEnemy.name} и наносишь ${damage} урона.`);
  updateHealthDisplay();

  if (currentEnemy.health <= 0) {
    endBattle(true);
  } else {
    setTimeout(enemyTurn, 1000);
  }
}

// Защита
function defend() {
  const heal = 2 + Math.floor(Math.random() * 2);
  hero.health += heal;
  log(`Ты защищаешься и восстанавливаешь ${heal} здоровья.`);
  updateHealthDisplay();

  setTimeout(enemyTurn, 1000);
}


// Магия
function useMagic() {
  if (hero.magic <= 0) {
    log('У тебя закончилась магия!');
    return;
  }
  const damage = 4 + Math.floor(Math.random() * 3);
  currentEnemy.health -= damage;
  hero.magic -= 1;
  log(`Ты используешь магию и наносишь ${damage} урона.`);
  updateHealthDisplay();

  if (currentEnemy.health <= 0) {
    endBattle(true);
  } else {
    setTimeout(enemyTurn, 1000);
  }
}

// ход противника
function enemyTurn() {
  const damage = currentEnemy.power + Math.floor(Math.random() * 2);
  hero.health -= damage;
  log(`${currentEnemy.name} атакует и наносит тебе ${damage} урона.`);
  updateHealthDisplay();

  if (hero.health <= 0) {
    endBattle(false);
  }
  // Возвращаем ход игроку, снимаем блокировку кнопок
  if (hero.health > 0) {
    isPlayerTurn = true;
  }
}

// начать бой
function startBattle(enemyId) {
  document.getElementById('log-messages').innerHTML = ''; // чистим лог
  document.querySelector('.log').classList.remove('hidden'); // показываем лог

  // подгружаем хар-ку противника
  currentEnemy = enemies[enemyId];

  // отображение здоровья и магии
  updateHealthDisplay();

  // Клонируем кнопки, чтобы удалить старые обработчики, иначе после первого боя они не работают
  const oldButtons = currentEnemy.element.querySelectorAll('.chapter__choices-button');
  oldButtons.forEach((btn) => {
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
  });

  // Навешиваем новые обработчики
  const newButtons = currentEnemy.element.querySelectorAll('.chapter__choices-button');

  // кнопка атаки
  newButtons[0].addEventListener('click', () => {
    if (!isPlayerTurn) return;
    isPlayerTurn = false;
    attack();
  });

  // кнопка защиты
  newButtons[1].addEventListener('click', () => {
    if (!isPlayerTurn) return;
    isPlayerTurn = false;
    defend();
  });

  // кнопка магии
  newButtons[2].addEventListener('click', () => {
    if (!isPlayerTurn) return;
    if (hero.magic <= 0) {
      log('❌ У тебя нет магии!');
      return;
    }
    isPlayerTurn = false;
    useMagic();
  });

  // обновляем инвентарь
  updateInventoryUI();

  // начинаем писать лог
  log(`Начинается бой с ${currentEnemy.name}!`);
}

// конец боя
function endBattle(victory) {
  if (victory) {
    log(`🎉 Ты победил ${currentEnemy.name}!`);

    // Выдача знака за победу, положится в инвентарь в inventory.js
    if (currentEnemy.name === 'Кот-Тень') {
      inventory['wind-sign-1'] = true;
      log('Ты получил 🌬 Знак Ветра I!');
    }
    if (currentEnemy.name === 'Лисица-Страж') {
      inventory['wind-sign-2'] = true;
      log('Ты получил 🌬 Знак Ветра II!');
    }
    if (currentEnemy.name === 'Тень Сна') {
      inventory['wind-sign-3'] = true;
      log('Ты получил 🌬 Знак Ветра III!');
    }

    updateInventoryUI();
  } else {
    log(`💀 Ты пал в бою с ${currentEnemy.name}...`);
  }

  // отметка линии, на которой был бой
  if (currentEnemy.name === 'Кот-Тень') completedLines.line1 = true;
  if (currentEnemy.name === 'Лисица-Страж') completedLines.line2 = true;
  if (currentEnemy.name === 'Тень Сна') completedLines.line3 = true;

  // Показываем кнопку другой линии
  const nextBtn = currentEnemy.element.querySelector('.button__after-battle');
  if (nextBtn) nextBtn.classList.remove('hidden');

  disableButtons(currentEnemy.element);

  // меняем, иначе последнее значение false и кнопки не работают после первого боя
  isPlayerTurn = true;

  // переход к финалу, если собрал 3 знака
  checkVictoryCondition();
}


// отключение кнопок после боя
function disableButtons(section) {
  const buttons = section.querySelectorAll('.chapter__choices-button');
  buttons.forEach(btn => btn.disabled = true);
}

//log
function log(text) {
  const p = document.createElement('p');
  p.textContent = text;
  logMessages.appendChild(p);

  // scroll
  const logBox = logMessages;
  logBox.scrollTop = logBox.scrollHeight;
}
