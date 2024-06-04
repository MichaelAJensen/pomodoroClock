import React from "react"
import Form from "./Form"
import ListItem from "./ListItem"
import { connect } from "react-redux"
import { handleEdit } from "../redux/actions"


const List = (props) => {
    return (
        <div className="list-wrapper">
            {props.app.todos.length > 0 ?
                props.app.todos.map(todo => {

                    return (
                        <ul
                            key={todo.id}
                        >
                            {
                                props.app.isEdit && props.app.editId === todo.id ?
                                    <li>
                                        <Form
                                            className="list-form"
                                            labelTxt="Task to change: "
                                            name="editTask"
                                            genericHandler={props.handleEdit} value={props.app.editTask}
                                            btnTxt="ADD"
                                        />
                                    </li>

                                    :
                                    <ListItem
                                        todo={todo} />
                            }
                        </ul>
                    )
                }) :
                <h3>NO MORE WORK!!</h3>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        app: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleEdit: () => dispatch(handleEdit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)