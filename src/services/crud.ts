const url = "/api/cars/";
import { CarDocument, CarDocumentForUpdate } from '@/types/car/car'

export const getAllCars = async () => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
        }
    
        const data = await response.json();
        return data;

    } catch (error:any) {
        console.error(error.message);
        throw new Error(error.message);
    }
}

export const postCar = async (newCar:CarDocument) => {
    try {
        const response = await fetch(url, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(newCar), 
        });

        if (response.ok) {
            const result = await response.json(); 
            return result;
        } else {
            console.error("Error:", response.statusText);
            throw new Error(`Response status: ${response.statusText}`);
        }
    } catch (error:any) {
        console.error("Fetch error:", error);
        throw new Error(error.message);
    }
}

export const deleteCar = async (carId:string) => {
    try {
        const response = await fetch(url+carId, {
            method: 'DELETE', 
            headers: {
                'Content-Type': 'application/json', 
            },
        });

        if (response.ok) {
            const result = await response.json(); 
            return result;
        } else {
            console.error("Error:", response.statusText);
            throw new Error(`Response status: ${response.statusText}`);
        }
    } catch (error:any) {
        console.error("Fetch error:", error);
        throw new Error(error.message);
    }
}

export const updateCar = async (updateCar:CarDocumentForUpdate) => {
    try {
        const response = await fetch(url+updateCar._id, {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(updateCar), 
        });

        if (response.ok) {
            const result = await response.json(); 
            return result;
        } else {
            console.error("Error:", response.statusText);
            throw new Error(`Response status: ${response.statusText}`);
        }
    } catch (error:any) {
        console.error("Fetch error:", error);
        throw new Error(error.message);
    }
}





