import Image from 'next/image'

import { ImageSlideshow } from '@/components'

interface CaseStudyProps {
  titleImageSrc: string
  imageDims: {
    width: number
    height: number
  }
  imageSrcList: { src: string }[]
}

const CaseStudy: React.FC<CaseStudyProps> = ({ titleImageSrc, imageDims, imageSrcList }) => {
  return (
    <div className="flex flex-col gap-10 px-6 py-16 mx-auto">
      <div className="flex justify-center w-full max-h-30">
        <Image
          src={titleImageSrc}
          alt="Case study image"
          width={imageDims.width}
          height={imageDims.height}
          placeholder="empty"
          priority
          className="object-contain w-auto h-full"
        />
      </div>

      <ImageSlideshow images={imageSrcList} />
    </div>
  )
}

export default CaseStudy
