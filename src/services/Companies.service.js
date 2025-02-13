import { useCallback } from 'react';
import API_BASE_URL from '../ApiConfig';

export const useCompaniesService = () => {

    const getAllCompanies = useCallback(async () => {
        const response = await fetch(`${API_BASE_URL}/companies/`);
        if (!response.ok) throw new Error('Error al obtener los compañias');
        return response.json();
    }, []);

    return { getAllCompanies };
};
