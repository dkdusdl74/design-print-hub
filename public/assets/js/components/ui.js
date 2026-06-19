/*
  Shared UI rendering helpers.
  These small functions are intentionally framework-free so a developer can later port them to
  React/Vue/Svelte components such as Button, FilterBar, Table, StatusBadge, Modal, and Card.
*/

// FieldList component: renders label/value rows used by order and shipping detail cards.
function renderFieldRows(data) {
  return Object.entries(data).map(([label, value]) => (
    `<div class="field"><span>${label}</span><strong>${value}</strong></div>`
  )).join("");
}

// Timeline component: renders dashboard work history entries.
function renderTimelineItems(history) {
  return history.map(([title, body]) => (
    `<li><span class="dot"></span><span><strong>${title}</strong>${body}</span></li>`
  )).join("");
}

// StatusBadge component helper: keeps status badge class naming in one place.
function setStatusBadge(element, label, className) {
  element.textContent = label;
  element.className = `status ${className}`;
}

window.DesignPrintHubUI = {
  renderFieldRows,
  renderTimelineItems,
  setStatusBadge
};
