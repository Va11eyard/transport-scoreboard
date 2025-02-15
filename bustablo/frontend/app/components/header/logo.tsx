import React from 'react';
import AituLogo from '../../logos/Aitu.png';
import iQadamLogo from '../../logos/iQadam.png';
import CTSLogo from '../../logos/CTS.png';

export function Logo() {
  return (
    <div className="w-fit flex gap-8 items-center justify-center px-8 bg-white py-3">
        <img src={CTSLogo.src} alt="" className="items-center w-24 h-12" />
        <img src={iQadamLogo.src} alt="" className="items-center w-42 h-12" />
        <img src={AituLogo.src} alt="" className="items-center w-24 h-12" />
    </div>
  );
}