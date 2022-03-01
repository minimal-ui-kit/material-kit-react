import { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import './Loader.scss'

export default class Loader extends Component {
  static propTypes = {
    className: PropTypes.string,
    small: PropTypes.bool,
  }

  render () {
    const { className } = this.props
    /**
     * Loader from @link {https://codemyui.com/material-design-google-loader-in-css/}
     */
    return (
      <div className={cn(className, 'showbox')}>
        <div className='loader'>
          <svg className='circular' viewBox='25 25 50 50'>
            <circle className='path' cx='50' cy='50' r='20' fill='none' strokeWidth='2' strokeMiterlimit='10' />
          </svg>
        </div>
      </div>
    )
  }
}