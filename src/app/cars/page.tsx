"use client";
import { useEffect, useState } from "react";
import { getAllCars, postCar, deleteCar, updateCar } from '@/services/crud';
import { CarDocument } from '@/types/car/car';
import { CarDocumentForUpdate } from "@/types/car/car";
import Car from "@/components/Car/Car";
import FormCar from "@/components/FormCar/FormCar";
import styles from './styles.module.css';

const Home = () => {
    const [cars, setCars] = useState<CarDocument[]>([]);
    const [isForm, setIsForm] = useState(false);
    const [formData, setFormData] = useState({
        model: "",
        color: "",
        price: 0
    });
    const [loading, setLoading] = useState(true); 
    const [loadingAction, setLoadingAction] = useState<string | null>(null); 

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getAllCars();
                setCars(data);
                console.log(data);
            } catch (error) {
                console.error("Failed to fetch cars:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddCar = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoadingAction('add');
        try {
            const res = await postCar(formData);
            console.log("Car added successfully:", res);
            setIsForm(false);
            setCars((prevCars) => [...prevCars, { ...res, ...formData }]);
        } catch (error) {
            console.error("Failed to add car:", error);
        } finally {
            setLoadingAction(null); 
        }
    };

    const handleDeleteCar = async (carId: string) => {
        setLoadingAction('delete'); 
        try {
            const res = await deleteCar(carId);
            console.log("Car deleted successfully:", res);
            setCars(cars.filter(car => car._id !== carId));
        } catch (error) {
            console.error("Failed to delete car:", error);
        } finally {
            setLoadingAction(null); 
        }
    };

    const handleUpdateCar = async (updatedCar: CarDocumentForUpdate) => {
        setLoadingAction('update'); 
        try {
            const res = await updateCar(updatedCar);
            console.log("Car updated successfully:", res);
            setCars((prevCars) =>
                prevCars.map((car) =>
                    car._id === updatedCar._id ? { ...car, ...updatedCar } : car
                )
            );
        } catch (error) {
            console.error("Failed to update car:", error);
        } finally {
            setLoadingAction(null); 
        }
    };

    return (
        <div className={styles.mainContainer}>
            <h1 className={styles.title}>Cars</h1>

            {loading ? (
                <div className={styles.loading}>Loading cars...</div>
            ) : (
                <ul className={styles.tableCars}>
                    {cars.map((car) => (
                        <li key={car._id}>
                            <Car
                                carId={car._id}
                                model={car.model}
                                color={car.color}
                                price={car.price}
                                handleUpdate={handleUpdateCar}
                                handleDelete={handleDeleteCar}
                            />
                        </li>
                    ))}
                </ul>
            )}

            {loadingAction && (
                <div className={styles.loading}>Processing {loadingAction}...</div>
            )}

            <button className={styles.addCar} onClick={() => setIsForm((prev) => !prev)} disabled={loadingAction !== null}>
                Add Car
            </button>

            {isForm && 
                <FormCar 
                    handleSubmit={handleAddCar}
                    handleChange={handleChange}
                    formData={formData}            
                />
            }
        </div>
    );
};

export default Home;
