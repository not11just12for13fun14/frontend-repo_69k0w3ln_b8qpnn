import React from 'react'
import { PlayingCard, Sparkles, Gamepad2 } from 'lucide-react'
import ParallaxScene from './components/ParallaxScene'
import GameCard from './components/GameCard'

const CardTable = ({ accent }) => (
  <div className="relative h-full w-full">
    <div className="absolute inset-0">
      <div className="absolute -inset-20 rounded-full blur-3xl opacity-30" style={{ background: accent }} />
    </div>
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-[85%] w-[85%] rounded-full border border-white/10 bg-gradient-to-b from-emerald-600/20 to-emerald-900/20 shadow-inner" />
    </div>
    <div className="absolute inset-0 p-6 flex flex-col">
      <div className="flex-1 grid grid-cols-4 gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="rounded-md border border-white/10 bg-white/5" />
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between text-white/80 text-xs">
        <span>Players: 5</span>
        <span>Ante 10 | Min 50</span>
      </div>
    </div>
  </div>
)

function App() {
  const games = [
    {
      title: 'Poker',
      accent: '#ef4444',
      icon: <PlayingCard size={44} className="text-white" />,
    },
    {
      title: 'BlackJack',
      accent: '#22c55e',
      icon: <Gamepad2 size={44} className="text-white" />,
    },
    {
      title: '3Up 3Down',
      accent: '#8b5cf6',
      icon: <Sparkles size={44} className="text-white" />,
    },
  ]

  return (
    <div className="min-h-screen bg-[#0b1020] text-white overflow-hidden">
      {/* Hero */}
      <div className="relative">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-[-10%] left-[-10%] h-[40rem] w-[40rem] rounded-full bg-fuchsia-500/20 blur-3xl" />
          <div className="absolute bottom-[-10%] right-[-10%] h-[40rem] w-[40rem] rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_50%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-20 pb-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm text-white/80">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Live tables spinning up
            </div>
            <h1 className="mt-6 text-5xl md:text-6xl font-extrabold tracking-tight">
              Host, Share, and Play Card Games
            </h1>
            <p className="mt-4 text-white/70 max-w-2xl mx-auto">
              A stylish hub for your online tables. Hover any card to flip over a live preview of the felt with a subtle parallax glow.
            </p>
          </div>

          <ParallaxScene>
            {/* Floating orbs behind cards */}
            <div data-layer="0.3" className="pointer-events-none absolute left-10 top-6 h-24 w-24 rounded-full bg-fuchsia-500/30 blur-2xl" />
            <div data-layer="0.5" className="pointer-events-none absolute right-16 top-10 h-32 w-32 rounded-full bg-cyan-400/25 blur-2xl" />
            <div data-layer="0.8" className="pointer-events-none absolute left-1/3 bottom-8 h-24 w-24 rounded-full bg-violet-400/25 blur-2xl" />

            <div className="relative mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
              {games.map((g) => (
                <div key={g.title} data-layer="0.6">
                  <div className="group [perspective:1200px]">
                    <div className="relative transition-transform duration-[900ms] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                      <GameCard
                        title={g.title}
                        accent={g.accent}
                        frontIcon={g.icon}
                        backContent={<CardTable accent={g.accent} />}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ParallaxScene>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="relative border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-semibold">Spin up a table in seconds</h3>
            <p className="text-white/70">Bring your friends and deal the first hand tonight.</p>
          </div>
          <a href="#" className="inline-flex items-center gap-2 rounded-full bg-white text-black px-5 py-3 font-semibold hover:scale-[1.02] transition-transform">
            Get Started
          </a>
        </div>
      </div>
    </div>
  )
}

export default App
