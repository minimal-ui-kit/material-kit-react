import React from 'react'
import { Loader } from '@src/components'
import './Splash.scss'

export default class Splash extends React.Component {
  render () {
    return <div className='root-splash'>
      <Loader />
    </div>
  }
}