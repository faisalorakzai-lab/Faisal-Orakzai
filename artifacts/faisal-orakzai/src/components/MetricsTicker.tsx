import { useEffect } from "react";

export default function MetricsTicker() {
  const items = "OKBOND NETWORK: ACTIVE  //  RWA ENGINE: ONLINE  //  DATA CORE: DEPLOYED  //  SYSTEM STATUS: OPTIMAL  //  ORAKZAI GROUP: OPERATIONAL  //  AI SYSTEMS: LIVE  //  ";
  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
      height: '36px', background: 'rgba(0,0,0,0.95)',
      borderTop: '1px solid rgba(212,175,55,0.2)',
      overflow: 'hidden', display: 'flex', alignItems: 'center'
    }}>
      <div style={{
        display: 'flex', whiteSpace: 'nowrap',
        animation: 'ticker-scroll 35s linear infinite'
      }}>
        {[items, items, items].map((t, i) => (
          <span key={i} style={{ 
            fontFamily: 'monospace', fontSize: '11px', 
            color: 'rgba(212,175,55,0.6)', letterSpacing: '0.15em',
            paddingRight: '4rem'
          }}>{t}</span>
        ))}
      </div>
    </div>
  );
}