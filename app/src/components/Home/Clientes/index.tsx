import { useState } from 'react';
import { Carousel, Col, Container, Row } from 'react-bootstrap';
import Estrela from '../../../assets/estrela.svg';
import { Content } from './style';

export function Clientes() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  return (
    <Content>
      <Container>
        <Row>
          <Col lg={12}>
            <h2>O que nossos clientes estão dizendo</h2>
          </Col>
        </Row>

        <Row>
          <Col lg={12}> 
            <Carousel activeIndex={index} onSelect={handleSelect}>
              <Carousel.Item>
                <Row>
                  <Col lg={6}>
                    <div className="depoimentos">
                      <h3>Alex Goulart</h3>
                      <h3>Chefe de operações - TD52F</h3>

                      <img src={Estrela} alt="Estrela" />
                      <img src={Estrela} alt="Estrela" />
                      <img src={Estrela} alt="Estrela" />
                      <img src={Estrela} alt="Estrela" />
                      <img src={Estrela} alt="Estrela" />

                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Ut dapibus ac tortor vitae feugiat. Cras id risus vitae
                        sem ornare pretium. Etiam convallis nulla ac imperdiet
                        vulputate. Nulla vestibulum sapien in magna convallis,
                        sit amet pharetra nisl mattis. Duis laoreet lacus eget
                        mauris tempus rutrum.
                      </p>
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="embed-responsive embed-responsive-16by9">
                      <iframe
                        src="https://www.youtube.com/embed/4IQStrUnUKM"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      ></iframe>
                    </div>
                  </Col>
                </Row>
              </Carousel.Item>

              <Carousel.Item>
                <Row>
                  <Col lg={6}>
                    <div className="depoimentos">
                      <h3>Jeff Bezos</h3>
                      <h3>CEO Amazon</h3>

                      <img src={Estrela} alt="Estrela" />
                      <img src={Estrela} alt="Estrela" />
                      <img src={Estrela} alt="Estrela" />
                      <img src={Estrela} alt="Estrela" />
                      <img src={Estrela} alt="Estrela" />

                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Ut dapibus ac tortor vitae feugiat. Cras id risus vitae
                        sem ornare pretium. Etiam convallis nulla ac imperdiet
                        vulputate. Nulla vestibulum sapien in magna convallis,
                        sit amet pharetra nisl mattis. Duis laoreet lacus eget
                        mauris tempus rutrum.
                      </p>
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="embed-responsive embed-responsive-16by9">
                      <iframe
                        src="https://www.youtube.com/embed/SCpgKvZB_VQ"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      ></iframe>
                    </div>
                  </Col>
                </Row>
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </Container>
    </Content>
  );
}
