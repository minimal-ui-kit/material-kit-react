import { Component } from 'react'
import { Router } from '@src/routes'
import { ThemeConfig } from '@src/theme'
import { GlobalStyles } from '@src/theme/globalStyles'
import { ScrollToTop } from '@src/components/ScrollToTop'
import { BaseOptionChartStyle } from '@src/components/charts/BaseOptionChart'

export default class MainPage extends Component {
  render () {
    return (
      <ThemeConfig>
        <ScrollToTop />
        <GlobalStyles />
        <BaseOptionChartStyle />
        <Router />
      </ThemeConfig>
    )
  }
}