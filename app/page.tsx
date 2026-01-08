'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

type GameState = 'setup' | 'countdown' | 'racing' | 'results';

interface Duck {
  id: string;
  name: string;
  position: number;
  speed: number;
  color: string;
}

const DUCK_COLORS = [
  'from-yellow-400 to-orange-500',
  'from-cyan-400 to-blue-500',
  'from-pink-400 to-rose-500',
  'from-green-400 to-emerald-500',
  'from-purple-400 to-violet-500',
  'from-red-400 to-pink-500',
  'from-indigo-400 to-blue-500',
  'from-amber-400 to-yellow-500',
];

const TIME_OPTIONS = [
  { label: '30 seconds', value: 30 },
  { label: '1 minute', value: 60 },
  { label: '2 minutes', value: 120 },
  { label: '5 minutes', value: 300 },
];

export default function DuckRace() {
  const [gameState, setGameState] = useState<GameState>('setup');
  const [ducks, setDucks] = useState<Duck[]>([]);
  const [duckNames, setDuckNames] = useState<string[]>(['', '']);
  const [timeLimit, setTimeLimit] = useState(60);
  const [countdown, setCountdown] = useState(3);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [winner, setWinner] = useState<Duck | null>(null);
  const raceTrackRef = useRef<HTMLDivElement | null>(null);
  const duckContainerRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const duckSpriteRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const ducksRef = useRef<Duck[]>([]);

  const addDuckField = () => {
    if (duckNames.length < 8) {
      setDuckNames([...duckNames, '']);
    }
  };

  const removeDuckField = (index: number) => {
    if (duckNames.length > 2) {
      setDuckNames(duckNames.filter((_, i) => i !== index));
    }
  };

  const updateDuckName = (index: number, name: string) => {
    const newNames = [...duckNames];
    newNames[index] = name;
    setDuckNames(newNames);
  };

  const canStartRace = duckNames.filter(name => name.trim()).length >= 2;

  const startRace = () => {
    const validNames = duckNames.filter(name => name.trim());

    // Calculate base speed so ducks finish in roughly the time limit
    // Speed = percentage per frame (at 60fps)
    // We want ducks to finish in 80-95% of the time limit for excitement
    const framesAvailable = timeLimit * 60; // 60fps
    const baseSpeed = 100 / framesAvailable; // Base speed to complete in exactly the time limit

    const raceDucks: Duck[] = validNames.map((name, index) => ({
      id: `duck-${index}`,
      name: name.trim(),
      position: 0,
      // Speed variation: 0.6x to 1.6x of base speed for dramatic racing
      // This creates exciting gaps between fast and slow ducks
      speed: baseSpeed * (0.6 + Math.random() * 1.0),
      color: DUCK_COLORS[index % DUCK_COLORS.length],
    }));

    setDucks(raceDucks);
    setTimeRemaining(timeLimit);
    setGameState('countdown');
    setCountdown(3);
  };

  // Countdown effect - only handles countdown timer and state transition
  useEffect(() => {
    if (gameState === 'countdown' && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (gameState === 'countdown' && countdown === 0) {
      setGameState('racing');
    }
  }, [gameState, countdown]);

  // Race start effect - initializes GSAP animations after racing screen renders
  useEffect(() => {
    if (gameState === 'racing' && raceTrackRef.current) {
      // Initialize GSAP animations for each duck
      ducks.forEach((duck) => {
        const duckSprite = duckSpriteRefs.current[duck.id];
        const duckContainer = duckContainerRefs.current[duck.id];

        // Bobbing animation on duck sprite
        if (duckSprite) {
          gsap.to(duckSprite, {
            y: '+=10',
            rotation: '+=3',
            duration: 0.6 + Math.random() * 0.4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        }

        // Horizontal racing animation on duck container
        if (duckContainer && raceTrackRef.current) {
          // Calculate the actual pixel distance to travel
          // Get race track width and account for padding (px-8 = 2rem = 32px on each side)
          const trackWidth = raceTrackRef.current.offsetWidth - 64; // 64px total padding

          // Calculate duration: slower ducks take longer
          // Base duration is the time limit, then adjusted by duck's speed factor
          const speedFactor = duck.speed / (100 / (timeLimit * 60)); // Relative to base speed
          const duration = timeLimit / speedFactor;

          gsap.to(duckContainer, {
            x: trackWidth, // Move across the full track width in pixels
            duration: duration,
            ease: 'none', // Linear movement for fair racing
            onUpdate: function() {
              // Update position state for leaderboard
              const progress = this.progress() * 100;
              setDucks(prevDucks =>
                prevDucks.map(d =>
                  d.id === duck.id ? { ...d, position: progress } : d
                )
              );
            },
            onComplete: () => {
              // Capture current positions of all ducks before killing animations
              const finalPositions: { [key: string]: number } = {};
              ducks.forEach((d) => {
                const container = duckContainerRefs.current[d.id];
                if (container) {
                  // Get the current progress from GSAP
                  const tweens = gsap.getTweensOf(container);
                  if (tweens.length > 0) {
                    finalPositions[d.id] = tweens[0].progress() * 100;
                  } else {
                    finalPositions[d.id] = d.position;
                  }
                } else {
                  finalPositions[d.id] = d.position;
                }
              });

              // Update all duck positions to their final values
              setDucks(prevDucks =>
                prevDucks.map(d => ({
                  ...d,
                  position: d.id === duck.id ? 100 : (finalPositions[d.id] || d.position)
                }))
              );

              setWinner(duck);
              setGameState('results');

              // Stop all animations
              Object.values(duckSpriteRefs.current).forEach(el => {
                if (el) gsap.killTweensOf(el);
              });
              Object.values(duckContainerRefs.current).forEach(el => {
                if (el) gsap.killTweensOf(el);
              });
            }
          });
        }
      });
    }
  }, [gameState, ducks, timeLimit]);

  // Update ducksRef whenever ducks change
  useEffect(() => {
    ducksRef.current = ducks;
  }, [ducks]);

  useEffect(() => {
    if (gameState === 'racing' && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            if (!winner) {
              // Capture current positions of all ducks before killing animations
              const finalPositions: { [key: string]: number } = {};
              const currentDucks = ducksRef.current;

              currentDucks.forEach((d) => {
                const container = duckContainerRefs.current[d.id];
                if (container) {
                  // Get the current progress from GSAP
                  const tweens = gsap.getTweensOf(container);
                  if (tweens.length > 0) {
                    finalPositions[d.id] = tweens[0].progress() * 100;
                  } else {
                    finalPositions[d.id] = d.position;
                  }
                } else {
                  finalPositions[d.id] = d.position;
                }
              });

              // Update all duck positions to their final values
              setDucks(prevDucks =>
                prevDucks.map(d => ({
                  ...d,
                  position: finalPositions[d.id] || d.position
                }))
              );

              if (currentDucks.length > 0) {
                // Find the duck with the highest final position
                const leadDuck = currentDucks.reduce((prev, current) => {
                  const prevPos = finalPositions[prev.id] || prev.position;
                  const currPos = finalPositions[current.id] || current.position;
                  return currPos > prevPos ? current : prev;
                });
                setWinner(leadDuck);
                setGameState('results');

                // Stop all GSAP animations (both bobbing and racing)
                Object.values(duckSpriteRefs.current).forEach(el => {
                  if (el) gsap.killTweensOf(el);
                });
                Object.values(duckContainerRefs.current).forEach(el => {
                  if (el) gsap.killTweensOf(el);
                });
              }
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameState, timeRemaining, winner]);

  const resetGame = () => {
    setGameState('setup');
    setDucks([]);
    setWinner(null);
    setCountdown(3);
    setDuckNames(['', '']);
    duckContainerRefs.current = {};
    duckSpriteRefs.current = {};
  };

  const raceAgain = () => {
    setGameState('countdown');
    setCountdown(3);
    setWinner(null);

    // Recalculate speeds for new race
    const framesAvailable = timeLimit * 60;
    const baseSpeed = 100 / framesAvailable;

    const raceDucks: Duck[] = ducks.map((duck) => ({
      ...duck,
      position: 0,
      // Speed variation: 0.6x to 1.6x for dramatic racing
      speed: baseSpeed * (0.6 + Math.random() * 1.0),
    }));

    setDucks(raceDucks);
    setTimeRemaining(timeLimit);

    // Kill all GSAP animations and reset positions
    Object.values(duckSpriteRefs.current).forEach(el => {
      if (el) {
        gsap.killTweensOf(el);
        gsap.set(el, { clearProps: 'all' });
      }
    });
    Object.values(duckContainerRefs.current).forEach(el => {
      if (el) {
        gsap.killTweensOf(el);
        gsap.set(el, { clearProps: 'all' });
      }
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const sortedDucks = [...ducks].sort((a, b) => b.position - a.position);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated background waves */}
      <div className="absolute inset-0 opacity-20">
        <div className="wave-animation absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cyan-400/30 to-transparent" />
        <div className="wave-animation-slow absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-blue-400/20 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center">
        {/* Setup Screen */}
        {gameState === 'setup' && (
          <div className="w-full max-w-2xl animate-fade-in">
            <div className="text-center mb-12">
              <h1 className="text-7xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 tracking-tight duck-title">
                DUCK RACE
              </h1>
              <p className="text-xl text-cyan-200 font-medium">
                Ready, Set, Waddle! 🦆
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="mb-8">
                <label className="block text-cyan-100 text-lg font-bold mb-4">
                  Racing Ducks
                </label>
                <div className="space-y-3">
                  {duckNames.map((name, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="flex-1 relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl">
                          🦆
                        </span>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => updateDuckName(index, e.target.value)}
                          placeholder={`Duck ${index + 1} name`}
                          maxLength={20}
                          className="w-full pl-14 pr-4 py-4 bg-white/90 rounded-2xl text-gray-900 font-semibold text-lg focus:outline-none focus:ring-4 focus:ring-cyan-400/50 transition-all placeholder:text-gray-400"
                        />
                      </div>
                      {duckNames.length > 2 && (
                        <button
                          onClick={() => removeDuckField(index)}
                          className="px-5 py-4 bg-red-500/80 hover:bg-red-600 rounded-2xl text-white font-bold transition-all hover:scale-105 active:scale-95"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {duckNames.length < 8 && (
                  <button
                    onClick={addDuckField}
                    className="mt-4 w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 rounded-2xl text-white font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-lg"
                  >
                    + Add Another Duck
                  </button>
                )}
              </div>

              <div className="mb-8">
                <label className="block text-cyan-100 text-lg font-bold mb-4">
                  Race Duration
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {TIME_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setTimeLimit(option.value)}
                      className={`py-4 px-4 rounded-2xl font-bold text-lg transition-all hover:scale-105 active:scale-95 ${
                        timeLimit === option.value
                          ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 shadow-xl ring-4 ring-yellow-300/50'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={startRace}
                disabled={!canStartRace}
                className={`w-full py-6 rounded-2xl font-black text-2xl transition-all shadow-2xl ${
                  canStartRace
                    ? 'bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 hover:from-pink-400 hover:via-red-400 hover:to-orange-400 text-white hover:scale-105 active:scale-95 animate-pulse-subtle'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                {canStartRace ? '🏁 START RACE! 🏁' : 'Add at least 2 ducks'}
              </button>
            </div>
          </div>
        )}

        {/* Countdown Screen */}
        {gameState === 'countdown' && (
          <div className="text-center animate-fade-in">
            <div className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-400 animate-bounce-count mb-8">
              {countdown > 0 ? countdown : 'GO!'}
            </div>
            <div className="flex justify-center gap-4">
              {ducks.map((duck) => (
                <div key={duck.id} className="text-6xl animate-wiggle">
                  🦆
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Racing Screen - LANE-BASED DESIGN */}
        {gameState === 'racing' && (
          <div className="w-full max-w-7xl animate-fade-in">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
                RACE IN PROGRESS
              </h2>
              <div className="text-right">
                <div className="text-6xl font-black text-cyan-300 tabular-nums">
                  {formatTime(timeRemaining)}
                </div>
                <div className="text-cyan-200 text-sm font-semibold">TIME REMAINING</div>
              </div>
            </div>

            {/* Racing Track with Individual Lanes */}
            <div
              className="relative bg-gradient-to-br from-blue-900/90 via-cyan-800/80 to-blue-900/90 rounded-3xl overflow-hidden border-4 border-white/30 shadow-2xl"
              style={{
                minHeight: `${Math.max(500, ducks.length * 90)}px`,
                maxHeight: '80vh',
              }}
            >
              {/* Animated water background layers */}
              <div className="absolute inset-0 opacity-40 pointer-events-none">
                <div className="wave-animation absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
                <div className="wave-animation-slow absolute inset-0 bg-gradient-to-r from-blue-400/20 via-transparent to-blue-400/20" style={{ animationDelay: '-3s' }} />
                <div className="wave-animation absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" style={{ animationDelay: '-6s' }} />
              </div>

              {/* START LINE - Prominent Green Line */}
              <div className="absolute left-8 top-0 bottom-0 w-6 bg-gradient-to-b from-green-400 via-green-500 to-green-400 rounded-lg start-line z-20 flex items-center justify-center">
                <div className="absolute -left-8 top-1/2 -translate-y-1/2 bg-green-500/90 backdrop-blur-sm px-2 py-1 rounded-lg">
                  <div className="text-white font-black text-xs whitespace-nowrap writing-mode-vertical transform -rotate-180">
                    START 🚦
                  </div>
                </div>
              </div>

              {/* FINISH LINE - Animated Checkered Pattern */}
              <div className="absolute right-8 top-0 bottom-0 w-8 checkered-flag finish-line z-20 rounded-lg border-2 border-yellow-400 flex items-center justify-center">
                <div className="absolute -right-10 top-1/2 -translate-y-1/2 bg-yellow-500/90 backdrop-blur-sm px-2 py-1 rounded-lg">
                  <div className="text-gray-900 font-black text-xs whitespace-nowrap writing-mode-vertical transform -rotate-180">
                    FINISH 🏁
                  </div>
                </div>
              </div>

              {/* Lane Container - CSS Grid */}
              <div
                ref={raceTrackRef}
                className="relative h-full grid"
                style={{
                  gridTemplateRows: `repeat(${ducks.length}, 1fr)`,
                  padding: '20px 80px',
                  gap: '0px',
                }}
              >
                {ducks.map((duck, index) => (
                  <div
                    key={duck.id}
                    className="race-lane relative"
                    style={{
                      minHeight: '80px',
                    }}
                  >
                    {/* Lane divider effect */}
                    {index < ducks.length - 1 && <div className="lane-divider" />}

                    {/* Duck name tag - positioned above the lane */}
                    <div className="absolute -top-8 left-0 whitespace-nowrap z-10">
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r ${duck.color} rounded-full shadow-lg`}>
                        <span className="font-black text-white text-sm">{duck.name}</span>
                        <span className="text-white/90 text-xs font-semibold">
                          {duck.position.toFixed(0)}%
                        </span>
                      </div>
                    </div>

                    {/* Duck container - horizontal movement controlled by GSAP */}
                    <div
                      ref={(el) => {
                        duckContainerRefs.current[duck.id] = el;
                      }}
                      className="relative flex items-center"
                      style={{
                        height: '100%',
                      }}
                    >
                      {/* Duck sprite - bobbing animation by GSAP */}
                      <div
                        ref={(el) => {
                          duckSpriteRefs.current[duck.id] = el;
                        }}
                        className="text-6xl relative z-30 duck-sprite"
                        style={{
                          filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.4))',
                        }}
                      >
                        🦆
                      </div>

                      {/* Wake/splash effect behind duck */}
                      <div
                        className="absolute left-0 w-20 h-10 bg-white/30 rounded-full blur-md"
                        style={{
                          animation: 'pulse 0.8s ease-in-out infinite',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Leaderboard sidebar */}
              <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md rounded-2xl p-4 min-w-[200px] z-30">
                <h3 className="text-white font-black text-sm mb-3 text-center">LEADERBOARD</h3>
                <div className="space-y-2">
                  {sortedDucks.map((duck, index) => (
                    <div
                      key={duck.id}
                      className={`flex items-center gap-2 p-2 rounded-xl ${
                        index === 0 ? 'bg-yellow-500/30' : 'bg-white/10'
                      }`}
                    >
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-black text-white">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white text-sm font-bold truncate">
                          {duck.name}
                        </div>
                      </div>
                      <div className="text-lg">🦆</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Screen */}
        {gameState === 'results' && winner && (
          <div className="w-full max-w-2xl animate-fade-in text-center">
            <div className="mb-8 animate-celebration">
              <div className="text-8xl mb-6">🏆</div>
              <h2 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 mb-4">
                WINNER!
              </h2>
              <div className="text-5xl font-black text-white mb-2">{winner.name}</div>
              <div className="text-2xl text-cyan-200 font-semibold">
                Finished in {formatTime(timeLimit - timeRemaining)}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl mb-8">
              <h3 className="text-2xl font-bold text-cyan-100 mb-6">Final Standings</h3>
              <div className="space-y-3">
                {sortedDucks.map((duck, index) => (
                  <div
                    key={duck.id}
                    className={`flex items-center gap-4 p-4 rounded-2xl ${
                      index === 0
                        ? 'bg-gradient-to-r from-yellow-500/30 to-orange-500/30 ring-2 ring-yellow-400'
                        : 'bg-white/5'
                    }`}
                  >
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl font-black text-white">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-bold text-white text-lg">{duck.name}</div>
                      <div className="text-cyan-200 text-sm">{duck.position.toFixed(1)}% complete</div>
                    </div>
                    <div className="text-3xl">🦆</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={raceAgain}
                className="flex-1 py-5 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-400 hover:to-orange-400 rounded-2xl text-white font-black text-xl transition-all hover:scale-105 active:scale-95 shadow-xl"
              >
                Race Again
              </button>
              <button
                onClick={resetGame}
                className="flex-1 py-5 bg-white/20 hover:bg-white/30 rounded-2xl text-white font-bold text-xl transition-all hover:scale-105 active:scale-95"
              >
                New Race
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
