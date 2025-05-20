// характеристика героя
export const hero = {
  health: 10,
  strength: 3,
  magic: 2,
  cunning: 1,
};

// текущий противник
export let currentEnemy = null;

export function setCurrentEnemy(enemy) {
  currentEnemy = enemy;
}

export function getCurrentEnemy() {
  return currentEnemy;
}

// хар-ки противников
export const enemies = {
  'cat-shadow': {
    name: 'Кот-Тень',
    health: 8,
    maxHealth: 8,
    power: 2,
    element: document.querySelector('.chapter--battle-line-1')
  },
  'fox-guard': {
    name: 'Лисица-Страж',
    health: 10,
    maxHealth: 12,
    power: 3,
    element: document.querySelector('.chapter--battle-line-2')
  },
  'sleep-shadow': {
    name: 'Тень Сна',
    health: 12,
    maxHealth: 12,
    power: 4,
    element: document.querySelector('.chapter--battle-line-3')
  }
};

// инвентарь
export const inventory = {
  'health-potion': 2,
  'magic-potion': 2,
  'wind-sign-1': false,
  'wind-sign-2': false,
  'wind-sign-3': false,
};

// Статус завершённых линий
export const completedLines = {
  line1: false,
  line2: false,
  line3: false,
};
