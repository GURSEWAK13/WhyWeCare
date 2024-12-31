const TermsAndConditions = () => {
    return (
      <div className="min-h-screen bg-gray-900">
        {/* Header Banner */}
        <div className="bg-gray-900 py-12">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-4xl font-bold text-white text-center">Terms and Conditions</h1>
            <p className="text-blue-200 text-center mt-4">WhyWeCare Organization - Making a Difference Together</p>
          </div>
        </div>
  
        {/* Main Content */}
        <div className="max-w-5xl mx-auto  py">
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Introduction */}
            <section className="mb-5">
              <h2 className="text-2xl font-semibold text-blue-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                Welcome to WhyWeCare. These terms and conditions outline our commitment to serving the community with integrity, 
                transparency, and dedication. By engaging with our organization, you agree to abide by these terms.
              </p>
            </section>
  
            {/* Core Values and Commitments */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-blue-900 mb-4">2. Our Commitments</h2>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">2.1 Integrity and Honesty</h3>
                  <p className="text-gray-700">We commit to maintaining the highest standards of integrity and honesty in all our operations, financial dealings, and community interactions.</p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">2.2 Professional Conduct</h3>
                  <p className="text-gray-700">Our staff and volunteers pledge to conduct themselves professionally, treating all individuals with respect, dignity, and compassion.</p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">2.3 Non-Discrimination</h3>
                  <p className="text-gray-700">We are committed to providing services without discrimination based on race, religion, gender, age, disability, or socioeconomic status.</p>
                </div>
              </div>
            </section>
  
            {/* Code of Conduct */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-blue-900 mb-4">3. Code of Conduct</h2>
              <ul className="list-disc list-inside space-y-3 text-gray-700">
                <li>Maintain confidentiality of all sensitive information</li>
                <li>Treat all stakeholders with respect and dignity</li>
                <li>Avoid any form of harassment or discriminatory behavior</li>
                <li>Report any unethical behavior or misconduct</li>
                <li>Use organization resources responsibly and ethically</li>
              </ul>
            </section>
  
            {/* Privacy & Data Protection */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-blue-900 mb-4">4. Privacy and Data Protection</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We are committed to protecting your personal information and using it only for intended charitable purposes. 
                All data collection and processing comply with relevant privacy laws and regulations.
              </p>
            </section>
  
            {/* Contact Information */}
            <section className="mt-12 bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-blue-900 mb-4">Temporary Contact Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Main Office</h3>
                  <p className="text-gray-700">123 Charity Lane</p>
                  <p className="text-gray-700">Cityville, State 12345</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Contact Details</h3>
                  <p className="text-gray-700">Email: contact@whywecare.org</p>
                  <p className="text-gray-700">Phone: (555) 123-4567</p>
                  <p className="text-gray-700">Hours: Mon-Fri 9:00 AM - 5:00 PM</p>
                </div>
              </div>
            </section>
  
            {/* Last Updated */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-gray-500 text-sm text-center">
                Last Updated: December 27, 2024
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default TermsAndConditions;