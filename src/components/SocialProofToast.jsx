import { useState, useEffect } from 'react';

const NOTIFICATIONS = [
  {
    id: 1,
    user: 'Sarah M. from Texas',
    action: 'purchased',
    item: 'Keychron K2 Mechanical Keyboard',
    timeAgo: '2 mins ago',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=100&q=80',
    badge: '⚡ Flash Sale Item',
  },
  {
    id: 2,
    user: 'Alex R. from California',
    action: 'claimed coupon',
    item: '90% OFF Lucky Wheel Deal',
    timeAgo: 'Just now',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=100&q=80',
    badge: '🎉 Coupon Unlocked',
  },
  {
    id: 3,
    user: 'Michael K. from New York',
    action: 'purchased',
    item: 'LG UltraGear 27" Gaming Monitor',
    timeAgo: '5 mins ago',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=100&q=80',
    badge: '🔥 Almost Sold Out',
  },
  {
    id: 4,
    user: 'Elena D. from Florida',
    action: 'unlocked',
    item: 'FREE SHIPPING + 2 Free Gifts',
    timeAgo: '1 min ago',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80',
    badge: '🎁 Reward Claimed',
  },
];

export function SocialProofToast() {
  const [currentToast, setCurrentToast] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      // Pick next notification
      const toast = NOTIFICATIONS[index % NOTIFICATIONS.length];
      index++;

      setCurrentToast(toast);
      setIsVisible(true);

      // Hide after 4.5 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 4500);
    }, 9000); // Trigger new toast every 9 seconds

    return () => clearInterval(interval);
  }, []);

  if (!currentToast) return null;

  return (
    <div
      className={`fixed bottom-4 left-4 z-40 max-w-xs transition-all duration-500 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-6 scale-95 pointer-events-none'
      }`}
    >
      <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl shadow-xl p-3 flex items-center gap-3 relative overflow-hidden">
        {/* Left Image */}
        <div className="relative w-12 h-12 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-color)] overflow-hidden flex-shrink-0">
          <img
            src={currentToast.image}
            alt={currentToast.item}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 text-xs">
          <div className="flex items-center justify-between gap-1">
            <span className="font-extrabold text-[var(--text-primary)] truncate">
              {currentToast.user}
            </span>
            <span className="text-[10px] text-[var(--text-muted)] font-medium flex-shrink-0">
              {currentToast.timeAgo}
            </span>
          </div>

          <p className="text-[11px] text-[var(--text-muted)] truncate">
            {currentToast.action} <strong className="text-[var(--brand-primary)]">{currentToast.item}</strong>
          </p>

          <span className="inline-block mt-1 bg-[var(--bg-tertiary)] text-[var(--brand-secondary)] text-[9px] font-black px-1.5 py-0.5 rounded border border-[var(--border-color)] uppercase">
            {currentToast.badge}
          </span>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="text-[var(--text-muted)] hover:text-[var(--text-primary)] text-xs font-bold px-1"
        >
          ✕
        </button>

        {/* Bottom Accent Line */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--brand-primary)]" />
      </div>
    </div>
  );
}