import React, { useState } from 'react';

interface HeaderProps {
    onSearch: (dorsal: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
    const [dorsalInput, setDorsalInput] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(dorsalInput);
        setDorsalInput('');
    };

  return (
    <header className="bg-sky-600 shadow-lg">
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor" role="img" aria-hidden="true">
                  <path fillRule="evenodd" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-12H9v2h2v2H9v2h2v-2h2V9h-2V7z" clipRule="evenodd" />
                  <path d="M12.5 8.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM10 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm5.78-3.41c.42-.34.64-.86.55-1.37-.09-.51-.43-.94-.88-1.18l-1.55-.83c-.45-.24-.98-.24-1.43 0l-1.55.83c-.45.24-.79.67-.88 1.18-.09.51-.13-1.03-.55-1.37l-1.55-.83c-.45-.24-.98-.24-1.43 0l-1.55.83zM6.22 8.59c-.42.34-.64.86-.55 1.37.09.51.43.94.88 1.18l1.55.83c.45.24.98.24 1.43 0l1.55-.83c.45-.24.79-.67.88-1.18.09-.51-.13-1.03-.55-1.37l-1.55-.83c-.45-.24-.98-.24-1.43 0l-1.55.83z"/>
                </svg>
                <div>
                     <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Vuelta a Honduras 2025</h1>
                     <p className="text-sky-200 text-sm">Resultados Oficiales</p>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="w-full md:w-auto flex gap-2">
                <input
                    type="search"
                    placeholder="Buscar por dorsal..."
                    value={dorsalInput}
                    onChange={(e) => setDorsalInput(e.target.value)}
                    className="w-full md:w-48 px-3 py-2 border border-sky-400 rounded-md focus:outline-none focus:ring-2 focus:ring-white bg-sky-500 text-white placeholder-sky-200"
                    aria-label="Buscar por dorsal"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-white text-sky-600 font-semibold rounded-md hover:bg-sky-100 focus:outline-none focus:ring-2 focus:ring-white transition-colors"
                >
                    Buscar
                </button>
            </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
