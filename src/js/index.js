import {
	createTodo,
	addTodo,
	deleteTodoByIndex,
	filterTasksByStatus,
	searchTasks,
} from "./todo.js";
import { render } from "./render.js";
import { SELECTORS, STATE } from "./selectors.js";
import { saveToLocalStorage, loadFromLocalStorage } from "./localStorage.js";

/**
 * Обработчик события отправки формы для добавления задачи.
 *
 * @param {Event} event - Объект события.
 */
SELECTORS.form.addEventListener("submit", (event) => {
	event.preventDefault();
	//получаем автора
	STATE.author;
	//создаем озадачу с введеными данными
	let values = {
		todoTitle: SELECTORS.title.value,
		completed: SELECTORS.completed.checked,
		chosenCategory: SELECTORS.category.value,
		user: STATE.author,
	};
	//создаем новую задачу
	let todo = createTodo(values);
	//добавляем задачу в массив задач
	STATE.todos = addTodo(STATE.todos, todo);
	//Рендеринг списка задач
	render(STATE.todos);
	//обнуляем название задачи
	SELECTORS.title.value = "";
	//обнуляем чекбокс  завершения задачи
	SELECTORS.completed.checked = false;
	// Сохранение списка задач в localStorage
	saveToLocalStorage("todos", STATE.todos);
});

// Добавьте обработчик изменения в элемент select
SELECTORS.filterCompleted.addEventListener("change", (event) => {
	const selectedValue = event.target.value; // Получаем выбранное значение
	let filteredTasks;
	// Фильтруем задачи в соответствии с выбранным значением
	switch (selectedValue) {
		case "completed":
			filteredTasks = filterTasksByStatus(true); // Завершенные задачи
			break;
		case "uncompleted":
			filteredTasks = filterTasksByStatus(false); // Незавершенные задачи
			break;
		default:
			filteredTasks = STATE.todos; // Все задачи
			break;
	}
	// Рендер отфильтрованных задач
	render(filteredTasks);
});

/**
 * Обработчик события поиска задач из массива задач.
 *
 * @param {Event} event - Объект события.
 */
SELECTORS.searchInput.addEventListener("input", (event) => {
	const query = event.target.value.toLowerCase(); // Получите строку поиска и приведите ее к нижнему регистру
	const filteredTasks = searchTasks(query); // Фильтруем задачи по запросу
	render(filteredTasks); // Рендерим отфильтрованные задачи
});

/**
 * Обработчик события удаления задачи из массива задач.
 *
 * @param {Event} event - Объект события.
 */
SELECTORS.list.addEventListener("click", (event) => {
	// проверяем что нажата была именно кнопка удаления
	if (event.target.classList.contains("btn-Del")) {
		const index = event.target.dataset.index; // Получаем уникальный идентификатор задачи из атрибута data-index кнопки удаления
		STATE.todos = deleteTodoByIndex(STATE.todos, index);
		render(STATE.todos);
		// Сохраняем обновленный список задач в localStorage
		saveToLocalStorage("todos", STATE.todos);
	}
});

document.addEventListener("DOMContentLoaded", () => {
	// Загрузка списка задач из localStorage
	STATE.todos = loadFromLocalStorage("todos") || [];

	// Рендеринг списка задач
	render(STATE.todos);
});
