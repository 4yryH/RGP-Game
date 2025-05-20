/**
 Здесь вся логика боя, характеристики персонажей и получение награды за бой
 */

import {updateInventoryUI, updateHealthDisplay} from './ui.js';
import {checkVictoryCondition} from "./ending.js";
import {hero, inventory, enemies, completedLines, getCurrentEnemy, setCurrentEnemy } from './game-state.js';
import {log} from './log.js';

export const logMessages = document.querySelector('.log__messages');

let isPlayerTurn = true; // для блока кнопок

// действия в бою
// Атака
function attack() {
  const damage = hero.strength + Math.floor(Math.random() * 3);
  getCurrentEnemy().health -= damage;
  log(`Ты атакуешь ${getCurrentEnemy().name} и наносишь ${damage} урона.`);
  updateHealthDisplay();

  if (getCurrentEnemy().health <= 0) {
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
  getCurrentEnemy().health -= damage;
  hero.magic -= 1;
  log(`Ты используешь магию и наносишь ${damage} урона.`);
  updateHealthDisplay();

  if (getCurrentEnemy().health <= 0) {
    endBattle(true);
  } else {
    setTimeout(enemyTurn, 1000);
  }
}

// ход противника
function enemyTurn() {
  const damage = getCurrentEnemy().power + Math.floor(Math.random() * 2);
  hero.health -= damage;
  log(`${getCurrentEnemy().name} атакует и наносит тебе ${damage} урона.`);
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
export function startBattle(enemyId) {
  document.getElementById('log-messages').innerHTML = ''; // чистим лог
  document.querySelector('.log').classList.remove('hidden'); // показываем лог

  // подгружаем хар-ку противника
  // getCurrentEnemy() = enemies[enemyId];
  setCurrentEnemy(enemies[enemyId]);
  // отображение здоровья и магии
  updateHealthDisplay();

  // Клонируем кнопки, чтобы удалить старые обработчики, иначе после первого боя они не работают
  const oldButtons = getCurrentEnemy().element.querySelectorAll('.chapter__choices-button');
  oldButtons.forEach((btn) => {
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
  });

  // Навешиваем новые обработчики
  const newButtons = getCurrentEnemy().element.querySelectorAll('.chapter__choices-button');

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
  log(`Начинается бой с ${getCurrentEnemy().name}!`);
}

// конец боя
function endBattle(victory) {
  if (victory) {
    log(`🎉 Ты победил ${getCurrentEnemy().name}!`);

    // Выдача знака за победу, положится в инвентарь в game-state.js
    if (getCurrentEnemy().name === 'Кот-Тень') {
      inventory['wind-sign-1'] = true;
      log('Ты получил 🌬 Знак Ветра I!');
    }
    if (getCurrentEnemy().name === 'Лисица-Страж') {
      inventory['wind-sign-2'] = true;
      log('Ты получил 🌬 Знак Ветра II!');
    }
    if (getCurrentEnemy().name === 'Тень Сна') {
      inventory['wind-sign-3'] = true;
      log('Ты получил 🌬 Знак Ветра III!');
    }

    updateInventoryUI();
  } else {
    log(`💀 Ты пал в бою с ${getCurrentEnemy().name}...`);
  }

  // отметка линии, на которой был бой
  if (getCurrentEnemy().name === 'Кот-Тень') completedLines.line1 = true;
  if (getCurrentEnemy().name === 'Лисица-Страж') completedLines.line2 = true;
  if (getCurrentEnemy().name === 'Тень Сна') completedLines.line3 = true;

  // Показываем кнопку продолжить что бы вернуться на выбор другой линии
  if (victory) {
    const nextBtn = getCurrentEnemy().element.querySelector('.button__after-battle');
    if (nextBtn) nextBtn.classList.remove('hidden');
  } else {
    // При поражении кнопку рестарта
    const restartBtn = getCurrentEnemy().element.querySelector('.button__restart');
    if (restartBtn) restartBtn.classList.remove('hidden');
  }

  disableButtons(getCurrentEnemy().element);

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




