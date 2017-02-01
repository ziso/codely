import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import VisualizingContainer from '../editors/containers/VisualizingContainer'
import CodingContainer from '../editors/containers/CodingContainer'
import '../styles/main.scss'
import 'react-mdl/extra/material.css'
import 'react-mdl/extra/material.js'

class AppContainer extends Component {
  static propTypes = {
    store  : PropTypes.object.isRequired
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    const { store } = this.props

    return (
      <Provider store={store}>
        <div className='mainContainer'>
          <VisualizingContainer/>
          <CodingContainer/>
        </div>
      </Provider>
    )
  }
}

export default AppContainer
