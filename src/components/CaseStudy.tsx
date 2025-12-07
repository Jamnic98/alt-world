import Image from 'next/image'

import { ImageSlideshow } from '@/components'

interface CaseStudyProps {
  title: string
  description?: string
  imageSrcList: { src: string }[]
}

const CaseStudy: React.FC<CaseStudyProps> = ({ title, /* description */ imageSrcList }) => {
  return (
    <div className="flex flex-col gap-10 px-6 py-16 mx-auto">
      {/* <h1 className="text-3xl font-extrabold text-white md:text-4xl">{title}</h1> */}

      <div className="flex justify-center w-full max-h-30">
        <Image
          src={title}
          alt=""
          width={300}
          height={200}
          placeholder="empty"
          priority
          className="object-contain w-auto h-full"
        />
      </div>

      {/* <p className="text-base leading-relaxed text-gray-300 md:text-lg">{description}</p> */}

      <ImageSlideshow images={imageSrcList} />
    </div>
  )
}

export default CaseStudy
