import {API_CONFIG} from '@/config/api'

export class PetTypeService{
     constructor() {
    this.baseUrl = `${API_CONFIG.BASE_URL}/api/pettype`;
  }

  async getAll(){
     try {
      const response = await fetch(this.baseUrl, {
        method: 'GET',
        credentials: 'include'
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `HTTP error! status: ${response.status}`;
        
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.Message || errorData.message || errorMessage;
        } catch {
          errorMessage = errorText || errorMessage;
        }
        
        throw new Error(errorMessage);
      }

      const petTypes = await response.json();
      return petTypes;

    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

async getAllWithCategoties(){
 try {
      const response = await fetch(`${this.baseUrl}/categories`, {
        method: 'GET',
        credentials: 'include'
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `HTTP error! status: ${response.status}`;
        
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.Message || errorData.message || errorMessage;
        } catch {
          errorMessage = errorText || errorMessage;
        }
        
        throw new Error(errorMessage);
      }

      const petTypes = await response.json();
      return petTypes;

    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
}

async insert(petTypeRequest) {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(petTypeRequest)
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `HTTP error! status: ${response.status}`;
        
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.Message || errorData.message || errorMessage;
        } catch {
          errorMessage = errorText || errorMessage;
        }
        
        throw new Error(errorMessage);
      }

      const createdPetType = await response.json();
      return createdPetType;

    } catch (error) {
      console.error('Error creating pet type', error);
      throw error;
    }
  }

  async updateWithCategories(petTypeUpdateRequest){
     try{
        const response = await fetch(this.baseUrl, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(petTypeUpdateRequest)
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `HTTP error! status: ${response.status}`;
        
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.Message || errorData.message || errorMessage;
        } catch {
          errorMessage = errorText || errorMessage;
        }
        
        throw new Error(errorMessage);
      }

      const updatedPetType = await response.json();
      return updatedPetType;

     }
     catch(error){
        console.error('Error updating petType:', error);
      throw error;
     }
  }

 async deleteById(id) {
    try {
      console.log('Deleting pet type with ID:', id);

      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `HTTP error! status: ${response.status}`;
        
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.Message || errorData.message || errorMessage;
        } catch {
          errorMessage = errorText || errorMessage;
        }
        
        throw new Error(errorMessage);
      }
      return { success: true, message: 'pet type deleted successfully' };

    } catch (error) {
      console.error('Error deleting pet type:', error);
      throw error;
    }
  }
}

export const petTypeService = new PetTypeService();