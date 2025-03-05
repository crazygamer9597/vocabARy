import React, { useEffect, useRef } from 'react';
import { Camera, Globe2, Languages, Sparkles, Brain, Menu, X } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

export function LandingPage({ onStart }: LandingPageProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-900">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20 animate-gradient" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-5" />
      </div>

      {/* Top Menu Bar */}
      <nav className="relative z-50 border-b border-white/10 backdrop-blur-md bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <a href="#" className="flex items-center space-x-2 group">
                <Brain className="w-8 h-8 text-purple-400 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                  VocabARy
                </span>
              </a>
              <span className="hidden md:block text-sm font-medium text-gray-400 tracking-wider">
                Learn Through Your Lens
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLink href="#features">Features</NavLink>
              <button
                onClick={onStart}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
              >
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute w-full bg-gray-900/95 backdrop-blur-md border-b border-white/10">
            <div className="px-4 py-4 space-y-4">
              <div className="text-sm font-medium text-gray-400 tracking-wider mb-4">
                Learn Through Your Lens
              </div>
              <MobileNavLink href="#features" onClick={() => setIsMenuOpen(false)}>Features</MobileNavLink>
              <button
                onClick={() => { onStart(); setIsMenuOpen(false); }}
                className="w-full px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Floating AR elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 bg-white/5 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 5}s infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="relative container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="mb-8 relative">
            <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-30 animate-pulse" />
            <h1 className="relative text-7xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
              VocabARy
            </h1>
            <p className="text-3xl font-light text-gray-300 mb-2">See the world, learn the words</p>
          </div>
          <p className="text-xl mb-12 text-gray-300">
            Experience immersive language learning with AR technology. Point your camera at objects and learn their names in Indian languages instantly.
          </p>

          <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <FeatureCard
              icon={<Camera className="w-8 h-8" />}
              title="Real-time Detection"
              description="Point your camera at objects for instant recognition"
            />
            <FeatureCard
              icon={<Languages className="w-8 h-8" />}
              title="Multiple Languages"
              description="Learn in 8 different Indian languages"
            />
            <FeatureCard
              icon={<Globe2 className="w-8 h-8" />}
              title="AR Experience"
              description="See translations overlaid in augmented reality"
            />
          </div>

          <button
            onClick={onStart}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white rounded-full overflow-hidden transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500" />
            <span className="relative flex items-center">
              <Sparkles className="w-5 h-5 mr-2 group-hover:animate-spin" />
              Start Learning
            </span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative border-t border-white/10 py-6 bg-gray-900/50 backdrop-blur-md">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            Made with ❤️ by{' '}
            <span className="text-gray-300">Nihal</span>,{' '}
            <span className="text-gray-300">Manish</span>,{' '}
            <span className="text-gray-300">Shreeja</span>, and{' '}
            <span className="text-gray-300">Saran</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="text-gray-300 hover:text-white transition-colors duration-200"
    >
      {children}
    </a>
  );
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="block text-gray-300 hover:text-white transition-colors duration-200"
    >
      {children}
    </a>
  );
}

function FeatureCard({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const gradient = gradientRef.current;
    if (!card || !gradient) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      gradient.style.background = `
        radial-gradient(
          circle at ${x}px ${y}px,
          rgba(255, 255, 255, 0.15) 0%,
          rgba(255, 255, 255, 0.05) 20%,
          rgba(255, 255, 255, 0) 50%
        )
      `;
    };

    const handleMouseLeave = () => {
      gradient.style.background = 'transparent';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className="relative rounded-xl p-6 bg-gray-800/50 backdrop-blur-sm transition-transform duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-black/20 overflow-hidden"
    >
      <div
        ref={gradientRef}
        className="absolute inset-0 transition-opacity duration-200"
      />
      <div className="relative z-10">
        <div className="mb-4 text-white">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  );
}