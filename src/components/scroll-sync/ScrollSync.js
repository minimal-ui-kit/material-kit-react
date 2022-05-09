import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * ScrollSync provider component
 *
 */

export default class ScrollSync extends Component {

  static propTypes = {
    /**
     * Callback to be invoked any time synchronization happens
     *
     * @param {Element} el The element that has received the scroll event
     */
    onSync: PropTypes.func,
    children: PropTypes.element.isRequired,
    proportional: PropTypes.bool,
    vertical: PropTypes.bool,
    horizontal: PropTypes.bool,
    enabled: PropTypes.bool
  };

  static defaultProps = {
    proportional: true,
    vertical: true,
    horizontal: true,
    enabled: true
  };

  static childContextTypes = {
    registerPane: PropTypes.func,
    unregisterPane: PropTypes.func
  }

  panes = {}

  getChildContext() {
    return {
      registerPane: this.registerPane,
      unregisterPane: this.unregisterPane
    }
  }

  registerPane = (node, groups) => {
    groups.forEach((group) => {
      if (!this.panes[group]) {
        this.panes[group] = []
      }

      if (!this.findPane(node, group)) {
        if (this.panes[group].length > 0) {
          this.syncScrollPosition(this.panes[group][0], node)
        }
        this.panes[group].push(node)
      }
    })
    this.addEvents(node, groups)
  }

  unregisterPane = (node, groups) => {
    groups.forEach((group) => {
      if (this.findPane(node, group)) {
        this.removeEvents(node)
        this.panes[group].splice(this.panes[group].indexOf(node), 1)
      }
    })
  }

  addEvents = (node, groups) => {
    /* For some reason element.addEventListener doesnt work with document.body */
    node.onscroll = this.handlePaneScroll.bind(this, node, groups) // eslint-disable-line
  }

  removeEvents = (node) => {
    /* For some reason element.removeEventListener doesnt work with document.body */
    node.onscroll = null // eslint-disable-line
  }

  findPane = (node, group) => {
    if (!this.panes[group]) {
      return false
    }

    return this.panes[group].find(pane => pane === node)
  }

  handlePaneScroll = (node, groups) => {
    if (!this.props.enabled) {
      return
    }

    window.requestAnimationFrame(() => {
      this.syncScrollPositions(node, groups)
    })
  }

  syncScrollPositions = (scrolledPane, groups) => {
    groups.forEach((group) => {
      this.panes[group].forEach((pane) => {
        /* For all panes beside the currently scrolling one */
        if (scrolledPane !== pane) {
          /* Remove event listeners from the node that we'll manipulate */
          this.removeEvents(pane, group)
          this.syncScrollPosition(scrolledPane, pane)
          /* Re-attach event listeners after we're done scrolling */
          window.requestAnimationFrame(() => {
            this.addEvents(pane, groups)
          })
        }
      })
    })
    if (this.props.onSync) this.props.onSync(scrolledPane)
  }

  syncScrollPosition(scrolledPane, pane) {
    const {
      scrollTop,
      scrollHeight,
      clientHeight,
      scrollLeft,
      scrollWidth,
      clientWidth
    } = scrolledPane

    const scrollTopOffset = scrollHeight - clientHeight
    const scrollLeftOffset = scrollWidth - clientWidth

    const { proportional, vertical, horizontal } = this.props

    /* Calculate the actual pane height */
    const paneHeight = pane.scrollHeight - clientHeight
    const paneWidth = pane.scrollWidth - clientWidth
    /* Adjust the scrollTop position of it accordingly */
    if (vertical && scrollTopOffset > 0) {
      pane.scrollTop = proportional ? (paneHeight * scrollTop) / scrollTopOffset : scrollTop // eslint-disable-line
    }
    if (horizontal && scrollLeftOffset > 0) {
      pane.scrollLeft = proportional ? (paneWidth * scrollLeft) / scrollLeftOffset : scrollLeft // eslint-disable-line
    }
  }

  render() {
    return React.Children.only(this.props.children)
  }
}
