import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Button} from 'react-mdl'
import VisualEntity from '../components/VisualEntity'
import * as editorsActions from '../actions/editorsActions'
import * as entityTypes from '../../const/entityTypes'
import * as grammar from  '../../const/grammar'

class VisualizingContainer extends Component {

    constructor(props) {
        super(props)
        this.playDemo = this.playDemo.bind(this)
        this.resetDemo = this.resetDemo.bind(this)
        this.pauseDemo = this.pauseDemo.bind(this)
    }

    componentDidMount() {
        this.props.actions.addNewEntity(entityTypes.SQUARE)
    }

    componentDidUpdate(prevProps) {
        if (this.props.demos.getIn(['1', grammar.RUN_DATA, grammar.RUN_STATUS]) === grammar.RunStatuses.RUNNING) {
            let runNextDemoLine = this.props.actions.runNextDemoLine
            setTimeout(function () {
                runNextDemoLine('1')}, 1100)
        }
    }

    playDemo() {
        this.props.actions.playDemo('1')
    }

    resetDemo() {
        this.props.actions.resetDemo('1')
    }

    pauseDemo() {
        this.props.actions.pauseDemo('1')
    }

    render() {
        return (

            <div className='visualContainer'>
                <div className='toolbar'>
                    <Button style={{minWidth: '0', width: '90px', height: '30px', padding: '2px', lineHeight: '0'}}
                            onClick={this.playDemo}>
                        Play Demo
                    </Button>
                    <Button style={{minWidth: '0', width: '100px', height: '30px', padding: '2px', lineHeight: '0'}}
                            onClick={this.resetDemo}>
                        Reset Demo
                    </Button>
                    <Button style={{minWidth: '0', width: '60px', height: '30px', padding: '2px', lineHeight: '0'}}
                            onClick={this.pauseDemo}>
                        Pause
                    </Button>
                </div>
                <div>
                    {this.props.entities.map((entity) =>
                        <VisualEntity data={entity.get(grammar.PROPERTIES)}/>
                    )}
                    <VisualEntity data={this.props.demos.getIn(['1', grammar.PROPERTIES])} isGhost={true}/>
                </div>
            </div>
        )
    }
}

function select(state) {
    return {
        entities: state.editorsReducer.get(grammar.ENTITIES),
        demos   : state.editorsReducer.get(grammar.DEMOS)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, editorsActions), dispatch)
    }
}

export default connect(
    select,
    mapDispatchToProps
)(VisualizingContainer)