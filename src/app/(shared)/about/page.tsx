import Image from 'next/image'
import Link from 'next/link'

import { imageFolder } from '@/constants'

export default function AboutPage() {
  return (
    <div className="flex justify-center p-8">
      <div className="max-w-4xl w-full px-6 md:px-0 flex flex-col gap-8">
        <div className="flex justify-center items-center py-16">
          <Link
            href="/"
            aria-label="AltWorld Home"
            className="cursor-pointer transform transition-transform duration-200 hover:scale-105"
          >
            <Image
              src={`${imageFolder}/titles/altworld.webp`}
              alt="AltWorld"
              width={500}
              height={500}
              placeholder="empty"
              priority
              className="object-contain"
            />
          </Link>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-white">About Us</h1>

        <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
          At <span className="font-semibold text-white">Alt World</span>, we take the word platform
          seriously. To us, platforming means creating real, intentional spaces for underrepresented
          brands and creatives to be seen, heard, and valued. Through knowledge exchange, panel
          discussions, curated features, and global events, we spotlight BIPOC talent across
          fashion, beauty, music, and wellness — both online and in person. From London to Accra,
          we’ve championed emerging voices and culture-shifting brands by giving them the
          visibility, tools, and networks they need to thrive. This isn’t just exposure — it’s
          elevation.
        </p>
      </div>
    </div>
  )
}
