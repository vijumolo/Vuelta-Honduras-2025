import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Tabs from './components/Tabs';
import ClassificationTable from './components/ClassificationTable';
import { CLASSIFICATIONS } from './data/classifications';
import RiderProfile from './components/RiderProfile';

const App: React.FC = () => {
  const classificationKeys = useMemo(() => Object.keys(CLASSIFICATIONS), []);
  const [activeTab, setActiveTab] = useState<string>(classificationKeys[0]);
  const [searchedDorsal, setSearchedDorsal] = useState<string | null>(null);

  const activeClassification = CLASSIFICATIONS[activeTab];
  
  const handleSearch = (dorsal: string) => {
    if (dorsal.trim()) {
      setSearchedDorsal(dorsal.trim());
    }
  };

  const handleCloseProfile = () => {
    setSearchedDorsal(null);
  };


  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      <Header onSearch={handleSearch} />
      <main className="container mx-auto p-4 md:p-6 lg:p-8">
        {searchedDorsal ? (
          <RiderProfile dorsal={searchedDorsal} onClose={handleCloseProfile} />
        ) : (
          <>
            <Tabs
              tabs={classificationKeys}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <div className="mt-6">
              {activeClassification && (
                <ClassificationTable
                  key={activeTab}
                  title={activeClassification.title}
                  data={activeClassification.data}
                  headers={activeClassification.headers}
                  type={activeClassification.type}
                />
              )}
            </div>
          </>
        )}
      </main>
      <footer className="text-center py-4 text-gray-500 text-sm">
        <p>Vuelta a Honduras 2025 | Race Results Viewer</p>
      </footer>
    </div>
  );
};

export default App;
