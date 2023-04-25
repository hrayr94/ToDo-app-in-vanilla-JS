const root = document.getElementById("root");

function TodoFooter(todos, onChacge) {
  const container = document.createElement("div");
  const completed = todos.filter((todo) => todo.compleated === true).length;
  container.innerHTML = `
      <span> ${completed} / ${todos.length} Completed </span>
      <button>Clear Compleated </button>
    `;
  const btn = container.querySelector("button");
  btn.addEventListener("click", () => {
    onChacge(todos.filter((todo) => todo.compleated === false));
  });
  return container;
}

function TodoForm(add) {
  const container = document.createElement("form");

  container.innerHTML = `
    <input type="text" />
    <button>Add</button>
    `;

  container.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = container.querySelector("input").value;
    add(value);
  });
  return container;
}

function ListItem(todo, onChacge) {
  const container = document.createElement("div");
  container.innerHTML = `
    <label>
        <input type="checkbox" ${todo.compleated ? "checked" : ""} />
        ${todo.label}
    </label>
    `;

  const input = container.querySelector("input");
  input.addEventListener("change", (e) => {
    onChacge(e.target.checked);
  });
  return container;
}

function List(todos, onChacge) {
  const container = document.createElement("div");
  todos
    .map((todo) => {
      return ListItem(todo, (change) => {
        todo.compleated = change;
        onChacge();
      });
    })
    .forEach((el) => {
      container.appendChild(el);
    });
  return container;
}

function App() {
  let todos = [
    { label: "Learn JS", compleated: false },
    { label: "Learn Node", compleated: false },
    { label: "Learn CSS", compleated: false },
  ];
  const container = document.createElement("div");
  function render() {
    container.innerHTML = "";
    container.appendChild(
      TodoForm(function (newText) {
        todos.push({
          label: newText,
          compleated: false,
        });
        render();
      })
    );
    container.appendChild(
      List(todos, () => {
        render();
      })
    );
    container.appendChild(
      TodoFooter(todos, (newTodos) => {
        todos = newTodos;
        render();
      })
    );
  }
  render();
  return container;
}

root.appendChild(App());
