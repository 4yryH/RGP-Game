//log
export function log(text) {
  const p = document.createElement('p');
  p.innerHTML = highlightLog(text); //

  const logBox = document.getElementById('log-messages');
  logBox.appendChild(p);
  logBox.scrollTop = logBox.scrollHeight;
}

// для стилизации логов
function highlightLog(text) {
  return text
    .replace(/(\d+)\s+урона/g, '<span class="log--damage">$1 урона</span>')
    .replace(/(\d+)\s+здоровья/g, '<span class="log--heal">$1 здоровья</span>')
    .replace(/магии\s*\(\+\d+\sMP\)/g, '<span class="log--magic">$&</span>')
    .replace(/здоровья\s*\(\+\d+\sHP\)/g, '<span class="log--heal">$&</span>')
    .replace(/Знак Ветра/i, '<span class="log--wind">Знак Ветра</span>');
}
