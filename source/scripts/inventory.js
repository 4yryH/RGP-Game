/**
 Инвентарь и характеристики айтемов
 */
const inventorySection = document.querySelector(".inventory");
const inventoryListEl = document.getElementById('inventory-list');


const inventory = {
  'health-potion': 2,
  'magic-potion': 2,
  'wind-sign-1': false,
  'wind-sign-2': false,
  'wind-sign-3': false,
};


function updateInventoryUI() {
  inventoryListEl.innerHTML = ''; // Очистить перед ререндером

  // Зелья
  if (inventory['health-potion'] > 0) {
    const li = document.createElement('li');
    li.innerHTML = `<button class="inventory__item" onclick="useHealthPotion()">🧪 Зелье здоровья (${inventory['health-potion']})</button>`;
    inventoryListEl.appendChild(li);
  }

  if (inventory['magic-potion'] > 0) {
    const li = document.createElement('li');
    li.innerHTML = `<button class="inventory__item" onclick="useMagicPotion()">✨ Зелье магии (${inventory['magic-potion']})</button>`;
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
function useHealthPotion() {
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
function useMagicPotion() {
  if (inventory['magic-potion'] > 0 && hero.magic < 5) {
    hero.magic += 2;
    inventory['magic-potion']--;
    log('✨ Ты выпил зелье магии (+2 MP).');
    updateHealthDisplay();
    updateInventoryUI();
  }
}

