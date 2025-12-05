import Image from 'next/image'

import { ImageSlideshow } from '@/components'

interface CaseStudyProps {
  title: string
  description?: string
  imageSrcList: { src: string }[]
}

const CaseStudy: React.FC<CaseStudyProps> = ({ title, /* description */ imageSrcList }) => {
  return (
    <div className="flex flex-col max-w-5xl gap-10 px-6 py-12 mx-auto">
      {/* <h1 className="text-3xl font-extrabold text-white md:text-4xl">{title}</h1> */}

      <div className="flex flex-row justify-center">
        <Image
          src={title}
          alt=""
          width={300}
          height={200}
          placeholder="empty"
          priority
          className="object-contain"
        />
      </div>

      {/* <p className="text-base md:text-lg text-gray-300 leading-relaxed">{description}</p> */}

      <ImageSlideshow images={imageSrcList} />
    </div>
  )
}

export default CaseStudy
