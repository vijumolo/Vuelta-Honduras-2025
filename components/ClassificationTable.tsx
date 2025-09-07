import React, { useState, useMemo } from 'react';
import type { RiderResult, TeamResult, ClassificationType } from '../types';
import CountryFlag from './CountryFlag';

interface ClassificationTableProps {
  title: string;
  data: (RiderResult | TeamResult)[];
  headers: string[];
  type: ClassificationType;
}

const ClassificationTable: React.FC<ClassificationTableProps> = ({ title, data, headers, type }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const isRiderList = (item: RiderResult | TeamResult): item is RiderResult => type === 'rider';

  const { teams, countries, categories } = useMemo(() => {
    const teamSet = new Set(data.map(item => item.equipo));
    const countrySet = new Set<string>();
    const categorySet = new Set<string>();

    if (type === 'rider') {
        (data as RiderResult[]).forEach(item => {
            countrySet.add(item.pais);
            if(item.categoria) {
                categorySet.add(item.categoria);
            }
        });
    }

    return {
        teams: Array.from(teamSet).sort(),
        countries: Array.from(countrySet).sort(),
        categories: Array.from(categorySet).sort()
    };
  }, [data, type]);


  const filteredData = useMemo(() => {
    return data.filter(item => {
      const teamMatch = selectedTeam ? item.equipo === selectedTeam : true;
      
      if (isRiderList(item)) {
        const nameMatch = item.nombre.toLowerCase().includes(searchTerm.toLowerCase());
        const countryMatch = selectedCountry ? item.pais === selectedCountry : true;
        const categoryMatch = selectedCategory ? item.categoria === selectedCategory : true;
        return nameMatch && teamMatch && countryMatch && categoryMatch;
      }

      const teamNameMatch = item.equipo.toLowerCase().includes(searchTerm.toLowerCase());
      return teamNameMatch && teamMatch;
    });
  }, [data, searchTerm, selectedTeam, selectedCountry, selectedCategory, isRiderList]);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 md:p-6 border-b border-gray-200">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">{title}</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder={type === 'rider' ? "Buscar por ciclista..." : "Buscar por equipo..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <select
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
          >
            <option value="">Todos los equipos</option>
            {teams.map(team => <option key={team} value={team}>{team}</option>)}
          </select>
          {type === 'rider' && countries.length > 0 && (
            <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
            >
                <option value="">Todos los países</option>
                {countries.map(country => <option key={country} value={country}>{country}</option>)}
            </select>
          )}
           {type === 'rider' && categories.length > 0 && (
            <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
            >
                <option value="">Todas las categorías</option>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          )}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-max text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {headers.map(header => (
                <th key={header} className="px-4 py-3 text-sm font-semibold text-gray-600 uppercase tracking-wider">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredData.map((item, index) => (
              <tr key={index} className={`hover:bg-gray-100 transition-colors duration-150 ${item.puesto === 1 ? 'bg-yellow-100 font-bold' : ''}`}>
                {isRiderList(item) ? (
                  <>
                    <td className="px-4 py-3 whitespace-nowrap w-16 text-center">{item.puesto}</td>
                    <td className="px-4 py-3 whitespace-nowrap w-20 text-center">{item.dorsal}</td>
                    <td className="px-4 py-3 whitespace-nowrap min-w-[200px]">
                        <div className="flex items-center space-x-3">
                            <CountryFlag countryCode={item.pais} />
                            <span className="font-medium text-gray-900">{item.nombre}</span>
                        </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-600">{item.equipo}</td>
                    {headers.includes('Categoría') && <td className="px-4 py-3 whitespace-nowrap text-gray-600">{item.categoria || '--'}</td>}
                    {headers.includes('Tiempo') && <td className="px-4 py-3 whitespace-nowrap">{item.tiempo}</td>}
                    {headers.includes('Vel. Prom.') && <td className="px-4 py-3 whitespace-nowrap">{item.velProm}</td>}
                    {headers.includes('Puntos') && <td className="px-4 py-3 whitespace-nowrap text-center">{item.puntos}</td>}
                  </>
                ) : (
                  <>
                    <td className="px-4 py-3 whitespace-nowrap w-16 text-center">{item.puesto}</td>
                    <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">{item.equipo}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{item.tiempo}</td>
                    {headers.includes('Dif.') && <td className="px-4 py-3 whitespace-nowrap">{item.dif}</td>}
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
         {filteredData.length === 0 && (
            <div className="text-center py-10 text-gray-500">
                <p>No se encontraron resultados para los filtros seleccionados.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default ClassificationTable;
