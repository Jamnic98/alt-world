export default function PrivacyPage() {
  return (
    <div className="flex justify-center py-16">
      <div className="max-w-xl w-full px-6 md:px-0 flex flex-col gap-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 text-center">
          Privacy Policy
        </h1>

        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
          <span className="font-semibold">AltWorld</span> values your privacy. We only collect your{' '}
          <strong>name</strong> and <strong>email address</strong> when you sign up for our mailing
          list. This information is used solely to send you updates, news, and relevant content from
          AltWorld.
        </p>

        <div className="flex flex-col gap-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">How We Use Your Data</h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            The data we collect is only used for our mailing list and will <strong>never</strong> be
            shared with third parties. We respect your privacy and ensure your information is stored
            securely.
          </p>

          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">Your Rights</h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            You can unsubscribe from our mailing list at any time by clicking the unsubscribe link
            in our emails. You may also request deletion of your data by contacting us.
          </p>

          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">Contact Us</h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            If you have any questions about our Privacy Policy or the data we collect, please
            contact us at <strong>hello@altworld.net</strong>.
          </p>
        </div>
      </div>
    </div>
  )
}
