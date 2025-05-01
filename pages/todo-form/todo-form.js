const { requestResource } = require('/utils/api.js');
import { addTodo, updateTodo } from '/utils/todoCache';

Page({
  data: {
    form: {
      title: ''
    },
    errors: {
      title: ''
    },
    isEditing: false,
    id: null,
    userId: null,
    completed: false
  },
  onLoad(query) {
    if (query.id) {
      this.setData({
        isEditing: true,
        id: query.id
      });
      this.getTodo(query.id);
    }
  },
  onInput(value) {
    this.setData({
      form: {
        ...this.data.form,
        title: value
      }
    });
  },
  getTodo(id) {
    requestResource({
      url: `https://jsonplaceholder.typicode.com/todos/${id}`,
      success: (result) => {
        this.setData({
          form: {
            title: result.data.title
          },
          userId: result.data.userId
        })
      }
    })
  },
  handleSubmit(e) {
    const { title } = e.detail.value;
    const { isEditing, id, completed } = this.data;
    const randomId = Math.floor(Math.random() * 500) + 1;

    let hasError = false;
    const errors = { title: '' };

    if (!title.trim()) {
      errors.title = 'Task title is a required field';
      hasError = true;
    }

    this.setData({ errors });

    if (hasError) return;

    if (isEditing) {
      requestResource({
        url: `https://jsonplaceholder.typicode.com/todos/${id}`,
        method: 'PUT',
        data: { id, title, completed: false, userId: this.data.userId },
        success: () => {
          updateTodo(id, { title, completed: false, userId: this.data.userId });
          my.showToast({
            type: 'success',
            content: "Task added successful",
            duration: 2000
          })
          my.navigateBack();;
        }
      });
    } else {
      const _userId  = randomId;

      requestResource({
        url: 'https://jsonplaceholder.typicode.com/todos',
        method: 'POST',
        data: { title, userId: _userId },
        success: () => {
          const newTask = {
            id: randomId,
            title,
            userId: _userId
          };
          addTodo(newTask);

          my.showToast({
            type: 'success',
            content: "Task added successful",
            duration: 2000
          })
          my.navigateBack();;
        }
      });
    }
  }
});

