import { useState } from 'react';

const PRIZES = [
  { label: '$100 BUNDLE', color: '#fb641b', discount: 100, code: 'TEMU100' },
  { label: '90% OFF', color: '#dc2626', discount: 0.9, code: 'MEGA90' },
  { label: 'FREE GIFT', color: '#16a34a', discount: 0, code: 'FREEGIFT' },
  { label: '50% OFF', color: '#2563eb', discount: 0.5, code: 'HALF50' },
  { label: '$20 OFF', color: '#9333ea', discount: 20, code: 'TAKE20' },
  { label: 'EXTRA 15%', color: '#ea580c', discount: 0.15, code: 'SAVE15' },
];

export function SpinWheelModal({ isOpen, onClose, onApplyCoupon }) {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState(null);

  if (!isOpen) return null;

  const handleSpin = () => {
    if (spinning || wonPrize) return;

    setSpinning(true);

    // Random prize index selection
    const prizeIndex = Math.floor(Math.random() * PRIZES.length);
    const selectedPrize = PRIZES[prizeIndex];

    // Calculate rotation (minimum 5 full spins = 1800 deg + segment offset)
    const segmentAngle = 360 / PRIZES.length;
    const prizeAngle = 360 - (prizeIndex * segmentAngle + segmentAngle / 2);
    const totalRotation = rotation + 1800 + (prizeAngle - (rotation % 360));

    setRotation(totalRotation);

    setTimeout(() => {
      setSpinning(false);
      setWonPrize(selectedPrize);
    }, 4500);
  };

  const handleClaim = () => {
    if (wonPrize) {
      onApplyCoupon(wonPrize);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
        onClick={spinning ? undefined : onClose}
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-sm bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl shadow-2xl overflow-hidden flex flex-col items-center text-center p-6 space-y-5">
        
        {/* Header */}
        <div>
          <span className="bg-[var(--brand-secondary)] text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
            ⚡ LIMITED TIME OFFER
          </span>
          <h2 className="text-xl font-black text-[var(--text-primary)] mt-2">
            SPIN & WIN COUPONS!
          </h2>
          <p className="text-xs text-[var(--text-muted)] font-medium">
            Test your luck to unlock massive discounts on your cart.
          </p>
        </div>

        {/* Wheel Graphic */}
        <div className="relative w-64 h-64 flex items-center justify-center my-2">
          {/* Pointer Arrow */}
          <div className="absolute -top-3 z-20 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-yellow-400 drop-shadow-md" />

          {/* Rotating Wheel Container */}
          <div
            className="w-full h-full rounded-full border-4 border-yellow-400 overflow-hidden relative shadow-xl transition-transform duration-[4500ms] ease-out"
            style={{
              transform: `rotate(${rotation}deg)`,
            }}
          >
            {PRIZES.map((prize, idx) => {
              const angle = (360 / PRIZES.length) * idx;
              return (
                <div
                  key={idx}
                  className="absolute w-1/2 h-1/2 top-0 right-0 origin-bottom-left flex items-center justify-center text-white font-black text-[10px] tracking-tighter"
                  style={{
                    backgroundColor: prize.color,
                    transform: `rotate(${angle}deg) skewY(-30deg)`,
                  }}
                >
                  <span
                    style={{
                      transform: 'skewY(30deg) rotate(30deg) translateY(-24px)',
                      display: 'block',
                    }}
                  >
                    {prize.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Center Hub Button */}
          <button
            onClick={handleSpin}
            disabled={spinning || wonPrize !== null}
            className="absolute z-10 w-16 h-16 rounded-full bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase shadow-lg border-2 border-white flex items-center justify-center cursor-pointer transition-transform active:scale-95 disabled:opacity-80 disabled:cursor-not-allowed"
          >
            {spinning ? '...' : wonPrize ? 'WON!' : 'SPIN'}
          </button>
        </div>

        {/* Winner Result View */}
        {wonPrize ? (
          <div className="w-full space-y-3 bg-[var(--bg-tertiary)] p-4 rounded-xl border border-[var(--border-color)] animate-bounce-short">
            <span className="text-2xl">🎉</span>
            <h3 className="text-sm font-black text-[var(--brand-primary)]">
              CONGRATS! YOU UNLOCKED {wonPrize.label}!
            </h3>
            <p className="text-xs text-[var(--text-muted)] font-mono">
              Code: <strong className="text-[var(--text-primary)]">{wonPrize.code}</strong>
            </p>
            <button
              onClick={handleClaim}
              className="w-full py-2.5 bg-[var(--brand-primary)] hover:opacity-90 text-white font-black text-xs rounded-lg uppercase tracking-wider shadow-md cursor-pointer"
            >
              CLAIM & APPLY TO CART
            </button>
          </div>
        ) : (
          <button
            onClick={onClose}
            disabled={spinning}
            className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] underline font-medium disabled:opacity-50"
          >
            No thanks, I'll pay full price
          </button>
        )}

      </div>
    </div>
  );
}