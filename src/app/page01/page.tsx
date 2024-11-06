"use client";
import { useEffect, useState } from "react";
import { getAllCars, postCar, deleteCar, updateCar } from '@/services/crud';
import { CarDocument } from '@/app/api/cars/route'

const Home = () => {
    const [cars, setCars] = useState<CarDocument[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllCars();
            setCars(data);
            console.log(data);
        };
        fetchData();
    }, []);

    const handleAddCar = async () => {
        const newCar = {
            model: "me3333",
            color: "white",
            price: 1453
        };
        const res = await postCar(newCar);
        console.log("Car added successfully:", res);
        setCars((prevCars) => [...prevCars, newCar]);
    };

    const handleDeleteCar = async () => {
        const carId = '6729fb2bc547d6f4af94b261';
        const res = await deleteCar(carId);
        console.log("Car deleted successfully:", res);
        setCars(cars.filter(car => car._id !== carId));
    };

    const handleUpdateCar = async () => {
        const updatedCar = {
            _id: "6729fb89c547d6f4af94b262",
            price: 2000
        };
        const res = await updateCar(updatedCar);
        console.log("Car updated successfully:", res);
        setCars((prevCars) => prevCars.map(car => car._id === updatedCar._id ? res : car));
    };

    return (
        <div>
            <h1>Home</h1>
            <ul>
                {cars.map((car) => (
                    <li key={car._id}>
                        Model: {car.model}, Color: {car.color}, Price: ${car.price}
                    </li>
                ))}
            </ul>
            <button onClick={handleAddCar}>Add Car</button>
            <button onClick={handleDeleteCar}>Delete Car</button>
            <button onClick={handleUpdateCar}>Update Car</button>
        </div>
    );
};

export default Home;
