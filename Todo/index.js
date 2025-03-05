const typeTodo = document.querySelector('.type-todo')
const addTodo = document.querySelector('.add-todo')
const todoList = document.querySelector('.todo-list')

const loadTodos = () => {
  const savedTodos = JSON.parse(localStorage.getItem('todos')) || []
  savedTodos.forEach((todo) => addTodoToDOM(todo))
}

const saveTodos = () => {
  const todos = Array.from(todoList.children).map(
    (li) => li.firstChild.textContent
  )
  localStorage.setItem('todos', JSON.stringify(todos))
}

const addTodoToDOM = (todoText) => {
  const todoItem = document.createElement('li')
  todoItem.className = 'todo-item'

  const todoTextNode = document.createElement('span')
  todoTextNode.textContent = todoText

  const deleteButton = document.createElement('button')
  deleteButton.textContent = 'Delete'
  deleteButton.addEventListener('click', () => {
    todoItem.remove()
    saveTodos()
  })

  todoItem.appendChild(todoTextNode)
  todoItem.appendChild(deleteButton)
  todoList.appendChild(todoItem)
}

addTodo.addEventListener('click', () => {
  const todoText = typeTodo.value.trim()
  if (todoText) {
    addTodoToDOM(todoText)
    saveTodos()
    typeTodo.value = ''
  } else {
    alert('Please enter a valid To-Do item.')
  }
})

loadTodos()
