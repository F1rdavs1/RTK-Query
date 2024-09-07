import React, { useState } from "react";
import {
  useGetCarsQuery,
  useAddCarMutation,
  useDeleteCarMutation,
  useUpdateCarMutation,
} from "./Api";

const CarsPage = () => {
  const { data: cars, isLoading } = useGetCarsQuery();
  const [addCar] = useAddCarMutation();
  const [deleteCar] = useDeleteCarMutation();
  const [updateCar] = useUpdateCarMutation();
  const [newCar, setNewCar] = useState("");
  const [carId, setCarId] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  if (isLoading) return <p>Loading...</p>;

  const handleAddCar = async () => {
    await addCar({ name: newCar });
    setNewCar("");
  };

  const handleUpdateCar = async () => {
    await updateCar({ id: carId, name: updatedName });
    setCarId(null);
    setUpdatedName("");
  };

  return (
    <div>
      <h1>Cars</h1>
      <ul>
        {cars.map((car) => (
          <li key={car.id}>
            {car.name}
            <button onClick={() => deleteCar(car.id)}>Delete</button>
            <button
              onClick={() => {
                setCarId(car.id);
                setUpdatedName(car.name);
              }}
            >
              Update
            </button>
          </li>
        ))}
      </ul>
      <input
        value={newCar}
        onChange={(e) => setNewCar(e.target.value)}
        placeholder="A new car"
      />
      <button onClick={handleAddCar}>Add a car</button>

      {carId && (
        <div>
          <input
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            placeholder="Updated name"
          />
          <button onClick={handleUpdateCar}>Update</button>
        </div>
      )}
    </div>
  );
};

export default CarsPage;
