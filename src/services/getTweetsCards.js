import axios from 'axios';

// axios.defaults.baseURL = 'https://642d706866a20ec9ce9d8e3d.mockapi.io/api/v1';

// let limitPerPage = 9;

export const getTweetsCards = async (page) => {
    const BASE_URL = 'https://642d706866a20ec9ce9d8e3d.mockapi.io/api/v1';
  
    const response = await axios.get(
      `${BASE_URL}/users?page=${page}&limit=3`
    );
    return response.data;
  };