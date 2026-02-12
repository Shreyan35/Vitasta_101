import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, MapPin, Clock, Phone, Instagram, Facebook } from 'lucide-react';
import { article, programs, rotatingTexts, services } from '../data/philosophyGymData.js';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [rotatingTextIndex, setRotatingTextIndex] = useState(0);
  const [activeService, setActiveService] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [programTab, setProgramTab] = useState('individual');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    phone: '',
    message: ''
  });
  const [visibleSections, setVisibleSections] = useState({
    whatwedo: false,
    wisdom: false,
    research: false,
    programs: false,
    efs: false,
    contact: false
  });

  const individualPrograms = useMemo(
    () => programs.filter((program) => program.type === 'individual'),
    []
  );
  const enterprisePrograms = useMemo(
    () => programs.filter((program) => program.type === 'enterprise'),
    []
  );
  const dailySessions = useMemo(
    () => individualPrograms.filter((program) => program.category === 'daily'),
    [individualPrograms]
  );
  const yogaCourses = useMemo(
    () => individualPrograms.filter((program) => program.category === 'yoga'),
    [individualPrograms]
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 400);

      const sections = ['whatwedo', 'wisdom', 'research', 'programs', 'efs', 'contact'];
      const newVisibility = {};

      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight * 0.75;
          newVisibility[id] = isVisible;
        }
      });

      setVisibleSections((prev) => ({ ...prev, ...newVisibility }));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 5);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setRotatingTextIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 5);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 5) % 5);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const payload = await response.json();
        throw new Error(payload?.message || 'Unable to submit enquiry.');
      }

      setFormStatus({
        type: 'success',
        message: 'Thanks for reaching out. We will respond shortly.'
      });
      setFormData({ email: '', firstName: '', phone: '', message: '' });
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: error.message || 'Something went wrong. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen text-black"
      style={{
        fontFamily: 'cursive',
        background:
          'linear-gradient(135deg, #e8dfd0 0%, #d4c5b0 25%, #e0d5c5 50%, #cfc0ad 75%, #e8dfd0 100%)',
        position: 'relative'
      }}
    >
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.15,
          pointerEvents: 'none',
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'repeat',
          zIndex: 1
        }}
      ></div>

      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.08,
          pointerEvents: 'none',
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20,10 Q30,20 40,10 T60,10' stroke='%23000' stroke-width='0.5' fill='none' opacity='0.3'/%3E%3Cpath d='M80,30 L85,50 L90,35' stroke='%23000' stroke-width='0.3' fill='none' opacity='0.2'/%3E%3Cpath d='M120,5 Q125,25 130,15' stroke='%23000' stroke-width='0.4' fill='none' opacity='0.25'/%3E%3Cpath d='M10,100 L15,120 L12,140' stroke='%23000' stroke-width='0.3' fill='none' opacity='0.2'/%3E%3Cpath d='M150,80 Q160,90 170,85' stroke='%23000' stroke-width='0.5' fill='none' opacity='0.3'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'repeat',
          zIndex: 1
        }}
      ></div>

      <div
        className="fixed left-0 top-0 h-full items-center z-10 hidden md:flex"
        style={{
          paddingLeft: '2rem',
          writingMode: 'vertical-rl',
          textOrientation: 'mixed'
        }}
      >
        <div className="flex flex-col gap-12 text-black opacity-40 font-light italic text-lg">
          <span>φρόνησις</span>
          <span>Δύναμις</span>
          <span>Ἀρετή</span>
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 2 }}>
        <nav
          className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'shadow-lg' : ''}`}
          style={{
            backgroundColor: scrolled ? 'rgba(232, 223, 208, 0.95)' : 'transparent',
            backdropFilter: scrolled ? 'blur(10px)' : 'none'
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-0">
                <img src="/Eban.png" alt="Philosophy Gymnasium" className="h-9 w-9" />
                <div className="text-3xl font-light italic">
                  <span className="text-black">Vitasta</span>
                </div>
              </div>

              <div className="hidden md:flex space-x-8">
                <a href="#home" className="hover:text-gray-600 transition-colors">
                  Home
                </a>
                <a href="#philosophy" className="hover:text-gray-600 transition-colors">
                  Philosophy
                </a>
                <a href="#research" className="hover:text-gray-600 transition-colors">
                  Research
                </a>
                <a href="#programs" className="hover:text-gray-600 transition-colors">
                  Programs
                </a>
                <a href="#efs" className="hover:text-gray-600 transition-colors">
                  Enquiry
                </a>
                <a href="#contact" className="hover:text-gray-600 transition-colors">
                  Contact
                </a>
                <Link to="/signin" className="hover:text-gray-600 transition-colors">
                  Sign In
                </Link>
              </div>

              <button className="md:hidden" onClick={() => setIsMenuOpen((prev) => !prev)}>
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div style={{ backgroundColor: '#e8dfd0', borderTop: '1px solid #cfc0ad' }}>
              <div className="px-4 py-6 space-y-4">
                <a
                  href="#home"
                  className="block hover:text-gray-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </a>
                <a
                  href="#programs"
                  className="block hover:text-gray-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Programs
                </a>
                <a
                  href="#philosophy"
                  className="block hover:text-gray-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Philosophy
                </a>
                <a
                  href="#research"
                  className="block hover:text-gray-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Research
                </a>
                <a
                  href="#contact"
                  className="block hover:text-gray-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </a>
              </div>
            </div>
          )}
        </nav>

        <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0" style={{ backgroundColor: 'transparent' }}></div>
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2338bdf8' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
            }}
          ></div>

          <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
            <div className="flex justify-center mb-6">
              <img src="/Eban.png" alt="Philosophy Gymnasium" className="w-20 h-20" />
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in">
              <span className="block text-black mb-2">Train Your Mind</span>
              <span className="block text-gray-800">Elevate Your Self</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8">
              Where philosophical wisdom meets programming in this AI driven world
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#programs"
                className="bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-all transform hover:scale-105 shadow-lg"
              >
                View Programs
              </a>
              <a
                href="#contact"
                className="border-2 border-black text-black px-8 py-4 rounded-full font-bold hover:bg-black hover:text-white transition-all transform hover:scale-105"
              >
                Create Account←
              </a>
            </div>

            <div className="mt-8 h-8">
              <p
                key={rotatingTextIndex}
                className="text-lg text-gray-700 italic animate-fade-in"
                style={{ animation: 'fadeIn 0.5s ease-in-out' }}
              >
                {rotatingTexts[rotatingTextIndex]}
              </p>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
            <div className="w-6 h-10 border-2 border-black rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-3 bg-black rounded-full"></div>
            </div>
          </div>

          <div className="absolute bottom-8 right-8 z-10 hidden md:block" style={{ opacity: 0.15 }}>
            <img src="/Bg_Pillers.png" alt="Classical Architecture" className="w-70 h-100 object-contain" />
          </div>
        </section>

        <section id="philosophy" className="py-24 px-4" style={{ backgroundColor: 'transparent' }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-5xl font-bold mb-6 text-black">Our Philosophy</h2>
                <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                  At Vitasta, we believe in the idea of Philosophical Gymnasium synthesising the union of body and mind.
                  Drawing inspiration from the great thinkers of history, we've created a space where mental training
                  becomes a path to wisdom.
                </p>
                <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                  Like the ancient Greeks who trained in the original gymnasiums while discussing philosophy, we see and
                  acknowledge the importance of finding meaning in life that we are losing in this era driven by urgency
                  rather than depth.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Every rep is a meditation. Every set is a lesson. Every mental workout is a journey toward becoming
                  your highest self.
                </p>
              </div>
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <img src="/our_phil.png" alt="Krishna-Arjun" className="w-full h-full object-cover" />
                <div className="absolute bottom-4 right-4 bg-black/70 px-4 py-2 rounded">
                  <p className="text-white text-sm italic">Lost Dream</p>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-8 left-8 z-10 hidden md:block" style={{ opacity: 0.15 }}>
            <img src="/Branch.png" alt="Classical Architecture" className="w-70 h-100 object-contain" />
          </div>
        </section>

        <section
          id="whatwedo"
          className={`py-24 px-4 transition-all duration-1000 ${
            visibleSections.whatwedo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ backgroundColor: 'transparent' }}
        >
          <div className="max-w-7xl mx-auto">
            <div
              className="rounded-3xl overflow-hidden shadow-2xl border border-gray-400"
              style={{
                background: 'linear-gradient(135deg, rgba(232, 223, 208, 0.6) 0%, rgba(212, 197, 176, 0.6) 100%)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div className="grid md:grid-cols-2">
                <div className="p-12 md:p-16">
                  <div className="mb-8">
                    <span className="text-sm uppercase tracking-wider text-gray-600 font-semibold">WHAT WE DO</span>
                  </div>

                  <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black leading-tight">
                    We merge <span className="italic">ancient wisdom,</span>{' '}
                    <span className="italic">modern training</span> & <span className="italic">philosophical</span>{' '}
                    excellence
                  </h2>

                  <p className="text-gray-700 text-lg mb-12 leading-relaxed">
                    Each program is approached from a holistic perspective to provide you with a transformation that
                    develops both mental fortitude and self resilience, integrating timeless philosophy with logical
                    applications
                  </p>

                  <div className="space-y-6">
                    {services.map((service, index) => (
                      <div
                        key={service.title}
                        className={`border-b pb-4 cursor-pointer transition-all ${
                          activeService === index ? 'border-black' : 'border-gray-300 hover:border-gray-500'
                        }`}
                        onClick={() => setActiveService(index)}
                      >
                        <h3
                          className={`text-xl font-bold transition-colors ${
                            activeService === index ? 'text-black' : 'text-gray-600 hover:text-black'
                          }`}
                        >
                          {service.title}
                        </h3>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative bg-gradient-to-br from-gray-600 to-gray-800 p-12 md:p-16 flex flex-col justify-end min-h-[500px] transition-all duration-500">
                  <div className="absolute inset-0 opacity-20 transition-opacity duration-500">
                    <img
                      src={services[activeService].image}
                      alt={services[activeService].title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="relative z-10">
                    <h3
                      className="text-3xl md:text-4xl font-bold text-white mb-6 transition-all duration-500"
                      dangerouslySetInnerHTML={{ __html: services[activeService].heading }}
                    />
                    <p className="text-gray-200 text-lg leading-relaxed transition-all duration-500">
                      {services[activeService].description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="wisdom"
          className={`py-16 px-4 transition-all duration-1000 ${
            visibleSections.wisdom ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-4xl font-bold text-black">Dive Into Our Wisdom Library</h2>
            </div>

            <div className="relative">
              <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl mb-6">
                {currentSlide === 0 && (
                  <>
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                      <div className="absolute bottom-8 left-8 text-white">
                        <p className="text-sm font-semibold mb-2">{article.category.toUpperCase()}</p>
                        <h3 className="text-4xl font-bold mb-4">{article.title}</h3>
                        <p className="text-lg mb-6 max-w-2xl">{article.summary}</p>
                        <Link
                          to="/articles/stoic-body"
                          className="border-2 border-white text-white px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-black transition-all"
                        >
                          READ MORE
                        </Link>
                      </div>
                    </div>
                  </>
                )}

                {currentSlide === 1 && (
                  <>
                    <img src="/WI_3v1.png" alt="Zeno's Paradox" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center">
                      <div className="absolute bottom-8 left-8 text-white">
                        <p className="text-sm font-semibold mb-2">PHILOSOPHY</p>
                        <h3 className="text-4xl font-bold mb-4">ZENO'S PARADOX</h3>
                        <p className="text-lg mb-6 max-w-2xl">The Dichotomy Paradox-The paradox of cutting in two.</p>
                        <button className="border-2 border-white text-white px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-black transition-all">
                          READ MORE
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {currentSlide === 2 && (
                  <>
                    <img src="/WI_2v1.png" alt="Marcus Aurelius's Meditation" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center">
                      <div className="absolute bottom-8 left-8 text-white">
                        <p className="text-sm font-semibold mb-2">PHILOSOPHY</p>
                        <h3 className="text-4xl font-bold mb-4">MARCUS AURELIUS'S MEDITATION</h3>
                        <p className="text-lg mb-6 max-w-2xl">
                          Eastern philosophy and movement - how training becomes a moving meditation
                        </p>
                        <button className="border-2 border-white text-white px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-black transition-all">
                          READ MORE
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {currentSlide === 3 && (
                  <>
                    <img src="/WI_1v1.png" alt="Nietzsche's Will to Power" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center">
                      <div className="absolute bottom-8 left-8 text-white">
                        <p className="text-sm font-semibold mb-2">PHILOSOPHY</p>
                        <h3 className="text-4xl font-bold mb-4">NIETZSCHE'S WILL TO POWER</h3>
                        <p className="text-lg mb-6 max-w-2xl">
                          Understanding progressive overload through Nietzsche's philosophy of strength
                        </p>
                        <button className="border-2 border-white text-white px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-black transition-all">
                          READ MORE
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {currentSlide === 4 && (
                  <>
                    <img src="/WI_5th.png" alt="Jorge Luis Borge's Ulrikke" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center">
                      <div className="absolute bottom-8 left-8 text-white">
                        <p className="text-sm font-semibold mb-2">PHILOSOPHY</p>
                        <h3 className="text-4xl font-bold mb-4">JORGE LUIS BORGE'S ULRIKKE</h3>
                        <p className="text-lg mb-6 max-w-2xl">
                          Bringing complete awareness to each rep transforms training into spiritual practice
                        </p>
                        <button className="border-2 border-white text-white px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-black transition-all">
                          READ MORE
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="flex justify-end items-center gap-4">
                <button
                  onClick={prevSlide}
                  className="w-12 h-12 border-2 border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all"
                  aria-label="Previous"
                >
                  ←
                </button>
                <button
                  onClick={nextSlide}
                  className="w-12 h-12 border-2 border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all"
                  aria-label="Next"
                >
                  →
                </button>

                <div className="flex gap-2 ml-4">
                  {[0, 1, 2, 3, 4].map((index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-1 rounded-full transition-all ${
                        currentSlide === index ? 'w-12 bg-black' : 'w-8 bg-gray-400'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="research"
          className={`py-24 px-4 transition-all duration-1000 ${
            visibleSections.research ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ backgroundColor: 'transparent' }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/Research.png"
                  alt="Vitasta Research"
                  className="w-full h-full object-cover"
                  style={{ filter: 'blur(3px) brightness(0.9)' }}
                />
                <div className="absolute inset-0 bg-white/20"></div>
                <div className="absolute bottom-4 right-4 bg-black/70 px-4 py-2 rounded">
                  <p className="text-white text-sm italic">Our Lab</p>
                </div>
              </div>

              <div>
                <h2 className="text-5xl font-bold mb-6 text-black">Vitasta Research</h2>
                <p className="text-gray-700 text-lg leading-relaxed italic">Coming Soon.....</p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="programs"
          className={`py-24 px-4 transition-all duration-1000 ${
            visibleSections.programs ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ backgroundColor: 'transparent' }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-4 text-black">Our Programs</h2>
              <p className="text-gray-700 text-lg">Becoming is a discipline</p>
            </div>

            <div className="flex justify-center mb-12">
              <div className="inline-flex rounded-full bg-black/10 p-1">
                <button
                  onClick={() => setProgramTab('individual')}
                  className={`px-8 py-3 rounded-full font-semibold transition-all ${
                    programTab === 'individual' ? 'bg-black text-white' : 'text-black hover:text-gray-600'
                  }`}
                >
                  Individual
                </button>
                <button
                  onClick={() => setProgramTab('enterprise')}
                  className={`px-8 py-3 rounded-full font-semibold transition-all ${
                    programTab === 'enterprise' ? 'bg-black text-white' : 'text-black hover:text-gray-600'
                  }`}
                >
                  Team & Enterprise
                </button>
              </div>
            </div>

            {programTab === 'individual' && (
              <>
                <div className="mb-20">
                  <h3 className="text-3xl font-bold mb-8 text-black">Daily Sessions</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    {dailySessions.map((program) => (
                      <div
                        key={program.id}
                        className="rounded-xl p-6 transition-all transform hover:scale-105 hover:shadow-2xl hover:shadow-black/30 cursor-pointer border border-transparent hover:border-gray-400"
                        style={{
                          background: 'linear-gradient(135deg, rgba(232, 223, 208, 0.3) 0%, rgba(212, 197, 176, 0.3) 100%)'
                        }}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="text-2xl font-bold text-black">{program.name}</h4>
                          <span className="text-xl font-bold text-gray-700">{program.price}</span>
                        </div>
                        <p className="text-gray-700 mb-4">{program.desc}</p>
                        {program.id === 'stoic-strength' && (
                          <Link to="/programs/stoic-strength" className="text-black font-semibold hover:text-gray-600 transition-colors flex items-center gap-2">
                            View Full Syllabus →
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-16">
                  <h3 className="text-3xl font-bold mb-8 text-black">Arc</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    {yogaCourses.map((program) => (
                      <div
                        key={program.id}
                        className="rounded-xl p-6 transition-all transform hover:scale-105 hover:shadow-2xl hover:shadow-black/30 cursor-pointer border border-transparent hover:border-gray-400"
                        style={{
                          background: 'linear-gradient(135deg, rgba(232, 223, 208, 0.3) 0%, rgba(212, 197, 176, 0.3) 100%)'
                        }}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="text-2xl font-bold text-black">{program.name}</h4>
                          <span className="text-xl font-bold text-gray-700">{program.price}</span>
                        </div>
                        <p className="text-gray-700 mb-4">{program.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {programTab === 'enterprise' && (
              <div className="mb-16">
                <h3 className="text-3xl font-bold mb-8 text-black">Team & Enterprise Solutions</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  {enterprisePrograms.map((program) => (
                    <div
                      key={program.id}
                      className="rounded-xl p-6 transition-all transform hover:scale-105 hover:shadow-2xl hover:shadow-black/30 cursor-pointer border border-transparent hover:border-gray-400"
                      style={{
                        background: 'linear-gradient(135deg, rgba(232, 223, 208, 0.3) 0%, rgba(212, 197, 176, 0.3) 100%)'
                      }}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-2xl font-bold text-black">{program.name}</h4>
                        {program.price && <span className="text-xl font-bold text-gray-700">{program.price}</span>}
                      </div>
                      <p className="text-gray-700 mb-4">{program.desc}</p>
                      <a href="#efs" className="text-black font-semibold hover:text-gray-600 transition-colors flex items-center gap-2">
                        Please Contact Us →
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div
              className="mt-16 text-center rounded-xl p-8 border border-transparent transition-all hover:shadow-xl hover:border-gray-400"
              style={{
                background: 'linear-gradient(135deg, rgba(232, 223, 208, 0.3) 0%, rgba(212, 197, 176, 0.3) 100%)'
              }}
            >
              <p className="text-gray-700 text-lg mb-4">
                All programs include access to meditation room, philosophy library, and personal training sessions
              </p>
              <p className="text-black font-semibold">First session is complimentary for new members!</p>
            </div>
          </div>
        </section>

        <section
          id="efs"
          className={`py-24 px-4 transition-all duration-1000 ${
            visibleSections.efs ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ backgroundColor: 'transparent' }}
        >
          <div className="max-w-7xl mx-auto">
            <div
              className="rounded-3xl overflow-hidden shadow-2xl border border-gray-400"
              style={{
                background: 'linear-gradient(135deg, rgba(232, 223, 208, 0.6) 0%, rgba(212, 197, 176, 0.6) 100%)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div className="grid md:grid-cols-2">
                <div className="p-12 md:p-16 flex flex-col justify-center relative overflow-hidden min-h-[500px]">
                  <div className="absolute inset-0 opacity-100">
                    <img src="/efm1.png" alt="Transform" className="w-full h-full object-cover" />
                  </div>

                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(135deg, rgba(232, 223, 208, 0.8) 0%, rgba(212, 197, 176, 0.8) 0%)'
                    }}
                  ></div>

                  <div className="relative z-10">
                    <div className="mb-6">
                      <span className="text-sm uppercase tracking-wider text-gray-600 font-semibold border-l-4 border-black pl-3">
                        WORK WITH US TODAY
                      </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black leading-tight">
                      Ready to <span className="italic">Transform?</span>
                    </h2>

                    <p className="text-gray-700 text-lg leading-relaxed">
                      Begin your journey with Philosophy Gymnasium. Get in touch and build a stronger, wiser version of
                      yourself.
                    </p>
                  </div>
                </div>

                <div className="p-12 md:p-16 bg-black/80">
                  <form className="space-y-6" onSubmit={handleFormSubmit}>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <input
                          type="email"
                          name="email"
                          placeholder="Email"
                          value={formData.email}
                          onChange={handleFormChange}
                          className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors"
                          required
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          name="firstName"
                          placeholder="First Name"
                          value={formData.firstName}
                          onChange={handleFormChange}
                          className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors"
                      />
                    </div>

                    <div>
                      <textarea
                        name="message"
                        placeholder="How can we help?"
                        rows="5"
                        value={formData.message}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors resize-none"
                        required
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-white text-black px-8 py-4 rounded-lg font-bold hover:bg-gray-200 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </button>
                    {formStatus.message ? (
                      <p
                        className={`text-sm font-semibold ${
                          formStatus.type === 'success' ? 'text-green-200' : 'text-red-200'
                        }`}
                      >
                        {formStatus.message}
                      </p>
                    ) : null}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className={`py-24 px-4 transition-all duration-1000 ${
            visibleSections.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ backgroundColor: 'transparent' }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 overflow-hidden relative">
              <div
                className="flex gap-8 animate-scroll"
                style={{
                  animation: 'scroll 33s linear infinite',
                  whiteSpace: 'nowrap'
                }}
              >
                {[
                  'Socrates',
                  'Plato',
                  'Aristotle',
                  'Marcus Aurelius',
                  'Epictetus',
                  'Seneca',
                  'Kierkegaard',
                  'Lord Krishna',
                  'Buddha',
                  'Nietzsche',
                  'Kant',
                  'Descartes',
                  'Kierkegaard',
                  'Kalidasa',
                  'Socrates',
                  'Plato',
                  'Aristotle',
                  'Marcus Aurelius',
                  'Epictetus',
                  'Seneca',
                  'Kierkegaard',
                  'Lord Krishna',
                  'Buddha',
                  'Nietzsche',
                  'Kant',
                  'Descartes',
                  'Kalidasa'
                ].map((name, index) => (
                  <span key={`${name}-${index}`} className="text-3xl font-light italic text-black opacity-30">
                    {name}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-4 text-black">Join Our Philosophical Gymnasium</h2>
              <p className="text-gray-700 text-lg">From Aleph, the journey unfolds</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div
                className="rounded-xl p-8 text-center transition-all transform hover:scale-105 hover:shadow-2xl hover:shadow-black/30 border border-transparent hover:border-gray-400"
                style={{
                  background: 'linear-gradient(135deg, rgba(232, 223, 208, 0.3) 0%, rgba(212, 197, 176, 0.3) 100%)'
                }}
              >
                <MapPin className="mx-auto mb-4 text-black" size={48} />
                <h3 className="text-xl font-bold mb-2 text-black">Location</h3>
                <p className="text-gray-700">
                  Salt Lake, Kolkata
                  <br />
                  West Bengal 700064
                </p>
              </div>

              <div
                className="rounded-xl p-8 text-center transition-all transform hover:scale-105 hover:shadow-2xl hover:shadow-black/30 border border-transparent hover:border-gray-400"
                style={{
                  background: 'linear-gradient(135deg, rgba(232, 223, 208, 0.3) 0%, rgba(212, 197, 176, 0.3) 100%)'
                }}
              >
                <Clock className="mx-auto mb-4 text-black" size={48} />
                <h3 className="text-xl font-bold mb-2 text-black">Hours</h3>
                <p className="text-gray-700">
                  Mon - Sat: 10am - 8pm
                  <br />
                  Sunday: 6am - 8pm
                </p>
              </div>

              <div
                className="rounded-xl p-8 text-center transition-all transform hover:scale-105 hover:shadow-2xl hover:shadow-black/30 border border-transparent hover:border-gray-400"
                style={{
                  background: 'linear-gradient(135deg, rgba(232, 223, 208, 0.3) 0%, rgba(212, 197, 176, 0.3) 100%)'
                }}
              >
                <Phone className="mx-auto mb-4 text-black" size={48} />
                <h3 className="text-xl font-bold mb-2 text-black">Contact</h3>
                <p className="text-gray-700">
                  +91 7044295862
                  <br />
                  shreyartha.sengupta@outlook.com
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <div className="flex justify-center space-x-6">
                <a href="https://www.instagram.com/neural_cube/" className="text-black hover:text-gray-600 transition-colors">
                  <Instagram size={32} />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=100080418366461"
                  className="text-black hover:text-gray-600 transition-colors"
                >
                  <Facebook size={32} />
                </a>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-8 hidden md:block" style={{ opacity: 0.15 }}>
            <img src="/foot1.png" alt="Decorative Element" className="w-50 h-50 object-contain" />
          </div>
        </section>

        <footer
          className="border-t py-8 px-4"
          style={{ backgroundColor: 'rgba(207, 192, 173, 0.5)', borderColor: '#cfc0ad' }}
        >
          <div className="max-w-6xl mx-auto text-center text-black">
            <p>&copy; 2026 Vitasta, The Philosophical Gymnasium. All rights reserved.</p>
            <p className="mt-2">Mens sana in corpore sano - A healthy mind in a healthy body.</p>
          </div>
        </footer>

        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-black text-white p-4 rounded-full shadow-2xl hover:bg-gray-800 transition-all transform hover:scale-110 z-50"
            aria-label="Scroll to top"
            style={{
              animation: 'fadeInUp 0.3s ease-in-out'
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          </button>
        )}

        <style>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}</style>
      </div>
    </div>
  );
}
