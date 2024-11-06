"use client";
import { CarDocumentForUpdate } from "@/types/car/car";
import { useState } from "react";
import styles from './FormCar.module.css';

interface CarFormData {
    model: string;
    color: string;
    price: number;
}

interface FormCarProps {
    handleSubmit: (e: React.FormEvent) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    formData: CarFormData;
}

const FormCar = ({ handleSubmit, handleChange, formData}: FormCarProps) => {

    return (
        <form className={styles.FormCar} onSubmit={handleSubmit}>
                    <div>
                        <label>Model</label>
                        <input
                            type="text"
                            name="model"
                            value={formData.model}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Color</label>
                        <input
                            type="text"
                            name="color"
                            value={formData.color}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Price</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <button type="submit">OK</button>
                    </div>
        </form>
    );

};

export default FormCar;

