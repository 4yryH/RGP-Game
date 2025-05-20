import {inventory, hero, currentEnemy, completedLines} from "./game-state";
import {log} from "./log.js";

const inventoryListEl = document.getElementById('inventory-list');
const heroHealthEl = document.querySelector('.stats__hero-health');
const heroMagicEl = document.querySelector('.stats__hero-magic');

// Функция для скрыть/показать элемент
export function switchSections(hide, show) {
  hide.classList.add('hidden');
  show.classList.remove('hidden');
}

// блок пройденных линий
export function disableCompletedChoices() {
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

export function updateInventoryUI() {
  inventoryListEl.innerHTML = ''; // Очистить перед ререндером

  // Зелья
  if (inventory['health-potion'] > 0) {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.className = 'inventory__item';
    btn.textContent = `🧪 Зелье здоровья (${inventory['health-potion']})`;
    btn.addEventListener('click', useHealthPotion);
    li.appendChild(btn);
    inventoryListEl.appendChild(li);
  }

  if (inventory['magic-potion'] > 0) {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.className = 'inventory__item';
    btn.textContent = `✨ Зелье магии (${inventory['magic-potion']})`;
    btn.addEventListener('click', useMagicPotion);
    li.appendChild(btn);
    inventoryListEl.appendChild(li);
  }

  // Знаки
  for (let i = 1; i <= 3; i++) {
    if (inventory[`wind-sign-${i}`]) {
      const li = document.createElement('li');
      li.textContent = `🌬 Знак Ветра ${i}`;
      inventoryListEl.appendChild(li);
    }
  }
}

// использование зелья здоровья
export function useHealthPotion() {
  if (inventory['health-potion'] > 0 && hero.health < 10) {
    hero.health += 6;
    if (hero.health > 10) hero.health = 10;
    inventory['health-potion']--;
    log('🧪 Ты выпил зелье здоровья (+6 HP).');
    updateHealthDisplay();
    updateInventoryUI();
  }
}

// использование зелья магии
export function useMagicPotion() {
  if (inventory['magic-potion'] > 0 && hero.magic < 5) {
    hero.magic += 2;
    inventory['magic-potion']--;
    log('✨ Ты выпил зелье магии (+2 MP).');
    updateHealthDisplay();
    updateInventoryUI();
  }
}

// Рендер здоровья и магии.
// Да называется она про здоровье, но потом понял что и магию надо обновлять
export function updateHealthDisplay() {
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
