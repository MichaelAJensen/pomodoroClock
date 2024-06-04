import React from "react"
import { connect } from 'react-redux'
import { decreaseBreakTimer, decreaseWorkTimer, reset } from './redux/actions'
import Work from "./components/Work"
import Break from "./components/Break"
import audio from "./assets/Alarm-clock- sound.mp3"
import * as video from './assets/pexels-rostislav-uzunov-7670835.mp4'
import Header from "./components/Header"
import Main from "./components/Main"


class App extends React.Component {
    constructor(props) {
        super(props)
        this.startTimer = this.startTimer.bind(this)
        this.stopTimer = this.stopTimer.bind(this)
        this.alarm = this.alarm.bind(this)
        this.again = this.again.bind(this)
    }
    componentDidMount() {
        document.addEventListener('click', () => {

            document.getElementById('video').play()
        })
    }

    startTimer() {

        this.timer = setInterval(() => {
            if (this.props.work == 0 && this.props.break == 0) {
                this.stopTimer()
                this.again()
                return this.stopTimer()
            }
            if (this.props.isWorking) {
                this.props.decreaseWorkTimer()
            } else {
                this.props.decreaseBreakTimer()
            }
        }, 1000)
    }
    again() {

        this.props.reset()
        this.startTimer()
    }

    stopTimer() {
        clearInterval(this.timer)
    }

    alarm() {
        let audio1 = new Audio(audio)
        audio1.play()
        setTimeout(() => {
            audio1.pause()

        }, 3000)
    }

    render() {
        return (
            <div className="app-wrapper">
                <video className="bgVideo" id="video" src={video.default} controls={false} autoPlay={true} loop={true} />

                <div className="mainList">
                    <Header
                        className="headerTime"
                        title="Today's Work"
                    />
                    <Main
                        className="mainTime" />
                </div>

                <div className="workTime">
                    <Work
                        alarm={this.alarm}
                    />
                </div>
                <div className="breakTime">
                    <Break
                        alarm={this.alarm}
                    />
                </div>

                <div className="currentSession">
                    <h1 className="clockName">Pomodoro Clock</h1>
                    <h1>Current Session </h1>
                    <br />
                    <h2>Work: {Math.floor(this.props.work / 60)}:
                        {this.props.work % 60 < 10 ? '0'
                            + this.props.work % 60
                            : this.props.work % 60}
                    </h2>

                    <h2>Break: {Math.floor(this.props.break / 60)}:{
                        this.props.break % 60 < 10 ? '0' + this.props.break % 60 : this.props.break % 60}</h2>
                    <button onClick={this.startTimer}>Start Time</button>
                    <button onClick={this.stopTimer}>Stop Time</button>
                    <br />
                    <button onClick={this.props.reset}>Reset
                    </button>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isWorking: state.isWorking,
        work: state.work,
        break: state.break
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        decreaseWorkTimer: () => dispatch(decreaseWorkTimer()),
        decreaseBreakTimer: () => dispatch(decreaseBreakTimer()),
        reset: () => dispatch(reset())

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)