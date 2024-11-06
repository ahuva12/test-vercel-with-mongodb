"use client";
import { CarDocumentForUpdate } from "@/types/car/car";
import { useState } from "react";
import styles from './Car.module.css';
import FormCar from "../FormCar/FormCar";

interface CarProps {
    carId: any;
    model: string;
    color: string;
    price: number;
    handleUpdate: (updatedCar:CarDocumentForUpdate) => Promise<void>;
    handleDelete: (carId:string) => Promise<void>;
}

const Car = ({ carId, model, color, price, handleUpdate, handleDelete }: CarProps) => {

    const [isForm, setIsForm] = useState(false);
    const [formData, setFormData] = useState({
        model,
        color,
        price,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await handleUpdate({
            _id: carId,
            ...formData,
        });
        setIsForm(false); 
    };

    return (
        <div className={styles.Car}>
            <div className={styles.details}>
                <p>Model: {model}</p>
                <p>Color: {color}</p>
                <p>Price: {price}</p>
            </div>
            <div className={styles.buttons}>
                <button style={{ backgroundColor: '#03af03' }} onClick={() => setIsForm((prev) => !prev)}>update</button>
                <button style={{ backgroundColor: '#f73838' }} onClick={() => handleDelete(carId)}>delete</button>
            </div>
            {isForm && 
               <FormCar 
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    formData={formData}            
               />
            }
        </div>
    );
};

export default Car;
