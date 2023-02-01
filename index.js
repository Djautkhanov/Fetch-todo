const form = document.querySelector("form");
const input = document.querySelector(".inp");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTask();
});

async function getContent() {
  try {
    const data = await fetch("https://jsonplaceholder.typicode.com/todos");
    var content = await data.json();

    const container = document.querySelector("#container");

    for (let i = 0; i < content.length; i++) {
      const block = document.createElement("div");
      const taskText = document.createElement("div");
      const btnDelete = document.createElement("button");
      const checkbox = document.createElement("input");

      taskText.textContent = content[i].title;
      btnDelete.textContent = "❌";
      checkbox.type = "checkbox";
      checkbox.checked = content[i].completed;

      block.classList.add("block");

      btnDelete.addEventListener("click", () => {
        remove(content[i].id, btnDelete);
      });

      checkbox.addEventListener("click", () => {
        checkTodo(content[i].id);
      });

      if (content[i].completed) {
        taskText.classList.add("task-done");
      }

      block.append(checkbox, taskText, btnDelete);

      container.append(block);
    }
  } catch (error) {}
}
getContent();

async function addTask() {
  try {
    if (input.value) {
      await fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        body: JSON.stringify({
          title: input.value,
          completed: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      input.value = "";

      return alert("Добавлено");
    }
  } catch (error) {
    return alert(error);
  }
}

async function remove(id, node) {
  try {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE",
    });
    await node.parentNode.remove();
  } catch (error) {
    return alert(error);
  }
}
async function checkTodo(id) {
  try {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        completed: true,
      }),
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    return alert(error);
  }
}
