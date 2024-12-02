import React from 'react'

const CompassIcon = ({ width="90" }) => {
  return (
      <svg className="!text-gray-500/50" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" width={width} height={width}>
          <path d="M5.618 9.382l1.255-2.51 2.509-1.254-1.255 2.51-2.509 1.254z" fill="currentColor"></path>
          <path fill-rule="evenodd" clip-rule="evenodd"
                d="M0 7.5a7.5 7.5 0 1115 0 7.5 7.5 0 01-15 0zm10.947-2.776a.5.5 0 00-.67-.671l-4 2a.5.5 0 00-.224.223l-2 4a.5.5 0 00.67.671l4-2a.5.5 0 00.224-.223l2-4z"
                fill="currentColor"></path>
      </svg>
  )
}

export default CompassIcon