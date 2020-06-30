import React, { Fragment } from 'react'

const NotFound = () => {
  return (
    <Fragment>
      <h1 className='text-primary'>
        <i className="fas fa-exclamation-triangle">
        </i>
        {' '} Page Not Found...
      </h1>
    </Fragment>
  )
}

export default NotFound
