import { INCREASE_WORK_TIMER, DECREASE_WORK_TIMER, INCREASE_BREAK_TIMER, DECREASE_BREAK_TIMER, ADD_WORK_TIME, SUBTRACT_WORK_TIME, ADD_BREAK_TIME, SUBTRACT_BREAK_TIME, RESET,
//fot todos
ADD_TASK, DELETE_TASK, CLOSE_MODAL, HANDLE_EDIT, HANDLE_INPUT, OPEN_MODAL, LETS_EDIT } from './types'

let initialState = {
    adjustWork: 1500,
    adjustBreak: 300,
    work: 5,
    break: 3,
    isWorking: true,
    running: false,
    task: "",
    editTask: "",
    editId: "",
    todos: [],
    isEdit: false,
    modalOpen: false
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case INCREASE_WORK_TIMER:
            return {
                ...state,
                work: state.work + 60
            }
        case DECREASE_WORK_TIMER:
            return {
                ...state,
                work: state.work - 1,
                isWorking: state.work - 1 > 0
            }
        case INCREASE_BREAK_TIMER:
            return {
                ...state,
                break: state.break + 60
            }
        case DECREASE_BREAK_TIMER:
            return {
                ...state,
                break: state.break - 1
            }
        case ADD_WORK_TIME:
            return {
                ...state,
                adjustWork: state.adjustWork + 60,
                work: state.work + 60
            }
        case SUBTRACT_WORK_TIME:
            return {
                ...state,
                adjustWork: state.adjustWork - 60,
                work: state.work - 60
            }
        case ADD_BREAK_TIME:
            return {
                ...state,
                adjustBreak: state.adjustBreak + 60,
                break: state.break + 60
            }
        case SUBTRACT_BREAK_TIME:
            return {
                ...state,
                adjustBreak: state.adjustBreak - 60,
                break: state.break - 60
            }
        case RESET:
            return {
                ...state,
                work: state.adjustWork,
                break: state.adjustBreak
            }
        case HANDLE_INPUT:
            let { name, value } = action.payload
            return {
                ...state,
                [name]: value
            }
        case ADD_TASK:
            action.payload.task = state.task
            return {
                ...state,
                todos: [action.payload, ...state.todos],
                task: "",
                modalOpen: false
            }
        case DELETE_TASK:
            let allTheOthers = state.todos.filter(todo => todo.id !== action.payload)
            return {
                ...state,
                todos: allTheOthers
            }
        case LETS_EDIT:
            return {
                ...state,
                isEdit: true,
                editId: action.payload.id,
                editTask: action.payload.task
            }
        case HANDLE_EDIT:
            let youvechanged = state.todos.map(todo => {
                if (todo.id === state.editId) {
                    todo.task = state.editTask
                }
                return todo
            })
            return {
                ...state,
                todos: youvechanged,
                isEdit: false,
                editId: "",
                editTask: ""
            }
        case OPEN_MODAL:
            return {
                ...state,
                modalOpen: true
            }
        case CLOSE_MODAL:
            return {
                ...state,
                modalOpen: false
            }
        default:
            return state
    }
}

export default rootReducer