import { STATE } from "./selectors.js";
/**
 * Создает новый объект задачи на основе переданных данных.
 * @param {object} data - Объект с данными для создания задачи.
 * @param {string} data.todoTitle - Заголовок задачи.
 * @param {boolean} data.completed - Флаг завершенности задачи.
 * @param {string} data.chosenCategory - Выбранная категория задачи.
 * @param {object} data.user - Объект с информацией о пользователе, создающем задачу.
 * @param {string} data.user.first - Имя пользователя.
 * @param {string} data.user.last - Фамилия пользователя.
 * @returns {Todo} - Созданная задача.
 */
export function createTodo(data) {
	const icon = data.completed ? "✅" : "⏳";
	return {
		title: data.todoTitle,
		isCompleted: data.completed,
		icon: icon,
		category: data.chosenCategory,
		author: {
			firstName: data.user.first,
			lastName: data.user.last,
		},
	};
}

/**
 * Добавляет новую задачу в массив задач.
 * @param {Todo[]} todos - Массив задач.
 * @param {Todo} todo - Новая задача для добавления.
 * @returns {Todo[]} - Обновленный массив задач.
 */
export function addTodo(todos, todo) {
	todos.push(todo);
	return todos;
}

/**
 * Подсчитывает количество задач в массиве.
 * @param {Todo[]} todos - Массив задач.
 * @returns {number} - Количество задач в массиве.
 */
export function countTodos(todos) {
	return todos.length;
}

/**
 * Возвращает заголовок первой задачи в массиве задач.
 * @param {Todo[]} todos - Массив задач.
 * @returns {string|null} - Заголовок первой задачи или null, если массив пуст.
 */
export function firstTodoTitle(todos) {
	return todos.length > 0 ? todos[0].title : null;
}

/**
 * Возвращает заголовок последней задачи в массиве задач.
 * @param {Todo[]} todos - Массив задач.
 * @returns {string|null} - Заголовок последней задачи или null, если массив пуст.
 */
export function lastTodoTitle(todos) {
	return todos.length > 0 ? todos.at(-1)?.title : null;
}

/**
 * Возвращает массив, содержащий заголовки всех задач.
 * @param {Todo[]} todos - Массив задач.
 * @returns {string[]} - Массив заголовков задач.
 */
export function exportTitles(todos) {
	return todos.map((todo) => todo.title);
}

/**
 * Удаляет задачу с указанным индексом из массива задач.
 * @param {Todo[]} todos - Массив задач.
 * @param {number} index - Индекс задачи для удаления.
 * @returns {Todo[]} - Обновленный массив задач после удаления задачи.
 */
export function deleteTodoByIndex(todos, index) {
	//проверяем что индекс точно есть в массиве
	if (index >= 0 && index < todos.length) {
		todos.splice(index, 1);
	}
	return todos;
}

/**
 * функция фильтрации задач по статусу завершенности
 * @param {string} status - Выбранная категория фильтрации.
 * @returns {Todo[]} - Обновленный массив задач после фильтрации задач.
 */
export function filterTasksByStatus(status) {
	// Если статус "all", возвращаем все задачи, иначе фильтруем по статусу
	if (status === "all") {
		return STATE.todos;
	} else {
		return STATE.todos.filter((task) => task.isCompleted === status);
	}
}

/**
 * Фильтрует задачи по введенному запросу.
 * @param {string} query - Строка поиска.
 * @returns {Array} - Массив отфильтрованных задач.
 */
export function searchTasks(query) {
	return STATE.todos.filter(task => task.title.toLowerCase().includes(query));
}
