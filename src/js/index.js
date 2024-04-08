import {
	createTodo,
	addTodo,
	countTodos,
	exportTitles,
	firstTodoTitle,
	lastTodoTitle,
	deleteTodoByIndex,
} from "./todo.js";
import { SELECTORS } from "./selectors.js";
import { STATE } from "./state.js";

/**
 * Отображает задачи в списке.
 * @param {Array} todos - Массив задач.
 */
function render(todos) {
	SELECTORS.list.innerHTML = `<h3>Todos (${countTodos(todos)})</h3>`;
	todos.forEach((todo, index) => {
		SELECTORS.list.insertAdjacentHTML(
			"beforeend",
			`<li><div class="card">${todo.icon} &nbsp;<strong>${todo.title}</strong> - by ${todo.author.firstName} ${todo.author.lastName}</strong> in ${todo.category}</div><button class="btn-Del" data-index="${index}">удалить</button></li>`
		);
	});
}

/**
 * Обработчик события отправки формы для добавления задачи.
 *
 * @param {Event} event - Объект события.
 */
SELECTORS.form.addEventListener("submit", event => {
	event.preventDefault();
	STATE.author;

	let values = {
		todoTitle: SELECTORS.title.value,
		completed: SELECTORS.completed.checked,
		chosenCategory: SELECTORS.category.value,
		user: STATE.author,
	};

	let todo = createTodo(values);

	STATE.todos = addTodo(STATE.todos, todo);

	render(STATE.todos);

	SELECTORS.title.value = "";
	SELECTORS.completed.checked = false;

	console.log("First todo title: " + firstTodoTitle(STATE.todos));
	console.log("Last todo title: " + lastTodoTitle(STATE.todos));
	console.log("Exported titles: ", exportTitles(STATE.todos));
});

/**
 * Обработчик события удаления задачи из массива задач.
 *
 * @param {Event} event - Объект события.
 */
SELECTORS.list.addEventListener("click", event => {
	// проверяем что нажата была именно кнопка удаления
	if (event.target.classList.contains("btn-Del")) {
		const index = event.target.dataset.index; // Получаем уникальный идентификатор задачи из атрибута data-index кнопки удаления
		STATE.todos = deleteTodoByIndex(STATE.todos, index);
		render(STATE.todos);
	}
});
