import AspectRatioBox from './../AspectRatioBox'
import React from 'react'

const transparentPixelSrc =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

const Video = React.forwardRef(
  ({ poster, className, sources, ...props }, ref) => {
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
            ref={ref}
          >
            {sources.map(s => (
              <source
                key={s.src}
                src={s.src}
                type={`video/${s.fileExtension}`}
              />
            ))}
          </video>
        </div>
      </AspectRatioBox>
    )
  }
)

export default Video
