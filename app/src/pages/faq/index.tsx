import { useCallback, useEffect, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { SearchInput } from '../../components/SearchInput';
import { SEO } from '../../components/SEO';
import { Spacer } from '../../components/Spacer';
import Layout from '../../components/AreaFornecedor/Layout';
import { useRouter } from 'next/router';
import {
  ContainerPost,
  ContainerFilterTags,
  ContainerFilterTopics,
  Content,
  FilterTags,
  FilterTopicCard,
  RowCentered,
  Subtitulo,
  PostItem,
  PostFaqCardBody,
  TagItemPost,
  ContainerTagPost,
  ContentButton,
  Button,
} from '../../components/FAQ/style';
import { IFaqPost } from '../../interfaces/IFaq';
import { CustomToggle } from '../../components/FAQ/CustomToggle';
import { consultas_api } from '../../services/consultas_api';
import { geral_api } from '../../services/geral_api';
import { GetStaticProps } from 'next';
import { version } from '../../../package.json';
import { TIME_REVALIDATE } from 'src/const';
import { Spinner } from 'src/components/Spinner';
import { SemConteudo } from 'src/components/SemConteudo';

interface IProps {
  appVersion: string;
}

export default function FaqContent({ appVersion }: IProps) {
  const [categories, setCategories] = useState<
    { id: string; descricao: string }[]
  >([]);
  const [tags, setTags] = useState<{ id: string; descricao: string }[]>([]);
  const [postsFaq, setPostsFaq] = useState<IFaqPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [hasEndingPosts, setHasEndingPosts] = useState(false);
  const [filterTagSelected, setFilterTagSelected] = useState('');
  const [filterCategorySelected, setFilterCategorySelected] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  const loadMoreRef = useRef(null);

  const router = useRouter();
  const getPostsAndSetOrIncrementIntoState = useCallback(
    async (reset?: boolean) => {
      try {
        const SIZE_TO_GET_FAQ = 10;
        setLoading(true);

        const bodyToSearch: any = {};

        if (searchTerm.length > 0) {
          bodyToSearch['termo'] = searchTerm;
        }

        if (filterTagSelected && filterTagSelected.length > 0) {
          bodyToSearch['ids_tags'] = [filterTagSelected];
        }

        if (filterCategorySelected && filterCategorySelected.length > 0) {
          bodyToSearch['id_categoria'] = filterCategorySelected;
        }

        const { data: responsePostInfos } = await consultas_api.post(
          `/consulta/faq?limit=${SIZE_TO_GET_FAQ}&page=${currentPage}`,
          bodyToSearch,
        );
        let { values: posts }: { values: IFaqPost[] } = responsePostInfos;

        if (currentPage >= responsePostInfos.pages) {
          setHasEndingPosts(true);
        } else {
          setHasEndingPosts(false);
        }

        if (reset) {
          setPostsFaq(posts);
          return;
        }

        setPostsFaq(posts);
      } catch (error: any) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    },
    [currentPage, searchTerm, filterTagSelected, filterCategorySelected],
  );

  // when a filter change
  useEffect(() => {
    setCurrentPage(1);
    getPostsAndSetOrIncrementIntoState(true);
  }, [
    searchTerm,
    filterTagSelected,
    filterCategorySelected,
    getPostsAndSetOrIncrementIntoState,
  ]);

  useEffect(() => {
    const getAllCategoriesAndTagsFromApi = async () => {
      const { data: categoriesFromApi } = await geral_api.get(
        '/faqs/categorias',
      );
      const { data: tagsFromApi } = await geral_api.get('/faqs/tags');

      setCategories(categoriesFromApi);
      setTags(tagsFromApi);
    };
    getAllCategoriesAndTagsFromApi();
  }, []);

  return (
    <Content>
      <SEO title="Tem alguma dúvida?" indexPage />
      <Layout
        versao={appVersion}
        isConsumidor={false}
        titleIsNotBold={true}
        titulo="Como posso te ajudar?"
      >
        <Subtitulo>
          Tem alguma dúvida? Talvez algum colega já tenha passado pela mesma
          situação. Dê uma olhadinha aqui abaixo.
        </Subtitulo>

        <Spacer size={36} />

        <Container>
          <RowCentered>
            <Col lg={7}>
              <SearchInput
                onChange={(term: string) => setSearchTerm(term)}
                placeholder="Pesquisa"
              />

              <Spacer size={16} />

              <ContainerFilterTags>
                {tags.map(tagFilter => (
                  <FilterTags
                    key={tagFilter.id}
                    selected={filterTagSelected === tagFilter.id}
                    onClick={() => {
                      if (loading) return;
                      setFilterTagSelected(oldSelected =>
                        oldSelected === tagFilter.id ? '' : tagFilter.id,
                      );
                    }}
                  >
                    #{tagFilter.descricao}
                  </FilterTags>
                ))}
              </ContainerFilterTags>
            </Col>
          </RowCentered>

          <Spacer size={32} />

          <RowCentered>
            <Col lg={10}>
              <ContainerFilterTopics>
                {categories.map(categoryFilter => (
                  <FilterTopicCard
                    key={categoryFilter.id}
                    selected={filterCategorySelected === categoryFilter.id}
                    onClick={() => {
                      if (loading) return;

                      setFilterCategorySelected(oldSelected =>
                        oldSelected === categoryFilter.id
                          ? ''
                          : categoryFilter.id,
                      );
                    }}
                  >
                    {categoryFilter.descricao}
                  </FilterTopicCard>
                ))}
              </ContainerFilterTopics>
            </Col>
          </RowCentered>

          <Spacer size={36} />

          <RowCentered>
            <Col lg={12}>
              <ContainerPost>
                {postsFaq && !loading ? (
                  postsFaq.map((post: IFaqPost) => (
                    <PostItem key={post.id}>
                      <CustomToggle eventKey={post.id.toString()} post={post} />
                      <PostFaqCardBody eventKey={post.id.toString()}>
                        <>
                          <p>{post.conteudo}</p>
                          <ContainerTagPost>
                            {post.tags &&
                              post.tags.map(tag => (
                                <TagItemPost key={tag.id}>
                                  #{tag.descricao}
                                </TagItemPost>
                              ))}
                          </ContainerTagPost>
                        </>
                      </PostFaqCardBody>
                    </PostItem>
                  ))
                ) : (
                  <p
                    ref={loadMoreRef}
                    style={{
                      display: !loading ? 'none' : 'block',
                    }}
                  >
                    Carregando mais posts... <Spinner size="15px" />
                  </p>
                )}
                {postsFaq.length === 0 && !loading && (
                  <SemConteudo mensagem="Nenhum post encontrado." />
                )}
              </ContainerPost>
            </Col>
          </RowCentered>

          <Row>
            <Col>
              {hasEndingPosts && (
                <b>
                  Não encontrou o que procurava?
                  <a
                    href="https://api.whatsapp.com/send/?phone=55061991053691"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {' '}
                    Fale conosco.
                  </a>
                </b>
              )}
              <Spacer size={50} />
              <ContentButton>
                <Button onClick={() => router.back()}>Voltar</Button>
              </ContentButton>
              <Spacer size={180} />
            </Col>
          </Row>
        </Container>
      </Layout>
    </Content>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const appVersion = version;

  return {
    props: {
      appVersion,
    },
    revalidate: TIME_REVALIDATE,
  };
};
