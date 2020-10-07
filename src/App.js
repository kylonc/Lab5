import React, { Component } from "react";
import "./App.css";

const default_todoList = [
  {
    content: "Meet with Ken",
    finished: false
  },
  {
    content: "Go to the grocery store",
    finished: true
  },
  {
    content: "Run around Frick Park",
    finished: true
  },
  {
    content: "Remember to buy milk",
    finished: false
  },
  {
    content: "Finish Homework 5",
    finished: false
  }
];

const localStorageName = "todo";

//TODO 3: Make it so that the user's todos load back when they refresh
//Hint: use localStorage.setItem/getItem and JSON.stringify/parse
//  if you mess up setting the local storage you can .clear() it

class App extends Component {
  storedList = localStorage.getItem(localStorageName);
  state = {
    todoList: this.storedList ? JSON.parse(this.storedList) : default_todoList,
    newTodoContent: ""
  };

  toggleDone = (evt, i) => {
    console.log("done", i);
    let todoList = this.state.todoList;
    todoList[i].finished = !todoList[i].finished;
    this.setState({ todoList: todoList });

    window.localStorage.setItem(localStorageName, JSON.stringify(todoList));
  };

  addItem = () => {
    //TODO 1: Make the add button work (hint: this.setState())
    console.log("AddItem", this.state.newTodoContent);
    const { todoList, newTodoContent } = this.state;
    todoList.push({
      content: newTodoContent,
      finished: false
    })
    this.setState({
      todoList
    });

    window.localStorage.setItem(localStorageName, JSON.stringify(todoList));
  };
  deleteItem = (event, i) => {
    //TODO 2: Make the delete button work (hint: event.stopPropagation())
    event.stopPropagation();

    let { todoList } = this.state;
    console.log("Current todo:", todoList);
    todoList.splice(i, 1);
    // todoList.slice(0, i).push(todoList.slice(i + 1, todoList.length));
    console.log("Modified todo:", todoList);
    // console.log("delete", i);
    this.setState({ todoList });

    window.localStorage.setItem(localStorageName, JSON.stringify(todoList));
  };

  render() {
    console.log("rerender");
    console.log(this.state.todoList);
    let list_content = [];
    for (let i = 0; i < this.state.todoList.length; i++) {
      let todo = this.state.todoList[i];
      list_content.push(
        <li
          key={todo.content + "_" + i.toString()}
          onClick={(evt) => this.toggleDone(evt, i)}
        >
          {todo.content}
          {/* Comment: Below the "Done!" icon is conditionally rendered */}
          {todo.finished && <div className="DoneIcon">Done!</div>}
          <div className="Filler"></div>
          <div className="DeleteIcon" onClick={(event) => this.deleteItem(event, i)}>
            {"x"}
          </div>
        </li>
      );
      console.log(todo);
    }

    return (
      <div className="App">
        <div className="Header">
          <h2>Simple To Do</h2>
          <input
            type="text"
            value={this.state.newTodoContent}
            onChange={(evt) => {
              console.log(evt.target.value);
              this.setState({ newTodoContent: evt.target.value });
            }}
            placeholder="new to do...."
          />
          <span onClick={() => this.addItem()} className="AddNewToDoButton">
            Add
          </span>
        </div>
        <ul>{list_content}</ul>
      </div>
    );
  }
}

export default App;
