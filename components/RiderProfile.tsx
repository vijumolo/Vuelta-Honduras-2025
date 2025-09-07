import React, { useMemo } from 'react';
import { CLASSIFICATIONS } from '../data/classifications';
import { RiderResult } from '../types';
import CountryFlag from './CountryFlag';

interface RiderProfileProps {
  dorsal: string;
  onClose: () => void;
}

const RiderProfile: React.FC<RiderProfileProps> = ({ dorsal, onClose }) => {
  const riderData = useMemo(() => {
    const dorsalNum = parseInt(dorsal, 10);
    if (isNaN(dorsalNum)) return null;

    let riderInfo: RiderResult | null = null;
    const results: { [key: string]: RiderResult } = {};

    for (const key in CLASSIFICATIONS) {
      const classification = CLASSIFICATIONS[key];
      if (classification.type === 'rider') {
        const riderResult = (classification.data as RiderResult[]).find(
          r => r.dorsal === dorsalNum
        );
        if (riderResult) {
          if (!riderInfo) {
            riderInfo = riderResult;
          }
          results[key] = riderResult;
        }
      }
    }

    if (!riderInfo) return null;

    return { riderInfo, results };
  }, [dorsal]);

  if (!riderData) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 text-center">
        <h2 className="text-xl font-bold text-red-600">Ciclista no encontrado</h2>
        <p className="text-gray-600 mt-2">No se encontraron resultados para el dorsal #{dorsal}.</p>
        <button
          onClick={onClose}
          className="mt-6 px-4 py-2 bg-sky-600 text-white font-semibold rounded-md hover:bg-sky-700 transition-colors"
        >
          Volver a las clasificaciones
        </button>
      </div>
    );
  }

  const { riderInfo, results } = riderData;
  const stageOrder = ['General', 'Etapa 1', 'Etapa 2', 'Etapa 3', 'Etapa 4', 'Etapa 5'];

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-start">
            <div>
                <div className="flex items-center space-x-4">
                    <CountryFlag countryCode={riderInfo.pais} />
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">{riderInfo.nombre}</h2>
                        <p className="text-gray-600">{riderInfo.equipo}</p>
                    </div>
                </div>
                 <p className="text-lg font-semibold text-gray-700 mt-2">Dorsal: <span className="text-sky-600">#{riderInfo.dorsal}</span></p>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300 transition-colors"
            >
              &larr; Volver
            </button>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-4">Resumen de Resultados</h3>
        <div className="overflow-x-auto">
            <table className="w-full min-w-max text-left">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-2 text-sm font-semibold text-gray-600">Clasificación</th>
                        <th className="px-4 py-2 text-sm font-semibold text-gray-600">Puesto</th>
                        <th className="px-4 py-2 text-sm font-semibold text-gray-600">Tiempo</th>
                        <th className="px-4 py-2 text-sm font-semibold text-gray-600">Vel. Prom.</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {stageOrder.map(stageKey => {
                        const result = results[stageKey];
                        return (
                            <tr key={stageKey} className="hover:bg-gray-50">
                                <td className="px-4 py-3 font-medium">{stageKey}</td>
                                {result ? (
                                    <>
                                        <td className="px-4 py-3">{result.puesto}</td>
                                        <td className="px-4 py-3">{result.tiempo || '--'}</td>
                                        <td className="px-4 py-3">{result.velProm || '--'}</td>
                                    </>
                                ) : (
                                    <td colSpan={3} className="px-4 py-3 text-gray-500 italic">No participó o no finalizó</td>
                                )}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default RiderProfile;
