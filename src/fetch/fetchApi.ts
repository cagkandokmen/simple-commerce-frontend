const API_URL = process.env.BACKEND_API_URL || 'http://localhost:3000/';

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

async function get<T>(urlPath: string): Promise<ApiResponse<T>> {
  try {
    const token = localStorage.getItem('token'); 
    const response = await fetch(`${API_URL}${urlPath}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if(response.status >= 400 && response.status < 500){
      const data = await response.json();
      throw new Error(`${data.message}`);
    }
    if (!response.ok) throw new Error(`Unexcepted Error...`);
    const data = await response.json();
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

async function post<T>(urlPath: string, body?: any): Promise<ApiResponse<T>> {
  try {
    const token = localStorage.getItem('token'); 
    const response = await fetch(`${API_URL}${urlPath}`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(body),
    });
    if(response.status >= 400 && response.status < 500){
      const data = await response.json();
      throw new Error(`${data.message}`);
    }
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    const data = await response.json();
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

async function del<T>(urlPath: string): Promise<ApiResponse<T>> {
  try {
    const token = localStorage.getItem('token'); 
    const response = await fetch(`${API_URL}${urlPath}`, {
      method: 'DELETE',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      },
    });
    if(response.status >= 400 && response.status < 500){
      const data = await response.json();
      throw new Error(`${data.message}`);
    }
    if (!response.ok) throw new Error(`${response.status}`);
    
    return { data: null, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

export const api = { get, post, del };
