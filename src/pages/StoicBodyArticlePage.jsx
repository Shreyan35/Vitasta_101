import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { article } from '../data/philosophyGymData.js';

export default function StoicBodyArticlePage() {
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

      <div style={{ position: 'relative', zIndex: 2 }}>
        <nav
          className="fixed w-full z-50 shadow-lg"
          style={{
            backgroundColor: 'rgba(232, 223, 208, 0.95)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <Link to="/" className="flex items-center space-x-2 hover:text-gray-600 transition-colors">
                <ArrowLeft size={24} />
                <span>Back to Home</span>
              </Link>
              <div className="flex items-center space-x-1">
                <img src="/Eban.png" alt="Philosophy Gymnasium" className="h-8 w-8" />
                <div className="text-2xl font-light italic">
                  <span className="text-black">Vitasta Research</span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <section className="pt-32 pb-16 px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-sm font-semibold mb-4 text-gray-600 uppercase tracking-wide">
              {article.category}
            </p>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-black text-center">{article.title}</h1>
            <p className="text-center text-gray-600 mb-12">
              {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </p>

            <div className="mb-16 rounded-3xl overflow-hidden shadow-xl">
              <img src={article.image} alt="The Stoic Body" className="w-full object-cover" style={{ height: '500px' }} />
            </div>

            <article className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold mb-4 text-black">What is self?</h2>
              <p className="text-gray-800 leading-relaxed mb-4">
                "You have power over your mind - not outside events. Realize this, and you will find strength." These
                immortal words from Marcus Aurelius, the philosopher-emperor of Rome, echo through the centuries with
                particular resonance for those who pursue physical excellence.
              </p>
              <p className="text-gray-800 leading-relaxed mb-4">
                The Stoics understood something profound: true strength begins not in the muscles, but in the mind.
                Before we can transform our bodies, we must first transform our relationship with challenge, discomfort,
                and adversity.
              </p>

              <h2 className="text-3xl font-bold mb-4 text-black">The Dichotomy of Control</h2>
              <div className="bg-gray-100 rounded-lg p-6 mb-4 relative font-mono text-sm">
                <pre className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                  {`Epictetus teaches us to distinguish between what is within 
our control and what is not:

1. Within our control:
   - Our effort, our attitude, our consistency
   - Our focus during each rep
   - Our response to challenges
   - Our commitment to growth

2. Outside our control:
   - Our genetics, others' progress
   - Yesterday's performance
   - Tomorrow's results
   - External circumstances

By focusing energy solely on what we can control, we 
eliminate anxiety and channel power into productive action.`}
                </pre>
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <button className="px-3 py-1 bg-white rounded text-xs border border-gray-300 hover:bg-gray-50 transition-colors flex items-center gap-1">
                    📋 Copy
                  </button>
                  <button className="px-3 py-1 bg-white rounded text-xs border border-gray-300 hover:bg-gray-50 transition-colors flex items-center gap-1">
                    ⬇ Expand
                  </button>
                </div>
              </div>

              <p className="text-gray-800 leading-relaxed">
                In the gymnasium, this wisdom becomes immediately practical. Each workout becomes an exercise in
                applied philosophy - distinguishing between the process we control and the outcomes we cannot.
              </p>

              <h2 className="text-3xl font-bold mb-4 text-black">Embracing Discomfort</h2>
              <p className="text-gray-800 leading-relaxed mb-4">
                The Stoics practiced voluntary hardship - deliberately choosing difficulty to strengthen their
                resilience. Modern strength training embodies this ancient practice. Every challenging set, every moment
                of muscle fatigue, every drop of sweat is an opportunity to practice what Seneca called "training the
                mind through the body."
              </p>
              <p className="text-gray-800 leading-relaxed mb-4">
                When the weight feels heavy, when our muscles burn, when we want to quit - this is precisely when Stoic
                training begins. We learn that discomfort is not our enemy but our teacher, not a barrier but a gateway
                to growth.
              </p>

              <h2 className="text-3xl font-bold mb-4 text-black">The Practice of Negative Visualization</h2>
              <p className="text-gray-800 leading-relaxed mb-4">
                The Stoics regularly imagined losing what they valued - not from pessimism, but to develop gratitude and
                mental preparation. In our training, we can apply this by:
              </p>
              <ul className="text-gray-800 leading-relaxed mb-4 space-y-2">
                <li>Appreciating our current ability to move and train</li>
                <li>Visualizing setbacks before they occur, preparing our response</li>
                <li>Recognizing that injury or illness could arrive at any moment</li>
                <li>Training with urgency and gratitude, not complacency</li>
              </ul>

              <div className="bg-white/40 rounded-xl p-8 mb-8 border border-gray-300">
                <h2 className="text-3xl font-bold mb-4 text-black">Building the Stoic Body</h2>
                <p className="text-gray-800 leading-relaxed mb-4">
                  At Philosophy Gymnasium, our Stoic Strength program integrates these ancient principles with modern
                  training science:
                </p>
                <ul className="text-gray-800 leading-relaxed mb-4 space-y-2">
                  <li>
                    <strong>Week 1-2:</strong> Understanding the dichotomy of control through fundamental movements
                  </li>
                  <li>
                    <strong>Week 3-4:</strong> Embracing discomfort with progressive overload inspired by Marcus Aurelius
                  </li>
                  <li>
                    <strong>Week 5-6:</strong> Developing discipline through Epictetus's teachings on habit formation
                  </li>
                  <li>
                    <strong>Week 7-8:</strong> Building resilience with Seneca's philosophy of obstacle transformation
                  </li>
                </ul>
              </div>

              <h2 className="text-3xl font-bold mb-4 text-black">Conclusion: The Unshakeable Foundation</h2>
              <p className="text-gray-800 leading-relaxed mb-4">
                Physical strength built on a foundation of mental resilience becomes unshakeable. When life challenges
                us - and it will - our Stoic practice ensures we remain steadfast. The muscles we build are temporary,
                but the character we forge through disciplined training endures.
              </p>
              <p className="text-gray-800 leading-relaxed italic">
                "The impediment to action advances action. What stands in the way becomes the way." - Marcus Aurelius
              </p>
            </article>

            <div className="mt-16 text-center bg-white/50 rounded-xl p-8 border border-gray-400">
              <h3 className="text-3xl font-bold mb-4 text-black">Ready to Build Your Stoic Body?</h3>
              <p className="text-gray-700 text-lg mb-6">
                Join our 12-week Stoic Strength program and discover the power of combining ancient wisdom with modern
                training.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/programs/stoic-strength"
                  className="bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-all transform hover:scale-105 shadow-lg"
                >
                  View Full Program
                </Link>
                <Link
                  to="/"
                  className="border-2 border-black text-black px-8 py-4 rounded-full font-bold hover:bg-black hover:text-white transition-all transform hover:scale-105"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </section>

        <footer
          className="border-t py-8 px-4"
          style={{ backgroundColor: 'rgba(207, 192, 173, 0.5)', borderColor: '#cfc0ad' }}
        >
          <div className="max-w-6xl mx-auto text-center text-black">
            <p>&copy; 2026 Philosophy Gymnasium Kolkata. All rights reserved.</p>
            <p className="mt-2">Mens sana in corpore sano - A healthy mind in a healthy body.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
