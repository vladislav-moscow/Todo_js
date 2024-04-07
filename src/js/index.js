import {
	createTodo,
	addTodo,
	countTodos,
	exportTitles,
	firstTodoTitle,
	lastTodoTitle,
	deleteTodoByIndex,
} from "./todo.js";


/**
 * Форма для добавления новых задач.
 * @type {HTMLFormElement}
 */
let form = document.querySelector("#todo-list-form");

/**
 * Поле ввода заголовка задачи.
 * @type {HTMLInputElement}
 */
let title = document.querySelector("#todo-title");

/**
 * Флажок для указания завершенности задачи.
 * @type {HTMLInputElement}
 */
let completed = document.querySelector("#todo-completed");

/**
 * Поле выбора категории задачи.
 * @type {HTMLSelectElement}
 */
let category = document.querySelector("#todo-category");

/**
 * Список для отображения задач.
 * @type {HTMLUListElement}
 */
let list = document.querySelector("#todo-list");

/**
 * Массив задач.
 * @type {Array}
 */
let todos = [];

/**
 * Отображает задачи в списке.
 *
 * @param {Array} todos - Массив задач.
 */
function render(todos) {
	list.innerHTML = `<h3>Todos (${countTodos(todos)})</h3>`;
	todos.forEach(function (todo, index) {
		list.insertAdjacentHTML(
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
form.addEventListener("submit", (event) => {
	event.preventDefault();
	let author = {
		first: "Sam",
		last: "Blue",
	};

	let values = {
		todoTitle: title.value,
		completed: completed.checked,
		chosenCategory: category.value,
		user: author,
	};

	let todo = createTodo(values);

	todos = addTodo(todos, todo);

	render(todos);

	title.value = "";
	completed.checked = false;

	console.log("First todo title: " + firstTodoTitle(todos));
	console.log("Last todo title: " + lastTodoTitle(todos));
	console.log("Exported titles: ", exportTitles(todos));
});


/**
 * Обработчик события удаления задачи из массива задач.
 *
 * @param {Event} event - Объект события.
 */
list.addEventListener("click", (event) => {
	// проверяем что нажата была именно кнопка удаления
  if (event.target.classList.contains("btn-Del")) {
    const index = event.target.dataset.index; // Получаем уникальный идентификатор задачи из атрибута data-index кнопки удаления
    todos = deleteTodoByIndex(todos, index);
    render(todos);
  }
});