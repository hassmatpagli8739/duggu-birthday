"use client";

import { useEffect, useRef, useState } from "react";

const particles = Array.from({ length: 30 }, (_, index) => index);

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [popped, setPopped] = useState<number[]>([]);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [candlesBlown, setCandlesBlown] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  const startMusic = () => {
    if (!audioRef.current) return;

    audioRef.current
      .play()
      .then(() => setMusicPlaying(true))
      .catch(() => {});
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (musicPlaying) {
      audioRef.current.pause();
      setMusicPlaying(false);
    } else {
      startMusic();
    }
  };

  const popBalloon = (id: number) => {
    setPopped((current) => [...current, id]);
  };

  const blowCandles = () => {
    startMusic();

    setCandlesBlown(true);

    setTimeout(() => {
      setStep(2);
    }, 2000);
  };

  const allPopped = popped.length === 3;

  if (loading) {
    return (
      <main className="loading-screen">
        <div className="loading-glow" />

        <div className="loading-heart">♡</div>

        <p className="loading-small">
          SOMETHING SPECIAL IS WAITING
        </p>

        <h1>
          Preparing Your
          <span>Surprise</span>
        </h1>

        <div className="loading-line">
          <div />
        </div>

        <p className="loading-percent">100%</p>
      </main>
    );
  }

  return (
    <main className="birthday-page">
      <audio
        ref={audioRef}
        src="/music/birthday.mp3"
        loop
      />

      <button
        className="music-button"
        onClick={toggleMusic}
        aria-label="Toggle music"
      >
        {musicPlaying ? "♫" : "♪"}
      </button>

      <div className="particles">
        {particles.map((particle) => (
          <span
            key={particle}
            className="particle"
            style={{
              left: `${(particle * 37) % 100}%`,
              animationDelay: `${(particle * 0.7) % 8}s`,
              animationDuration: `${5 + (particle % 6)}s`,
            }}
          >
            ✦
          </span>
        ))}
      </div>

      {/* =========================
          PAGE 1 — CAKE
      ========================= */}

      {step === 1 && (
        <section className="hero-screen cake-opening-screen">
          <div className="glow glow-one" />
          <div className="glow glow-two" />

          <div className="premium-badge">
            
             MADE FOR MY CUTE DUGGU 
               
          </div>

          <div
            className={`luxury-cake ${
              candlesBlown ? "candles-blown" : ""
            }`}
          >
            <div className="cake-glow" />

            <div className="cake-candles">
              <span className="candle">
                {!candlesBlown && <i className="flame" />}
                {candlesBlown && <i className="smoke" />}
              </span>

              <span className="candle">
                {!candlesBlown && <i className="flame" />}
                {candlesBlown && <i className="smoke" />}
              </span>

              <span className="candle">
                {!candlesBlown && <i className="flame" />}
                {candlesBlown && <i className="smoke" />}
              </span>
            </div>

            <div className="cake-top">
              <span className="cake-decoration">✦</span>
              <span className="cake-decoration">♡</span>
              <span className="cake-decoration">✦</span>
            </div>

            <div className="cake-layer cake-layer-top">
              <span />
              <span />
              <span />
            </div>

            <div className="cake-layer cake-layer-middle">
              <span />
              <span />
              <span />
            </div>

            <div className="cake-layer cake-layer-bottom">
              <span />
              <span />
              <span />
            </div>

            <div className="cake-plate" />
          </div>

          <button
            className="main-button candle-button"
            onClick={blowCandles}
            disabled={candlesBlown}
          >
            {candlesBlown ? (
              <>
                Candles Blown
                <span>✨</span>
              </>
            ) : (
              <>
                Blow the Candles
                <span>🕯️</span>
              </>
            )}
          </button>

          <p className="love-you-text">
            I LOVE YOU SO MUCH DUGGU ❤️
          </p>
        </section>
      )}

      {/* =========================
          PAGE 2 — HAPPY BIRTHDAY
      ========================= */}

      {step === 2 && (
        <section className="hero-screen">
          <div className="stars">
            ✦　✧　✦　✧　✦
          </div>

          <div className="big-heart">♡</div>

          <p className="small-title">
            CHAPTER ONE
          </p>

          <h1>
            Happy Birthday
            <span>DUGGU ❤️</span>
          </h1>

          <p className="subtitle">
            EVERY BEAUTIFULL STORY DESRVE'S A BEAUTIFULL BEGINING JUST LIKE YOUU 😘.
          </p>

          <button
            className="main-button"
            onClick={() => setStep(3)}
          >
            Open Your Surprise
            <span>✨</span>
          </button>
        </section>
      )}

      {/* =========================
          PAGE 3 — BALLOON GAME
      ========================= */}

      {step === 3 && (
        <section className="hero-screen">
          <p className="small-title">
            A LITTLE GAME
          </p>

          <h1>
            Pop the
            <span>Balloons</span>
          </h1>

          <p className="subtitle">
            DUGGU, POP EACH BALLOON AND REVEAL THE MAGIC.
          </p>

          <div className="balloon-container">
            {[1, 2, 3].map((id) =>
              popped.includes(id) ? (
                <span key={id} className="pop">
                  ✨
                </span>
              ) : (
                <button
                  key={id}
                  className="balloon"
                  onClick={() => popBalloon(id)}
                  aria-label={`Pop balloon ${id}`}
                />
              )
            )}
          </div>

          {allPopped && (
            <div className="unlock-area">
              <p className="unlock-text">
                ALL SURPRISES UNLOCKED ✨
              </p>

              <button
                className="main-button"
                onClick={() => setStep(4)}
              >
                Unlock Memories
                <span>→</span>
              </button>
            </div>
          )}
        </section>
      )}

      {/* =========================
          PAGE 4 — MEMORIES
      ========================= */}

      {step === 4 && (
        <section className="memory-screen">
          <p className="small-title">
            CHAPTER TWO
          </p>

          <h1>
            Beautiful
            <span>Memories</span>
          </h1>

          <p className="subtitle">
            SOME MEMORIES OF MY DUGGU 😍.
          </p>

          <div className="memory-grid">
            <div className="memory-card">
              <img
                src="/images/photo1.jpg"
                alt="DUGGU memory 1"
              />

              <div className="memory-overlay">
                <span>MEMORY 01</span>
                <strong> MY LITTLE DUGGU </strong>
              </div>
            </div>

            <div className="memory-card">
              <img
                src="/images/photo2.jpg"
                alt="DUGGU memory 2"
              />

              <div className="memory-overlay">
                <span>MEMORY 02</span>
                <strong>CUTIE PIE</strong>
              </div>
            </div>

            <div className="memory-card">
              <img
                src="/images/photo3.jpg"
                alt="DUGGU memory 3"
              />

              <div className="memory-overlay">
                <span>MEMORY 03</span>
                <strong>FOREVER SPECIAL</strong>
              </div>
            </div>
          </div>

          <button
            className="main-button"
            onClick={() => setStep(5)}
          >
            One Last Surprise
            <span>💌</span>
          </button>
        </section>
      )}

      {/* =========================
          PAGE 5 — FINAL LETTER
      ========================= */}

      {step === 5 && (
        <section className="hero-screen">
          {!envelopeOpen ? (
            <>
              <p className="small-title">
                FINAL CHAPTER
              </p>

              <h1>
                A Letter
                <span>FOR DUGGU</span>
              </h1>

              <p className="subtitle">
                Some words deserve to be opened slowly.
              </p>

              <button
                className="envelope"
                onClick={() => setEnvelopeOpen(true)}
                aria-label="Open birthday letter"
              >
                <span>✉</span>
              </button>

              <p className="open-text">
                CLICK TO OPEN
              </p>
            </>
          ) : (
            <div className="letter">
              <div className="letter-symbol">♡</div>

              <p className="small-title">
                A LITTLE MESSAGE
              </p>

              <h1>
                For
                <span>DUGGU ❤️</span>
              </h1>

              <p>
                Honestly, mujhe nahi pata ki main jo feel karta hoon usse words mein kaise explain karun, but aaj main bas itna chahta hoon ki tumhe pata ho ki tum kitni special ho mere liye . Tumhari smile mein kuch aisa hai jo normal moments ko bhi beautiful bana deta hai.... majak nhi karta mai .
              </p>

              <p>
               Main hope karta hoon ki ye saal tumhe woh happiness de jo hamesha tumhare saath rahe, woh moments de jinhe tum life bhar yaad rakho, aur woh saara love mile jo tum deserve karti ho. Tum bahut precious ho . Hamesha smile karti rehna, khud jaisi ho waisi hi rehna.
              </p>

              <p className="final-message">
                Happy Birthday, DUGGU! 🎂
              </p>

              <button
                className="main-button"
                onClick={() => {
                  setStep(1);
                  setPopped([]);
                  setEnvelopeOpen(false);
                  setCandlesBlown(false);
                }}
              >
                Experience Again
                <span>↻</span>
              </button>
            </div>
          )}
        </section>
      )}
    </main>
  );
}