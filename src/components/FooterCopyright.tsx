'use client'

import { useState } from 'react'

const FooterCopyright = () => {
  const [year] = useState(new Date().getFullYear())

  return (
    <div className="mt-12  pt-6 text-center text-gray-500 text-sm">
      &copy; {year} AltWorld. All rights reserved.
    </div>
  )
}

export default FooterCopyright
