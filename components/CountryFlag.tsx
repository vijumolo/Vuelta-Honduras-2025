import React from 'react';

interface CountryFlagProps {
  countryCode: string;
}

const countryFlagMap: { [key: string]: string } = {
  COL: '🇨🇴',
  HON: '🇭🇳',
  CRC: '🇨🇷',
  GUA: '🇬🇹',
  USA: '🇺🇸',
  ESA: '🇸🇻',
  CAN: '🇨🇦',
};

const CountryFlag: React.FC<CountryFlagProps> = ({ countryCode }) => {
  const flag = countryFlagMap[countryCode.toUpperCase()];
  
  if (!flag) {
    return <span className="text-lg w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full">?</span>;
  }

  return (
    <span className="text-2xl" role="img" aria-label={`Flag for ${countryCode}`}>
      {flag}
    </span>
  );
};

export default CountryFlag;