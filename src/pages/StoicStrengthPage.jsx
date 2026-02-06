import { Link } from 'react-router-dom';
import { Brain, ArrowLeft, CheckCircle } from 'lucide-react';
import { stoicSyllabus } from '../data/philosophyGymData.js';

export default function StoicStrengthPage() {
  return (
    <div className="min-h-screen bg-white text-sky-600" style={{ fontFamily: 'cursive' }}>
      <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center space-x-2 hover:text-sky-500 transition-colors">
              <ArrowLeft size={24} />
              <span>Back to Programs</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Brain className="text-sky-500" size={32} />
              <div className="text-2xl font-light italic">
                <span className="text-sky-500">Philosophy Gymnasium</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-16 px-4 bg-gradient-to-br from-sky-50 to-white">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-sky-500">Stoic Strength</h1>
          <p className="text-xl md:text-2xl text-sky-700 mb-8 max-w-3xl mx-auto">
            {stoicSyllabus.overview}
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-lg">
            <div className="bg-white border border-sky-200 rounded-lg px-6 py-3">
              <span className="text-sky-500 font-bold">Duration:</span> {stoicSyllabus.duration}
            </div>
            <div className="bg-white border border-sky-200 rounded-lg px-6 py-3">
              <span className="text-sky-500 font-bold">Level:</span> {stoicSyllabus.level}
            </div>
            <div className="bg-white border border-sky-200 rounded-lg px-6 py-3">
              <span className="text-sky-500 font-bold">Price:</span> ₹3,500/month
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-sky-500">Complete Syllabus</h2>

          <div className="space-y-8">
            {stoicSyllabus.modules.map((module, index) => (
              <div
                key={module.title}
                className="bg-white border border-sky-200 rounded-xl p-8 hover:border-sky-500 transition-all shadow-lg"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-sky-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-sky-500 font-semibold mb-1">{module.week}</div>
                    <h3 className="text-2xl font-bold text-sky-600 mb-2">{module.title}</h3>
                    <div className="bg-sky-50 border-l-4 border-sky-500 p-4 mb-4">
                      <p className="text-sky-700 italic">
                        <span className="font-semibold">Philosophy:</span> {module.philosophy}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sky-600 mb-2">Training Focus:</h4>
                      <ul className="space-y-2">
                        {module.training.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sky-700">
                            <CheckCircle size={20} className="text-sky-500 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-sky-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-sky-500">What's Included</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {stoicSyllabus.included.map((item) => (
              <div
                key={item}
                className="bg-white border border-sky-200 rounded-lg p-6 flex items-start gap-3 hover:border-sky-500 transition-all"
              >
                <CheckCircle size={24} className="text-sky-500 flex-shrink-0" />
                <span className="text-sky-700 text-lg">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-sky-500">Ready to Begin Your Journey?</h2>
          <p className="text-xl text-sky-700 mb-8">
            Join us and discover the power of combining ancient wisdom with modern strength training.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/#contact"
              className="bg-sky-500 text-white px-8 py-4 rounded-full font-bold hover:bg-sky-600 transition-all transform hover:scale-105 shadow-lg"
            >
              Enroll Now
            </a>
            <Link
              to="/"
              className="border-2 border-sky-500 text-sky-600 px-8 py-4 rounded-full font-bold hover:bg-sky-500 hover:text-white transition-all transform hover:scale-105"
            >
              View All Programs
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-sky-200 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-sky-600">
          <p>&copy; 2026 Philosophy Gymnasium Kolkata. All rights reserved.</p>
          <p className="mt-2">Mens sana in corpore sano - A healthy mind in a healthy body.</p>
        </div>
      </footer>
    </div>
  );
}
