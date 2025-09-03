taskArray = []
const inputText = document.getElementById('task-input')
const addBtn = document.getElementById('add-btn')
const clearBtn = document.getElementById('clear-btn')
const listTask = document.getElementById('task-list')
const infoCounter = document.getElementById('info')
function renderList() {
  listTask.innerHTML = '';

  taskArray.forEach((task) => {
    const li = document.createElement('li');
    li.className = 'task-item';

    const label = document.createElement('label');
    label.className = 'bar';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done; // сохраняем состояние

    const top = document.createElement('span');
    top.className = 'top';
    const middle = document.createElement('span');
    middle.className = 'middle';
    const bottom = document.createElement('span');
    bottom.className = 'bottom';

    label.appendChild(checkbox);
    label.appendChild(top);
    label.appendChild(middle);
    label.appendChild(bottom);

    const text = document.createElement('span');
    text.className = 'task-text';
    text.textContent = task.text;

    li.appendChild(label);
    li.appendChild(text);

    listTask.appendChild(li);

    checkbox.addEventListener('change', () => {
      task.done = checkbox.checked; // обновляем состояние
      localStorage.setItem('tasks', JSON.stringify(taskArray)); // сохраняем
    });
  });

  localStorage.setItem('tasks', JSON.stringify(taskArray));
  counterTask();
}
function counterTask (){
  const doneTasks = taskArray.filter(task => task.done).length;
  infoCounter.textContent = `All: ${taskArray.length} - Complete: ${doneTasks}`;
}
window.addEventListener('load', () => {
  const savedTasks = JSON.parse(localStorage.getItem('tasks'))
  if (savedTasks) {
    taskArray = savedTasks
    renderList()
  }
})

addBtn.addEventListener('click', ()=> {
    const textInput = inputText.value.trim()
    if(!textInput)
    {
        alert('Введите задачу')
        return
    }
   taskArray.push({ text: textInput, done: false })
   inputText.value = ''
   inputText.focus()
    renderList();
})
clearBtn.addEventListener('click', ()=> {
    taskArray = []        // очищаем массив
    renderList()          // очищаем список на странице
})

