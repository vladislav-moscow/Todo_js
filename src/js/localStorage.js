// Функция для сохранения списка задач в локальное хранилище
export function saveToLocalStorage(key, data) {
	localStorage.setItem(key, JSON.stringify(data));
}

// Функция для загрузки списка задач из локального хранилища
export function loadFromLocalStorage(key) {
	const data = localStorage.getItem(key);
	return data ? JSON.parse(data) : null;
}