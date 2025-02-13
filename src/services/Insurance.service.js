import { useCallback } from 'react';
import API_BASE_URL from '../ApiConfig';
import { useAuthService } from './AuthUser.service';

export const useInsuranceService = () => {
  const { getUser } = useAuthService();

  const getInsurance = useCallback(async () => {
    const user = getUser();
    if (!user || !user.id) throw new Error('Usuario no autenticado');

    const response = await fetch(`${API_BASE_URL}/insurances/user/${user.id}`);
    if (!response.ok) throw new Error('Error al obtener los seguros');
    return response.json();
  }, [getUser]);

  const createInsurance = useCallback(async (insuranceFormData, healthFormData, homeFormData, soatFormData, vehicleFormData) => {
    const user = getUser();
    if (!user || !user.id) throw new Error('Usuario no autenticado');

    try {
      let healthResponse = null;
      let homeResponse = null;
      let soatResponse = null;
      let vehicleResponse = null;

      // Crear un seguro de salud si es necesario
      if (insuranceFormData.product === 'Responsabilidad Civil Médica') {
        const response = await fetch(`${API_BASE_URL}/health`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(healthFormData),
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Error al crear el seguro de salud: ${errorData.message}`);
        }
        healthResponse = await response.json();
      }

      // Crear un seguro de hogar si es necesario
      if (insuranceFormData.product === 'Póliza Hogar') {
        const response = await fetch(`${API_BASE_URL}/home`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(homeFormData),
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Error al crear el seguro de hogar: ${errorData.message}`);
        }
        homeResponse = await response.json();
      }

      // Crear un seguro SOAT si es necesario
      if (insuranceFormData.product === 'SOAT') {
        const response = await fetch(`${API_BASE_URL}/soat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(soatFormData),
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Error al crear el seguro SOAT: ${errorData.message}`);
        }
        soatResponse = await response.json();
      }

      // Crear un seguro de vehículo si es necesario
      if (insuranceFormData.product === 'Póliza Todo Riesgo – Auto o Moto') {
        const response = await fetch(`${API_BASE_URL}/vehicle`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(vehicleFormData),
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Error al crear el seguro de vehículo: ${errorData.message}`);
        }
        vehicleResponse = await response.json();
      }

      // Crear el seguro
      const responseInsurance = await fetch(`${API_BASE_URL}/insurances`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...insuranceFormData,
          user_id: user.id,
          health_id: healthResponse?.health_id || null,
          home_id: homeResponse?.home_id || null,
          soat_id: soatResponse?.soat_id || null,
          vehicle_id: vehicleResponse?.vehicle_id || null,
        }),
      });

      if (!responseInsurance.ok) {
        const errorData = await responseInsurance.json();
        throw new Error(`Error al crear el seguro: ${errorData.message}`);
      }

      window.location.reload();
    } catch (error) {
      console.error('Error en createInsurance:', error);
      throw error;
    }
  }, [getUser]);

  return { getInsurance, createInsurance };
};
