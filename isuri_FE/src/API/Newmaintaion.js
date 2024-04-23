import axios from 'axios';

const maintenanceAPI = {
    fetchMaintenanceRecords: async (filters) => {
        // Make the API call to fetch maintenance records using Axios or your preferred HTTP library
        const response = await axios.get('http://localhost:2000/api/maintenance/all', { params: filters });
        return response.data; // Assuming the API response contains the data field with maintenance records
    },
};

export default maintenanceAPI;
