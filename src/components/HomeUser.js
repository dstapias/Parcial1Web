import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';  // Importamos Modal y Button de react-bootstrap
const HomeUser = () => {
    const [userData, setUserData] = useState(null);
    const [postImages, setPostImages] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [selectedImage, setSelectedImage] = useState(null); // Imagen seleccionada para el modal
    const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal
    const navigate = useNavigate();
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

        // Manejar el cambio de tamaño de la ventana
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        // Limpiar el listener al desmontar el componente
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Array de dependencias vacío asegura que el useEffect se ejecute solo una vez

    // Fetch para obtener las imágenes de los posts desde picsum.photos
    useEffect(() => {
        const fetchImages = async () => {
            const images = [];
            for (let i = 0; i < 12; i++) {
                images.push(`https://picsum.photos/350?random=${i}`);
            }
            setPostImages(images);
        };

        fetchImages();
    }, []); // Este useEffect también se ejecuta solo una vez

    // Si userData es null, mostramos un mensaje de carga
    if (!userData) {
        return <div>Loading...</div>;
    }

    const handleImageClick = () => {
        navigate('/user-profile'); // Navegar a la ruta /user-profile
    };
    const handlePostClick = (image) => {
        setSelectedImage(image); // Establecer la imagen seleccionada
        setShowModal(true); // Mostrar el modal
    };

    const getColumnClass = () => {
        if (windowWidth >= 992) {
            return 'col-lg-3'; // 4 columnas para pantallas >=992px
        }
        if (windowWidth >= 800) {
            return 'col-md-3'; // 4 columnas para pantallas >=800px
        }
        else if (windowWidth >= 768) {
            return 'col-md-4'; // 3 columnas para pantallas entre 768px y 991px
        }
        else if (windowWidth >= 576) {
            return 'col-sm-4'; // 3 columnas para pantallas entre 576px y 767px
        }
        else if (windowWidth >= 500) {
            return 'col-4'; // 3 columnas para pantallas entre 500px y 575px
        }
        else {
            return 'col-6'; // 2 columnas para pantallas menores de 500px
        }
    };

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        {/* Imagen de perfil a la izquierda */}
                        <div className="col-md-4 d-flex align-items-center">
                            <img
                                src={`https://picsum.photos/200`}
                                alt="Profile"
                                className="rounded-circle img-fluid"
                                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                                onClick={handleImageClick}
                            />
                        </div>

                        {/* Información de perfil a la derecha */}
                        <div className="col-md-8">
                            <h2 className="card-title">
                                {userData.full_name} <small className="text-muted">(@{userData.username})</small>
                            </h2>
                            <p className="card-text">{userData.description}</p>
                            <a
                                href={`https://${userData.url}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="card-link"
                            >
                                {userData.url}
                            </a>

                            {/* Lista de posts, followers, following */}
                            <div className="mt-3">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Posts: {userData.post_number}</li>
                                    <li className="list-group-item">Followers: {userData.followers}</li>
                                    <li className="list-group-item">Following: {userData.following}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <h3>Recent Posts</h3>
                <div className="row">
                    {postImages.map((image, index) => (
                        <div key={index} className={`${getColumnClass()} mb-3`}>
                            <div className="card">
                                <img
                                    src={image}
                                    alt={`Post ${index + 1}`}
                                    className="card-img-top"
                                    onClick={() => handlePostClick(image)}
                                    style={{ cursor: 'pointer' }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Modal para mostrar la imagen seleccionada */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Post</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    {selectedImage && <img src={selectedImage} alt="Selected post" className="img-fluid" />}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default HomeUser;
