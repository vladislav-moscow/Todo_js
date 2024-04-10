/**
 * @type {HTMLFormElement} form - Форма для добавления новых задач.
 * @type {HTMLInputElement} title - Поле ввода заголовка задачи.
 * @type {HTMLInputElement} completed - Флажок для указания завершенности задачи.
 * @type {HTMLSelectElement} category - Поле выбора категории задачи.
 * @type {HTMLUListElement} list - Список для отображения задач.
 * @type {HTMLInputElement} filterCompleted - Флажок для показа завершенных задач.
 */

export const SELECTORS = {
  form: document.querySelector("#todo-list-form"),
  title: document.querySelector("#todo-title"),
  completed: document.querySelector("#todo-completed"),
  category: document.querySelector("#todo-category"),
  list: document.querySelector("#todo-list"),
	filterCompleted: document.querySelector("#filterCompletedSelect"),
};

/**
 * Объект состояния задач.
 * @property {array} todos - Массив задач.
 * @property {object} author - автор задачи.
 * 
 */
export const STATE = {
  todos: [],
  author: {
		first: "Sam",
		last: "Blue",
	},
};