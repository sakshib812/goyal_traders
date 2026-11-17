export default function HeroIllustration() {
  return (
    <div className="hero-visual" aria-hidden="true">
      <div className="hero-svg-wrapper">
        <svg
          viewBox="0 0 540 540"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle architectural guide circles */}
          <circle cx="270" cy="270" r="175" stroke="#D9E4F5" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="270" cy="270" r="110" stroke="#E4EEFF" strokeWidth="1" />

          {/* Radiating connecting lines from peripheral nodes to hub perimeter */}
          {/* Node 1: Top */}
          <line x1="270" y1="111" x2="270" y2="222" className="svg-connecting-line" style={{ animationDelay: '100ms' }} />
          {/* Node 2: Top-Right */}
          <line x1="382" y1="158" x2="304" y2="236" className="svg-connecting-line" style={{ animationDelay: '200ms' }} />
          {/* Node 3: Right */}
          <line x1="429" y1="270" x2="318" y2="270" className="svg-connecting-line" style={{ animationDelay: '300ms' }} />
          {/* Node 4: Bottom-Right */}
          <line x1="382" y1="382" x2="304" y2="304" className="svg-connecting-line" style={{ animationDelay: '400ms' }} />
          {/* Node 5: Bottom */}
          <line x1="270" y1="429" x2="270" y2="318" className="svg-connecting-line" style={{ animationDelay: '500ms' }} />
          {/* Node 6: Bottom-Left */}
          <line x1="158" y1="382" x2="236" y2="304" className="svg-connecting-line" style={{ animationDelay: '600ms' }} />
          {/* Node 7: Left */}
          <line x1="111" y1="270" x2="222" y2="270" className="svg-connecting-line" style={{ animationDelay: '700ms' }} />
          {/* Node 8: Top-Left */}
          <line x1="158" y1="158" x2="236" y2="236" className="svg-connecting-line" style={{ animationDelay: '800ms' }} />

          {/* Central Hub Node (Paisara Core) - strictly self-contained with no intersecting lines */}
          <g className="svg-node-center">
            <circle cx="270" cy="270" r="48" fill="#FFFFFF" stroke="#2457E6" strokeWidth="2.5" />
            <circle cx="270" cy="270" r="38" fill="#F3F7FE" stroke="#E4EEFF" strokeWidth="1" />
            <circle cx="270" cy="254" r="13" fill="#2457E6" />
            <text x="270" y="259" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="800" fontFamily="sans-serif">P</text>
            <text x="270" y="280" textAnchor="middle" fill="#0E1B3D" fontSize="10" fontWeight="800" fontFamily="sans-serif" letterSpacing="0.05em">PAISARA HUB</text>
            <text x="270" y="293" textAnchor="middle" fill="#5B6B8C" fontSize="8" fontWeight="600" fontFamily="sans-serif">Single Connection</text>
          </g>

          {/* Peripheral Node 1: Mobile Recharge */}
          <g className="svg-node-outer" style={{ animationDelay: '150ms' }}>
            <circle cx="270" cy="95" r="16" fill="#FFFFFF" stroke="#2457E6" strokeWidth="1.6" />
            <circle cx="270" cy="95" r="5" fill="#2457E6" />
            <text x="270" y="68" textAnchor="middle" fill="#0E1B3D" fontSize="11" fontWeight="700" fontFamily="sans-serif">Mobile Recharge</text>
          </g>

          {/* Peripheral Node 2: DTH Top-Up */}
          <g className="svg-node-outer" style={{ animationDelay: '250ms' }}>
            <circle cx="394" cy="146" r="16" fill="#FFFFFF" stroke="#2457E6" strokeWidth="1.6" />
            <circle cx="394" cy="146" r="5" fill="#2457E6" />
            <text x="418" y="142" textAnchor="start" fill="#0E1B3D" fontSize="11" fontWeight="700" fontFamily="sans-serif">DTH Top-Up</text>
          </g>

          {/* Peripheral Node 3: Electronic Bills */}
          <g className="svg-node-outer" style={{ animationDelay: '350ms' }}>
            <circle cx="445" cy="270" r="16" fill="#FFFFFF" stroke="#2457E6" strokeWidth="1.6" />
            <circle cx="445" cy="270" r="5" fill="#2457E6" />
            <text x="445" y="306" textAnchor="middle" fill="#0E1B3D" fontSize="11" fontWeight="700" fontFamily="sans-serif">Electronic Bills</text>
          </g>

          {/* Peripheral Node 4: Utility Payments */}
          <g className="svg-node-outer" style={{ animationDelay: '450ms' }}>
            <circle cx="394" cy="394" r="16" fill="#FFFFFF" stroke="#2457E6" strokeWidth="1.6" />
            <circle cx="394" cy="394" r="5" fill="#2457E6" />
            <text x="418" y="408" textAnchor="start" fill="#0E1B3D" fontSize="11" fontWeight="700" fontFamily="sans-serif">Utility Payments</text>
          </g>

          {/* Peripheral Node 5: Insurance */}
          <g className="svg-node-outer" style={{ animationDelay: '550ms' }}>
            <circle cx="270" cy="445" r="16" fill="#FFFFFF" stroke="#2457E6" strokeWidth="1.6" />
            <circle cx="270" cy="445" r="5" fill="#2457E6" />
            <text x="270" y="482" textAnchor="middle" fill="#0E1B3D" fontSize="11" fontWeight="700" fontFamily="sans-serif">Insurance</text>
          </g>

          {/* Peripheral Node 6: Verification Checks */}
          <g className="svg-node-outer" style={{ animationDelay: '650ms' }}>
            <circle cx="146" cy="394" r="16" fill="#FFFFFF" stroke="#2457E6" strokeWidth="1.6" />
            <circle cx="146" cy="394" r="5" fill="#2457E6" />
            <text x="124" y="408" textAnchor="end" fill="#0E1B3D" fontSize="11" fontWeight="700" fontFamily="sans-serif">Verification</text>
          </g>

          {/* Peripheral Node 7: Integration Support */}
          <g className="svg-node-outer" style={{ animationDelay: '750ms' }}>
            <circle cx="95" cy="270" r="16" fill="#FFFFFF" stroke="#2457E6" strokeWidth="1.6" />
            <circle cx="95" cy="270" r="5" fill="#2457E6" />
            <text x="95" y="306" textAnchor="middle" fill="#0E1B3D" fontSize="11" fontWeight="700" fontFamily="sans-serif">Support &amp; Ops</text>
          </g>

          {/* Peripheral Node 8: White-Label Software */}
          <g className="svg-node-outer" style={{ animationDelay: '850ms' }}>
            <circle cx="146" cy="146" r="16" fill="#FFFFFF" stroke="#2457E6" strokeWidth="1.6" />
            <circle cx="146" cy="146" r="5" fill="#2457E6" />
            <text x="124" y="142" textAnchor="end" fill="#0E1B3D" fontSize="11" fontWeight="700" fontFamily="sans-serif">White-Label</text>
          </g>
        </svg>
      </div>
    </div>
  );
}
