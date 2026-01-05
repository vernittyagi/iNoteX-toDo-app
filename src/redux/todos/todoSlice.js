import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    toDos: [],
    showFinishedTodos: false,
    editId: null,
    isLoaded: false
};

export const counterSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        loadTodos: (state, action) => {
            state.toDos = action.payload;
            state.isLoaded = true
        },
        addTodo: (state, action) => {
            state.toDos.push(action.payload)
        },
        updateTodo: (state, action) => {
            const { id, text } = action.payload;
            const todo = state.toDos.find(t => t.id === id);
            if (todo) todo.todo = text;
            state.editId = null;
        },
        toggleTodo: (state, action) => {
            const todo = state.toDos.find(t => t.id === action.payload)
            if (todo) todo.isCompleted = !todo.isCompleted
        },
        deleteTodo: (state, action) => {
            state.toDos = state.toDos.filter(t => t.id != action.payload);
        },
        setEditId: (state, action) => {
            state.editId = action.payload;
        },
        toggleShowFinished: (state) => {
            state.showFinishedTodos = !state.showFinishedTodos;
        }
    }, 
})

// Action creators are generated for each case reducer function
export const { loadTodos,
    addTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
    setEditId,
    toggleShowFinished } = counterSlice.actions

export default counterSlice.reducer