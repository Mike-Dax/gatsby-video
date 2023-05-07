# gatsby-video

A basic video component that consumes `gatsby-transformer-ffmpeg` locally hosted videos. It forwards its ref.

## Install

`npm install --save gatsby-video gatsby-transformer-ffmpeg gatsby-plugin-ffmpeg`

## How to use

```javascript
// In your gatsby-config.js
module.exports = {
  plugins: [`gatsby-transformer-ffmpeg`],
}
```

Create a pageQuery or static query to grab the video you're interested in.

```javascript
export const pageQuery = graphql`
  {
    file(relativePath: { eq: "features/arc-init.mov" }) {
      childVideoFfmpeg {
        webm: transcode(
          outputOptions: ["-crf 20", "-b:v 0"]
          maxWidth: 900
          maxHeight: 480
          fileExtension: "webm"
          codec: "libvpx-vp9"
        ) {
          width
          src
          presentationMaxWidth
          presentationMaxHeight
          originalName
          height
          fileExtension
          aspectRatio
        }
        mp4: transcode(
          maxWidth: 900
          maxHeight: 480
          fileExtension: "mp4"
          codec: "libx264"
        ) {
          width
          src
          presentationMaxWidth
          presentationMaxHeight
          originalName
          height
          fileExtension
          aspectRatio
        }
      }
    }
  }
`
```

Grab the data in your component and then pass it to the video component.

```javascript

import { Video } from 'gatsby-video'
import poster_image from './poster.png'

const MainPageVideo = props => {
  const videos = props.data.file.childVideoFfmpeg

  return (
    <Video
      poster={poster_image}
      autoPlay
      muted
      loop
      sources={[videos.webm, videos.mp4]}
    />
  )
}
```

## Thanks

The video and aspect ratio components are based on these:

https://github.com/simonyiszk/konferencia-web-2018/

## Funding

<p align="center">
<a href="https://electricui.com/">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://electricui.com/web_static/monochrome-logotype.svg">
  <img alt="Electric UI" src="https://electricui.com/web_static/logotype.svg" width="500">
</picture>
</a>
</p>

---

Work on `gatsby-video` is funded by [Electric UI](https://electricui.com). If you need to design an [Arduino GUI](https://electricui.com/hello/arduino), want [visualisations for a complex robotics system](https://electricui.com/features) or generally need a [user interface for your hardware project](https://electricui.com/features), please take a look at the website.
