taskArray = []
const inputText = document.getElementById('task-input')
const addBtn = document.getElementById('add-btn')
const clearBtn = document.getElementById('clear-btn')
const listTask = document.getElementById('task-list')
const infoCounter = document.getElementById('info')
function renderList() {
  listTask.innerHTML = '';

  taskArray.forEach((task, idx) => {
    const li = document.createElement('li');
    li.className = 'task-item';

    // Левая часть: чекбокс и текст
    const leftBox = document.createElement('div');
    leftBox.className = 'task-left';

    const label = document.createElement('label');
    label.className = 'bar';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;

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

    if (task.done) {
      text.classList.add('done');
    } else {
      text.classList.remove('done');
    }

    leftBox.appendChild(label);
    leftBox.appendChild(text);

    // Кнопка удаления
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = `
      <svg viewBox="0 0 15 17.5" height="17.5" width="15" xmlns="http://www.w3.org/2000/svg" class="icon">
        <path transform="translate(-2.5 -1.25)" d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z" id="Fill"></path>
      </svg>
    `;

    deleteBtn.addEventListener('click', () => {
      taskArray.splice(idx, 1);
      localStorage.setItem('tasks', JSON.stringify(taskArray));
      renderList();
    });

    li.appendChild(leftBox);
    li.appendChild(deleteBtn);

    listTask.appendChild(li);

    checkbox.addEventListener('change', () => {
      task.done = checkbox.checked;
      localStorage.setItem('tasks', JSON.stringify(taskArray));
      if (checkbox.checked) {
        text.classList.add('done');
      } else {
        text.classList.remove('done');
      }
      counterTask();
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

