import React from 'react'
import PropTypes from 'prop-types'

import { requestCanceledError, fetchImage } from './utils'

class ImageLoader extends React.PureComponent {
  state = {
    loading: false,
    error: null,
    image: null
  }

  componentDidMount () {
    this.loadImage()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.src !== this.props.src) {
      this.loadImage()
    }
  }

  componentWillUnmount () {
    this.cancelCurrentFetch()
  }

  loadImage = async () => {
    this.cancelCurrentFetch()

    try {
      await this.setLoading(true)

      this.imageLoader = fetchImage(this.props.src)
      const image = await this.imageLoader
      await this.setImage(image)
    } catch (error) {
      if (error === requestCanceledError) { // prevent further state updates when the request was canceled
        return
      }

      await this.setError(error)
    } finally {
      await this.setLoading(false)
    }
  }

  cancelCurrentFetch = () => {
    if (!this.imageLoader || !this.imageLoader.loading()) {
      return
    }

    this.imageLoader.cancel()
    this.imageLoader = null
  }

  setLoading = (loading) => new Promise((resolve, reject) => {
    this.setState(({ error, image }) => ({
      loading,
      error: loading
        ? null
        : error,
      image: loading
        ? null
        : image
    }), () => resolve(loading))
  })

  setError = (error) => new Promise((resolve, reject) => {
    this.setState({
      error
    }, () => resolve(error))
  })

  setImage = (image) => new Promise((resolve, reject) => {
    this.setState({
      image
    }, () => resolve(image))
  })

  render () {
    const { loading, error, image } = this.state
    const renderFunction = this.props.children

    return renderFunction({
      loading,
      error,
      image
    })
  }
}

ImageLoader.propTypes = {
  children: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired
}

export default ImageLoader
