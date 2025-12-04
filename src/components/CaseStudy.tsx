import Image from 'next/image'

import { ImageSlideshow } from '@/components'

interface CaseStudyProps {
  title: string
  description: string
  imageSrcList: { src: string; alt?: string }[]
}

const CaseStudy: React.FC<CaseStudyProps> = ({ title, description, imageSrcList }) => {
  return (
    <div className="flex flex-col max-w-5xl gap-10 px-6 py-12 mx-auto">
      {/* <h1 className="text-3xl font-extrabold text-white md:text-4xl">{title}</h1> */}

      <Image
        src={title}
        alt=""
        width={200}
        height={200}
        placeholder="empty"
        priority
        className="object-contain"
      />

      <p className="text-base leading-relaxed text-gray-300 md:text-lg">{description}</p>

      <ImageSlideshow images={imageSrcList} />
    </div>
  )
}

export default CaseStudy
