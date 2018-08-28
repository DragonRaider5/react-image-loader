# react-image-loadr

A simple component for asynchronous image loading in React.

It uses the [render prop](https://reactjs.org/docs/render-props.html) pattern to
provide you with the current loading state of your image.


## Example

```javascript
import React from 'react'
import ImageLoader from 'react-image-loadr'

import ErrorComponent from './error'
import LoaderComponent from './loader'

export default ({ src }) => (
  <ImageLoader src={src}>
    { ({ loading, image, error }) => {
      if (error) {
        return <ErrorComponent error={error} />
      }

      if (loading) {
        return <LoaderComponent />
      }

      return (
        <img src={image} alt='My asynchronously loaded image' />
      )
    } }
  </ImageLoader>
)
```

This example code renders the `ErrorComponent` if an error occurred (passing it
the error which was thrown), the `LoaderComponent` while the image is beeing loaded
and the image when it finished loading.


## API

### Component Properties

Property | Description | Example
--- | --- | ---
`src` | The image source you'd normally pass to your `img` tag - most of the times the link to your image. | `'/assets/img.png'`
`children` | Your render function. See the [following spec](#rendering-function-arguments) for details on the passed data. | `({ image, loading }) => !loading && <img src={image} />`

### Rendering function arguments

`react-image-loadr` passes an object containing the current fetching state to
your rendering function. It provides you with the follwing data:

Key | Description | Type
--- | --- | ---
`image` | The fetched image or null if the fetching failed/hasn't finished yet. | <code>Image &#124;&#124; null</code>
`loading` | Wether or not the image is currently loading. | `Boolean`
`error` | If an error was thrown while fetching, it gets passed under this key. | <code>Error &#124;&#124; null</code>


## Feature Requests

If there is any feature you'd like to see for this component, reach out to me
using the issues and mark it a `[FEATURE REQUEST]` using the issue title.
I'll try to respond as fast as possible.


## Contributing

Any contributions (code improvements, feature implementations) are welcome.
Just open a PR with your changes and a small description or the reference to an
issue. I'll look to review it - as fast as possible as well.

**Thanks in advance and have fun using this component!**
