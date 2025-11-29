import { ImageSlideshow } from '@/components'

interface CaseStudyProps {
  title: string
  description: string
  imageSrcList: { src: string; alt?: string }[]
}

const CaseStudy: React.FC<CaseStudyProps> = ({ title, description, imageSrcList }) => {
  return (
    <div className="flex flex-col gap-10 py-12 max-w-5xl mx-auto px-6">
      <h1 className="text-3xl md:text-4xl font-extrabold text-white">{title}</h1>

      <p className="text-base md:text-lg text-gray-300 leading-relaxed">{description}</p>

      <ImageSlideshow images={imageSrcList} />
    </div>
  )
}

export default CaseStudy
