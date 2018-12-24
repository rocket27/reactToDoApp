import React from 'react';
import AppHeader from "../appHeader/appHeader";
import SearchPanel from "../searchPanel/searchPanel";
import ItemStatusFilter from "../itemStatusFilter/itemStatusFilter";
import TodoList from "../todoList/todoList";
import AddItemForm from "../addItemForm/addItemForm";
import './app.css';

export default class App extends React.Component {

    state = {
        todoData: [
            App.createTodoItem('Drink coffee'),
            App.createTodoItem('Write awesome application'),
            App.createTodoItem('Have a fun'),
        ],
        searchString: '',
        filterStatus: 'all'
    };

    static getRandomId() {
        const powX = 10, powY = 12, randomNumber = Math.random();

        return Math.trunc(randomNumber * Math.pow(powX, powY));
    };

    static createTodoItem(taskName) {
        return {
            label: taskName,
            done: false,
            important: false,
            id: App.getRandomId()
        }
    }

    getSearchString = searchString => {
        this.setState({
            searchString
        });
    };

    getSearchResult(todoItems, searchString) {
        if (!searchString) {
            return todoItems;
        }

        const searchResult = todoItems.filter(todoItem => {
            return todoItem.label.toLowerCase().includes(searchString.toLowerCase());
        });

        return searchResult;
    }

    filterItems(todoItems, filter) {
        switch(filter) {
            case 'all': return todoItems;
            case 'active': return todoItems.filter(todoItem => !todoItem.done);
            case "done": return todoItems.filter(todoitem => todoitem.done);
            default: return todoItems;
        }
    }

    setFilterStatus = filterStatus => {
        this.setState({ filterStatus });
    };

    getNewTodoData(itemId, itemProp) {
        return [...this.state.todoData].map(todoItem => {
            if (todoItem.id === itemId) {
                return {
                    ...todoItem,
                    [itemProp]: !todoItem[itemProp]
                }
            } else {
                return todoItem;
            }
        });
    }

    addItem = taskName => {
        const newTaskItem = App.createTodoItem(taskName);

        const newTaskList = [...this.state.todoData, newTaskItem];

        this.setState(() => {
            return {
                todoData: newTaskList
            }
        });
    };

    removeItem = id => {
        let newTodoData = [...this.state.todoData].filter(item => item.id !== id);

        this.setState(() => {
            return {
                todoData: newTodoData
            }
        });
    };

    toggleDone = id => {
        this.setState(() => {
            return {
                todoData: this.getNewTodoData(id, 'done')
            }
        });
    };

    toggleImportant = id => {
        this.setState(() => {
            return {
                todoData: this.getNewTodoData(id, 'important')
            }
        });
    };

    render() {
        const { todoData, searchString, filterStatus } = this.state,
            doneCount = todoData.filter(todoItem => todoItem.done).length,
            todoCount = todoData.length - doneCount;

        const todoItems = this.filterItems(this.getSearchResult(todoData, searchString), filterStatus);

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel onSearchStringChange={ this.getSearchString } />
                    <ItemStatusFilter
                        filterStatus={this.state.filterStatus}
                        onSetFilterStatus={ this.setFilterStatus }
                    />
                </div>
                <TodoList
                    todos={todoItems}
                    onRemoveItem={ this.removeItem }
                    onToggleDone={ this.toggleDone }
                    onToggleImportant={ this.toggleImportant }
                />
                <AddItemForm onAddItem={ this.addItem } />
            </div>
        );
    }
}