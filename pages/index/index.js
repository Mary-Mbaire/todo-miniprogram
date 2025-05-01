import { requestResource } from '/utils/api';
import { getCachedTodos, setCachedTodos, deleteTodo, toggleCompleted } from '/utils/todoCache';

Page({
  data: {
    todos: []
  },
  onLoad(query) {
    // Page load
    const cached = getCachedTodos();
    this.setData({ todos: cached });
  },
  onReady() {
    // Page loading is complete
    this.fetchTodos();
  },
  onShow() {
    const updated = getCachedTodos();
    this.setData({ todos: updated });
  },
  onPullDownRefresh() {
    // Page is pulled down
    this.fetchTodos(() => {
      my.stopPullDownRefresh();
    })
  },
  onShareAppMessage() {
    // Back to custom sharing information
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
  fetchTodos(callback) {
    requestResource({
      url: 'https://jsonplaceholder.typicode.com/todos',
      success: (res) => {
        const sliced = res.data.slice(0, 25);
        setCachedTodos(sliced);
        this.setData({ todos: sliced });
        if (callback) callback();
      },
      fail: () => {
        my.showToast({
          type: 'fail',
          content: 'Failed to fetch todos',
          duration: 2000
        })
      }
    });
  },
  deleteTodo(e) {
    const id = e.target.dataset.id;

    my.confirm({
      title: 'Confirm',
      content: 'Are you sure you want to delete this todo?',
      success: (result) => {
        if (result.confirm) {
          requestResource({
            url: `https://jsonplaceholder.typicode.com/todos/${id}`,
            method: 'DELETE',
            success: () => {
              my.showToast({
                type: 'success',
                content: "Task deleted successfully",
                duration: 2000
              });
              const updated = deleteTodo(id)
              this.setData({ todos: updated });
            }
          });
        }
      }
    });
  },
  editTodo(e) {
    const id = e.target.dataset.id;
    my.navigateTo({ url: `/pages/todo-form/todo-form?id=${id}` });
  },
  goToAdd() {
    my.navigateTo({ url: '/pages/todo-form/todo-form' });
  },
  handleToggleComplete(e) {
    const id = e.target.dataset.id;
    const updated = toggleCompleted(id);
    this.setData({ todos: updated });
  }
});
