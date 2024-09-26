import React, { useEffect, useState } from 'react';

const UserProfileForm = () => {
    const [userData, setUserData] = useState(null);

    // Generar aleatoriamente si un campo es editable o solo visible como label
    const isEditable = {
        username: Math.random() > 0.5,
        full_name: Math.random() > 0.5,
        description: Math.random() > 0.5,
        url: Math.random() > 0.5,
    };

    // Fetch para obtener los datos de usuario desde Mockaroo
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('https://my.api.mockaroo.com/users.json?key=93a69f50');
                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, []);

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body text-center">
                    {/* Imagen de perfil */}
                    <div className="d-flex justify-content-center mb-4">
                        <img
                            src={`https://picsum.photos/200`}
                            alt="Profile"
                            className="rounded-circle"
                            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                        />
                    </div>

                    <form>
                        {/* Nombre de usuario */}
                        <div className="form-group mb-3">
                            <label>Nombre de usuario</label>
                            {isEditable.username ? (
                                <input
                                    type="text"
                                    className="form-control"
                                    defaultValue={userData.username}
                                />
                            ) : (
                                <p className="form-control">{userData.username}</p>
                            )}
                        </div>

                        {/* Nombre completo */}
                        <div className="form-group mb-3">
                            <label>Nombre completo</label>
                            {isEditable.full_name ? (
                                <input
                                    type="text"
                                    className="form-control"
                                    defaultValue={userData.full_name}
                                />
                            ) : (
                                <p className="form-control">{userData.full_name}</p>
                            )}
                        </div>

                        {/* Descripción del perfil */}
                        <div className="form-group mb-3">
                            <label>Descripción del perfil</label>
                            {isEditable.description ? (
                                <input
                                    type="text"
                                    className="form-control"
                                    defaultValue={userData.description}
                                />
                            ) : (
                                <p className="form-control">{userData.description}</p>
                            )}
                        </div>

                        {/* URL página personal */}
                        <div className="form-group mb-3">
                            <label>URL página personal</label>
                            {isEditable.url ? (
                                <input
                                    type="text"
                                    className="form-control"
                                    defaultValue={userData.url}
                                />
                            ) : (
                                <p className="form-control">{userData.url}</p>
                            )}
                        </div>

                        <button type="submit" className="btn btn-primary">Guardar Cambios</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserProfileForm;
