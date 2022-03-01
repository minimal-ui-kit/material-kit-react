import React from 'react'
import { loadConfig } from './index'
import { remotesManager } from '@src/remotes'

export default class ConfigLoader extends React.Component {
  constructor (props) {
    super(props)

    this.state = { isLoaded: false }
  }

  componentDidMount = async () => {
    const config = await loadConfig()

    remotesManager.initialize(config)
    this.setState({ isLoaded: true })
  }

  render () {
    if(!this.state.isLoaded)
      return this.props.loading ? this.props.loading() : null

    return this.props.ready(this.state.config)
  }
}