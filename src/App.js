import { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { initSecurity, selectAuthModel } from '@src/store'
import { Loader } from '@src/components'
import { MainPage } from './pages'
import './App.scss'

class App extends Component {
  static propTypes = {
    auth: PropTypes.object,
    initSecurity: PropTypes.func,
    authModel: PropTypes.shape({
      loaded: PropTypes.bool,
      loading: PropTypes.bool,
      error: PropTypes.string,
      payload: PropTypes.object,
    }),
  }

  componentDidMount () {
    const params = new URLSearchParams(window.location.search)
    const authCode = params.get('code')
    this.props.initSecurity(authCode)
  }

  render () {
    const { authModel } = this.props

    return (
      <BrowserRouter>
        <Switch>
          <Route path='/'>
            {
              authModel.loading || !authModel.loaded
                ? <div className='app-loading'>
                  <Loader />
                </div>
                : <MainPage auth={authModel.payload}></MainPage>
            }
          </Route>
        </Switch>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = state => ({ authModel: selectAuthModel(state) })

const mapDispatchToProps = { initSecurity }

export default connect(mapStateToProps, mapDispatchToProps)(App)