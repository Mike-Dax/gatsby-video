import PropTypes from 'prop-types'
import React from 'react'
import AspectRatioBox from './../AspectRatioBox'

const transparentPixelSrc =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

const Video = ({ poster, className, sources, ...props }) => {
  // Grab the aspect ratio out of the first source
  const aspectRatio = sources[0].aspectRatio

  return (
    <AspectRatioBox aspectRatio={aspectRatio}>
      <div
        style={{
          width: '100%',
          height: '100%',
          ...(poster
            ? {
                background: `url(${poster}) center / contain no-repeat`,
              }
            : {}),
        }}
      >
        <video
          className={className}
          preload
          style={{
            width: '100%',
            height: '100%',
          }}
          {...props}
          poster={transparentPixelSrc}
        >
          {sources.map(s => (
            <source src={s.src} type={`video/${s.fileExtension}`}></source>
          ))}
        </video>
      </div>
    </AspectRatioBox>
  )
}

Video.propTypes = {
  aspectRatio: PropTypes.number.isRequired,
  poster: PropTypes.string,
  className: PropTypes.string,
}

export default Video
