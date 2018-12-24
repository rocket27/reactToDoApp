import React from 'react';
import TodoListItem from "../todoListItem/todoListItem";
import './todoList.css';

const TodoList = ({ todos, onRemoveItem, onToggleDone, onToggleImportant }) => {

    const elements = todos.map(item => {

        const { id, ...itemProps } = item;

        return (
            <li key={id} className={"list-group-item"}>
                <TodoListItem
                    { ...itemProps }
                    onRemove={() => onRemoveItem(id)}
                    onToggleDone={() => onToggleDone(id)}
                    onToggleImportant={() => onToggleImportant(id)}
                />
            </li>
        );
    });

    return (
        <ul className={"list-group todo-list"}>
            { elements }
        </ul>
    );
};

export default TodoList;