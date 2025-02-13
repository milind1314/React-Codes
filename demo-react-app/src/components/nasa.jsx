import axios from "axios";
import { useEffect, useState } from "react";

export function Nasa() {
    const [marsObject, setMarsObject] = useState({ photos: [] });
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY")
            .then((response) => {
                setMarsObject(response.data);
            })
            .catch((err) => {
                console.error("Error fetching Mars photos:", err);
                setError("Failed to load Mars photos. Please try again later.");
            });
    }, []);

    return (
        <div className="container-fluid">
            <h3 className="mb-4">Mars Rover Photos</h3>
            {error ? <p className="text-danger">{error}</p> : null}
            <main className="d-flex flex-wrap justify-content-center">
                {marsObject.photos.map((item) => (
                    <div key={item.id} className="card m-3 p-2" style={{ width: "18rem" }}>
                        <img src={item.img_src} className="card-img-top img-fluid" alt="Mars Rover" />
                        <div className="card-header text-center">
                            <h5 className="mb-0">Photo ID: {item.id}</h5>
                        </div>
                        <div className="card-body">
                            <dl>
                                <dt>Camera Name</dt>
                                <dd>{item.camera.full_name}</dd>
                                <dt>Rover Name</dt>
                                <dd>{item.rover.name}</dd>
                            </dl>
                        </div>
                    </div>
                ))}
            </main>
        </div>
    );
}
