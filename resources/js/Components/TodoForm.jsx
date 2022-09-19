import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";

const TodoForm = ({ addTodo }) => {
    const [todoInput, setTodoInput] = useState("");

    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setTodoInput({ [name]: value });
    };
    const handleSubmit = (event) => {
        event.preventDefault();

        if (todoInput.title.trim().length === 0) {
            return;
        }

        addTodo(todoInput.title);
        Inertia.post("todo", todoInput);
        setTodoInput("");
    };

    return (
        <div>
            <form action="#" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="todo-input"
                    onChange={handleInput}
                    value={todoInput.title || ""}
                    placeholder="What do you need to do?"
                    name="title"
                />
            </form>
        </div>
    );
};

export default TodoForm;
