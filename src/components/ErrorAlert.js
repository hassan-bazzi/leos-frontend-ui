import React from 'react';

export default function ErrorAlert({title, error}) {
  return (
    <div className="p-4 bg-red-100 rounded-md">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800 leading-5">
            {title}
          </h3>
          <div className="mt-2 text-sm text-red-700 leading-5">
            <ul className="pl-5 list-disc">
              <li>
                {error}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}