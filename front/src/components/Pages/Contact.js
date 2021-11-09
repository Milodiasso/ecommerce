import { Card, Row, Col } from "react-bootstrap"
import Map from "../Map/Map"

const Contact = () => {


    return (
        <div className="contact">


            <Row className="info" >


                <h3><b> Nous contacter pour un devis ou une question : </b> </h3>
                <Col>
                    <Card style={{ width: '18rem', minHeight: "230px" }}>
                        <Card.Body>
                            <Card.Title>Téléphone</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Bureau</Card.Subtitle>
                            <Card.Text>
                                03 83 45 45 45
                            </Card.Text>
                            <Card.Link href="#">Card Link</Card.Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card style={{ width: '18rem', minHeight: "230px" }}>
                        <Card.Body>
                            <Card.Title>Email</Card.Title>
                            <Card.Text>
                                mail@mail.fr
                            </Card.Text>
                            <Card.Link href="#">Card Link</Card.Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card style={{ width: '18rem', minHeight: "230px" }}>
                        <Card.Body>
                            <Card.Title>Adresse</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Magasin à Nancy</Card.Subtitle>
                            <Card.Text>
                                <h5> Lor'n Tech </h5>
                                <div> 14 rue de lorraine</div>
                                <div> 54000 </div>
                                <div> Nancy </div>
                            </Card.Text>
                            <Card.Link href="#">Card Link</Card.Link>
                        </Card.Body>
                    </Card>
                </Col>

                <Col>
                    <Card style={{ width: '18rem', minHeight: "230px" }}>
                        <Card.Body>
                            <Card.Title>Horraire d'ouverture</Card.Title>
                            <Card.Text>
                                Lundi au vendredi: fermé
                            </Card.Text>
                            <Card.Link href="#">Card Link</Card.Link>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>

            <div className="map-holder">
                <Map />

            </div>

        </div>
    )
}

export default Contact