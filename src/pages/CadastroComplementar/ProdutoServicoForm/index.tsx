import { useEffect, useState } from 'react';
import Avatar from 'react-avatar-edit';
import { Col, Container, Form, FormCheck, Row } from 'react-bootstrap';
import { Accordion } from '../../../components/Accordion';
import { AccordionItem } from '../../../components/Accordion/AccordionItem';
import Button from '../../../components/Button';
import { Spacer } from '../../../components/Spacer';
import { TituloForm } from '../../../components/TituloForm';
import { Content } from './style';

export function ProdutoServicoForm() {
  const [, setFoto] = useState({});
  const [clientSide, setClientSide] = useState(false);

  useEffect(() => { // Called on client
    setClientSide(true);
  }, [clientSide]);

  function onBeforeFileLoad(elem: any) {
    if (elem.target.files[0].size > 71680) {
      alert('Imagem muito grande(em desenvolvimento)');
      elem.target.value = '';
    }
  }

  return (
    <Content>
      <Container>
        <Spacer size={80} />
        <TituloForm titulo="Você realiza prestação de serviço por hora?" />
        <Row className="mt-4">
          <Col lg={2} className="servico-hora">
            <FormCheck
              id="servico-hora"
              type="radio"
              name="servico-hora"
              value={1}
              label="Sim"
            />

            <FormCheck
              id="servico-hora"
              type="radio"
              name="servico-hora"
              value={2}
              label="Não"
            />
          </Col>
        </Row>

        <Spacer size={80} />
        <TituloForm titulo="Cadastro de serviços e produtos" />
        <Row className="mt-4">
          <Col lg={9}>
            <Accordion>
              <AccordionItem
                idHeader="servico"
                idCollapse="collapse-servico"
                title="Nome do serviço"
              >
                <Row className="mt-4 mb-4">
                  <Col lg={3} className="avatar mb-4">
                  {/* {clientSide &&<Avatar
                      width={196}
                      height={196}
                      onCrop={setFoto}
                      onClose={() => setFoto({})}
                      onBeforeFileLoad={onBeforeFileLoad}
                      // src={foto.src}
                    />} */}
                  </Col>

                  <Col lg={6}>
                    <Row>
                      <Col lg={12}>
                        <Form.Label>Nome do serviço</Form.Label>
                        <Form.Control type="text" placeholder="Obrigatório" />
                      </Col>
                      <Col lg={12} className="mt-4">
                        <Form.Label>Descrição do serviço</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                      </Col>

                      <Col lg={12} className="mt-4">
                        <Form.Label>Link da apresentação</Form.Label>
                        <Form.Control type="text" />
                      </Col>

                      <Col lg={12} className="mt-4">
                        <Form.Label>Método de entrega</Form.Label>
                        <Form.Control type="text" />
                      </Col>

                      <Col lg={12} className="mt-4">
                        <Form.Label>Case de sucesso</Form.Label>
                        <Form.Control type="text" />
                      </Col>

                      <Col lg={6} className="mt-4">
                        <Form.Label>Nome do pacote</Form.Label>
                        <Form.Control type="text" />
                      </Col>

                      <Col lg={6} className="mt-4">
                        <Form.Label>Pré-requisitos</Form.Label>
                        <Form.Control type="text" />
                      </Col>

                      <Col lg={12} className="mt-4">
                        <Form.Label>Entregas</Form.Label>
                        <Form.Control type="text" />
                      </Col>

                      <Col lg={6} className="mt-4">
                        <Form.Label>Horas para entrega</Form.Label>
                        <Form.Control type="text" />
                      </Col>

                      <Col lg={6} className="mt-4">
                        <Form.Label>Valor do pacote</Form.Label>
                        <Form.Control type="text" />
                      </Col>

                      <Col lg={6} className="mt-4">
                        <Form.Label>Permite revisão de orçamento?</Form.Label>
                        <div className="revisao-orcamento">
                          <FormCheck
                            id="revisao-orcamento"
                            type="radio"
                            name="revisao-orcamento"
                            value={1}
                            label="Sim"
                          />

                          <FormCheck
                            id="revisao-orcamento"
                            type="radio"
                            name="revisao-orcamento"
                            value={2}
                            label="Não"
                          />
                        </div>
                      </Col>

                      <Col lg={6} className="mt-4">
                        <Form.Label>
                          Primeira reunião <br /> obrigatória?
                        </Form.Label>
                        <div className="reuniao-obrigatoria">
                          <FormCheck
                            id="reuniao-obrigatoria"
                            type="radio"
                            name="reuniao-obrigatoria"
                            value={1}
                            label="Sim"
                          />

                          <FormCheck
                            id="reuniao-obrigatoria"
                            type="radio"
                            name="reuniao-obrigatoria"
                            value={2}
                            label="Não"
                          />
                        </div>
                      </Col>

                      <Col lg={12} className="mt-4">
                        <FormCheck
                          id="possui-autoria"
                          label="Eu declaro que possuo autoria sobre o material produzido"
                        />
                      </Col>

                      <Col lg={12} className="mt-4 btn-salvar">
                        <Button>SALVAR SERVIÇO</Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </AccordionItem>

              <AccordionItem
                idHeader="produto"
                idCollapse="collapse-produto"
                title="Nome do produto"
              >
                <Row className="mt-4 mb-4">
                  <Col lg={3} className="avatar mb-4">
                  {/* {clientSide &&<Avatar
                      width={196}
                      height={196}
                      onCrop={setFoto}
                      onClose={() => setFoto({})}
                      onBeforeFileLoad={onBeforeFileLoad}
                      // src={foto.src}
                    />} */}
                  </Col>

                  <Col lg={6}>
                    <Row>
                      <Col lg={12}>
                        <Form.Label>Nome do produto</Form.Label>
                        <Form.Control type="text" placeholder="Obrigatório" />
                      </Col>
                      <Col lg={12} className="mt-4">
                        <Form.Label>Descrição do produto</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                      </Col>
                      <Col lg={12} className="mt-4">
                        <Form.Label>Passo a passo</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                      </Col>

                      <Col lg={12} className="mt-4">
                        <Form.Label>Link da apresentação</Form.Label>
                        <Form.Control type="text" />
                      </Col>

                      <Col lg={6} className="mt-4">
                        <Form.Label>Garantia</Form.Label>
                        <Form.Control type="text" />
                      </Col>

                      <Col lg={6} className="mt-4">
                        <Form.Label>Tempo de acesso</Form.Label>
                        <Form.Control type="text" />
                      </Col>

                      <Col lg={12} className="mt-4">
                        <FormCheck
                          id="possui-autoria"
                          label="Eu declaro que possuo autoria sobre o material produzido"
                        />
                      </Col>

                      <Col lg={6} className="mt-4">
                        <Form.Label className="upload" htmlFor="upload-manual">
                          UPLOAD MANUAL
                        </Form.Label>
                        <Form.Control type="file" id="upload-manual" />
                      </Col>

                      <Col lg={6} className="mt-4">
                        <Form.Label className="upload" htmlFor="upload-produto">
                          UPLOAD PRODUTO
                        </Form.Label>
                        <Form.Control type="file" id="upload-produto" />
                      </Col>

                      <Col lg={12} className="mt-4 btn-salvar">
                        <Button>SALVAR PRODUTO</Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </AccordionItem>
            </Accordion>
          </Col>
        </Row>
      </Container>
    </Content>
  );
}
