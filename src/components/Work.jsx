import { connect } from "react-redux"
import { addWorkTime } from "../redux/actions"
import { subtractWorkTime } from "../redux/actions"


const Work = (props) => {
    if (props.work ===1) {
        props.alarm()
    }
    return (
        <div>
            <h1>Work Time</h1>
            <button
                onClick={props.addWorkTime}
            >➕
            </button>
            <h3>
                {/* {console.log(props.work)} */}
                {Math.floor(props.adjustWork / 60)}:00
                {/* :{props.adjustWork % 60 < 10 ? '0' + props.adjustWork % 60 : props.adjustWork % 60} */}
            </h3>
            <button
                onClick={props.subtractWorkTime}
            >➖
            </button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        ...state,
        adjustWork: state.adjustWork,
        isRunning: state.isRunning,
        work: state.work
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addWorkTime: () => dispatch(addWorkTime()),
        subtractWorkTime: () => dispatch(subtractWorkTime()),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Work)