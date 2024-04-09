import { SELECTORS } from "./selectors.js";
import { countTodos } from "./todo.js";

// Функция рендеринга задач
/**
 * Отображает задачи в списке.
 * @param {Array} todos - Массив задач.
 */
export function render(todos) {
	SELECTORS.list.innerHTML = `<h3>Todos (${countTodos(todos)})</h3>`;
	todos.forEach((todo, index) => {
			SELECTORS.list.insertAdjacentHTML(
					"beforeend",
					`<li><div class="card">${todo.icon} &nbsp;<strong>${todo.title}</strong> - by ${todo.author.firstName} ${todo.author.lastName}</strong> in ${todo.category}</div><button class="btn-Del" data-index="${index}">удалить</button></li>`
			);
	});
}