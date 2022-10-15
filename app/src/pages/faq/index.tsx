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

  const loadMoreRef = useRef(null);

  const router = useRouter();
  const getPostsAndSetOrIncrementIntoState = useCallback(
    async (reset?: boolean) => {
      const SIZE_TO_GET_FAQ = 10;

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

      setPostsFaq(oldPosts => [...oldPosts, ...posts]);
    },
    [currentPage, searchTerm, filterTagSelected, filterCategorySelected],
  );

  useEffect(() => {
    getPostsAndSetOrIncrementIntoState();
  }, [getPostsAndSetOrIncrementIntoState, currentPage]);

  // when a filter change
  useEffect(() => {
    setCurrentPage(1);
    getPostsAndSetOrIncrementIntoState(true);

    // eslint-disable-next-line
  }, [searchTerm, filterTagSelected, filterCategorySelected]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(entities => {
      const target = entities[0];

      if (target.isIntersecting) {
        setCurrentPage(old => old + 1);
      }
    }, options);

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
  }, []);

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
                    onClick={() =>
                      setFilterTagSelected(oldSelected =>
                        oldSelected === tagFilter.id ? '' : tagFilter.id,
                      )
                    }
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
                    onClick={() =>
                      setFilterCategorySelected(oldSelected =>
                        oldSelected === categoryFilter.id
                          ? ''
                          : categoryFilter.id,
                      )
                    }
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
                {postsFaq.map((post: IFaqPost) => (
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
                ))}
                <p
                  ref={loadMoreRef}
                  style={{
                    display: hasEndingPosts ? 'none' : 'block',
                  }}
                >
                  Carregando mais posts...
                </p>
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
    revalidate: 86400,
  };
};
