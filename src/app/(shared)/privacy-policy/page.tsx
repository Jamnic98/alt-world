import Image from 'next/image'
import Link from 'next/link'

import { imageFolder } from '@/constants'

export default function PrivacyPage() {
  return (
    <div className="flex justify-center py-12 px-8">
      <div className="max-w-6xl w-full px-6 md:px-0 flex flex-col gap-10">
        <div className="flex justify-center items-center py-8">
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

        <h1 className="text-3xl md:text-4xl font-extrabold text-white">Privacy Policy</h1>

        <p className="text-base md:text-lg text-gray-300 leading-relaxed">
          <span className="font-semibold text-white">AltWorld</span> values your privacy. We only
          collect your <strong>name</strong> and <strong>email address</strong> when you sign up for
          our mailing list. This information is used solely to send you updates, news, and relevant
          content from AltWorld.
        </p>

        <div className="flex flex-col gap-6">
          <h2 className="text-xl md:text-2xl font-semibold text-white">How We Use Your Data</h2>
          <p className="text-base md:text-lg text-gray-300 leading-relaxed">
            The data we collect is only used for our mailing list and will
            <strong> never</strong> be shared with third parties. We respect your privacy and ensure
            your information is stored securely.
          </p>

          <h2 className="text-xl md:text-2xl font-semibold text-white">Your Rights</h2>
          <p className="text-base md:text-lg text-gray-300 leading-relaxed">
            You can unsubscribe from our mailing list at any time by clicking the unsubscribe link
            in our emails. You may also request deletion of your data by contacting us at{' '}
            <a
              href="mailto:hello@altworld.net"
              target="_blank"
              className="font-bold underline underline-offset-2 hover:text-gray-100 transition-colors"
            >
              hello@altworld.net
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
