import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
const Pagina2 = () => {
    const [userData, setUserData] = useState(null);
    const [sessions, setSessions] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const imagesByCategory = {
        'app.cycling': 'https://picsum.photos/350?random=1',
        'app.running': 'https://picsum.photos/350?random=2',
        'app.swimming': 'https://picsum.photos/350?random=3'
    };

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

        const fetchSessionData = async () => {
            try {
                const response = await fetch('https://my.api.mockaroo.com/session.json?key=93a69f50');
                const sessionData = await response.json();
                setSessions(sessionData);
            } catch (error) {
                console.error('Error fetching session data:', error);
            }
        };
        fetchSessionData();
    }, []);

    if (!userData || sessions.length === 0) {
        return <div>Loading...</div>;
    }

    const handlePostClick = (category, cardContent) => {
        setSelectedCard({
            image: imagesByCategory[category],
            content: cardContent 
        });
        setShowModal(true);
    };

    const categories = ['app.cycling', 'app.running', 'app.swimming'];

    return (
        <div className="container mt-4">
            <div className="row g-0">
                {categories.map((category, index) => (
                    <div key={index} className="col-md-4 text-center">
                    <h1>
                        <FormattedMessage id={category} defaultMessage="error" />
                    </h1>
                    {[...Array(5)].map((_, rowIndex) => (
                        <div key={rowIndex} className="d-flex justify-content-center mb-0">
                            {[0, 1].map((colIndex) => {
                                const sessionIndex = index * 10 + rowIndex * 2 + colIndex; 
                                const session = sessions[sessionIndex % sessions.length]; 

                                const cardContent = (
                                    <>
                                        <p style={{ margin: '0', fontSize: '1rem' }}>
                                            <FormattedMessage
                                                id="app.session"
                                                defaultMessage="Internazionalizacion fallando"
                                                values={{ category: <FormattedMessage id={category} defaultMessage="Error" /> }}
                                            />
                                        </p>
                                        <p style={{ margin: '0', fontSize: '0.85rem' }}>
                                            <FormattedMessage id="app.sessionDesc" defaultMessage="Tour around the bay of" /> <span style={{ color: 'red' }}>{session.city}</span>
                                        </p>
                                        <p style={{ margin: '0', fontWeight: 'bold', color: 'red' }}>
                                            {session.distance} km - {session.time}h
                                        </p>
                                    </>
                                );

                                return (
                                    <div
                                        key={colIndex}
                                        className="card me-0"
                                        style={{ cursor: 'pointer', margin: '2px', position: 'relative', width: '180px', height: '180px' }}
                                        onClick={() => handlePostClick(category, cardContent)} 
                                    >
                                        <img
                                            src={imagesByCategory[category]}
                                            alt={`${category} Post`}
                                            className="card-img-top"
                                            style={{ width: '100%', height: '100%' }}
                                        />
                                        <div
                                            className="text-overlay"
                                            style={{
                                                position: 'absolute',
                                                top: '10px',
                                                left: '10px',
                                                color: 'white',
                                                fontWeight: 'bold',
                                                textAlign: 'left',
                                                zIndex: '10'
                                            }}
                                        >
                                            {cardContent}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
                ))}
            </div>

            <div className="card mt-4">
                <div className="card-body" style={{ backgroundColor: '#01616B' }}>
                    <div className="row">
                        <div className="col-md-12 d-flex justify-content-around align-items-center">
                            <div className="d-flex align-items-center">
                                <img
                                    src={`https://picsum.photos/200`}
                                    alt="Profile"
                                    className="rounded-circle img-fluid"
                                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                />
                                <h2 className="card-title ms-3" style={{ color: 'white' }}>{userData.nombre}</h2>
                            </div>
                            <div className="d-flex align-items-center">
                                <img
                                    src={`https://picsum.photos/200`}
                                    alt="Profile"
                                    className="rounded-circle img-fluid"
                                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                />
                                <h2 className="card-title ms-3" style={{ color: 'white' }}>{userData.corriendo}</h2>
                            </div>
                            <div className="d-flex align-items-center">
                                <img
                                    src={`https://picsum.photos/200`}
                                    alt="Profile"
                                    className="rounded-circle img-fluid"
                                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                />
                                <h2 className="card-title ms-3" style={{ color: 'white' }}>{userData.nadando}</h2>
                            </div>
                            <div className="d-flex align-items-center">
                                <img
                                    src={`https://picsum.photos/200`}
                                    alt="Profile"
                                    className="rounded-circle img-fluid"
                                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                />
                                <h2 className="card-title ms-3" style={{ color: 'white' }}>{userData.cicla}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body className="text-center">
                    {selectedCard && (
                        <div style={{ position: 'relative', width: '100%', textAlign: 'left' }}>
                            <div style={{ position: 'relative' }}>
                                <img src={selectedCard.image} alt="Selected post" className="img-fluid mb-3" style={{ width: '100%' }} />
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '10px',
                                        left: '10px',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        textAlign: 'left',
                                        zIndex: '10'
                                    }}
                                >
                                     <div style={{ textAlign: 'left' }}>
                            {selectedCard.content}
                        </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        <FormattedMessage id="app.closeModal" defaultMessage="error" />
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Pagina2;
