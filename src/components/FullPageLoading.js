import React from 'react';

import loadingGif from '../assets/images/icons/loader.gif';

export default function FullPageLoading() {
  return (
      <div className='z-50 flex flex-col items-center justify-center w-full h-screen bg-white opacity-75'>
          <div><img alt='Loading' src={loadingGif} className="w-40 rounded-lg" /></div>
      </div>
  )
}