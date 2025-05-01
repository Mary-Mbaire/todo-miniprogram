const CACHE_KEY = 'todos';

export function getCachedTodos() {
  const result = my.getStorageSync({ key: CACHE_KEY });
  return result.data || [];
}

export function setCachedTodos(todos) {
  my.setStorageSync({
    key: CACHE_KEY,
    data: todos
  });
}

export function addTodo(todo) {
  const todos = getCachedTodos();
  const updated = [todo, ...todos];
  setCachedTodos(updated);
  return updated;
}

export function updateTodo(id, updatedTodo) {
  const todos = getCachedTodos();
  const updated = todos.map(todo => (todo.id === id ? { ...todo, ...updatedTodo } : todo))
  setCachedTodos(updated);
  return updated;
}

export function deleteTodo(id) {
  const todos = getCachedTodos();
  const updated = todos.filter(todo => todo.id !== id);
  setCachedTodos(updated);
  return updated;
}

export function toggleCompleted(id) {
  const todos = getCachedTodos();
  const updated = todos.map(todo => (
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  ));
  setCachedTodos(updated);
  return updated;
}