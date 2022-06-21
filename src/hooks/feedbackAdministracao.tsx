import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  useCallback,
} from 'react';

import {
  Control,
  FieldValues,
  useForm,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormReset,
  UseFormSetValue,
} from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { IFeedback } from '../interfaces/IFeedback';
import { geral_api } from '../services/geral_api';
import { GlobalLayoutProps } from '../interfaces/globalLayoutProps';

interface FeedbackAdministracaoContextProps {
  id?: number;
  setId: Dispatch<SetStateAction<number | undefined>>;
  control: Control<FieldValues, object>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  reset: UseFormReset<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  errors: any;
  pagina: number;
  feedbacks: IFeedback[];
  pages: number;
  setPages: Dispatch<SetStateAction<number>>;
  setFeedbacks: Dispatch<SetStateAction<IFeedback[]>>;
  selectedFeedbacks: { [key: number]: IFeedback };
  setSelectedFeedbacks: Dispatch<SetStateAction<{ [key: number]: IFeedback }>>;
  handleProximaPagina: () => void;
  handlePaginaAnterior: () => void;
  loadAllFeedbackWithoutPagination: () => Promise<void>;
  loadFilterFeedback: (
    feedbacks: IFeedback[],
    page?: number | undefined,
  ) => Promise<void>;
  allFeedbackWithoutPagination: IFeedback[];
  filterByFeedbackType: string;
  setFilterByFeedbackType: Dispatch<SetStateAction<string>>;
  filterByFeedbackStatus: string;
  setFilterByFeedbackStatus: Dispatch<SetStateAction<string>>;
  alreadyDoPagination: boolean;
  setAlreadyDoPagination: Dispatch<SetStateAction<boolean>>;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  feedbackDateFilter: {
    start_at: string;
    end_at: string;
  };
  setFeedbackDateFilter: Dispatch<
    SetStateAction<{
      start_at: string;
      end_at: string;
    }>
  >;
  loadFeedbacks: (page: number) => Promise<void>;
  handleSelectAllFeedbacks: (isTrue: boolean) => Promise<void>;
}

const FeedbackAdministracaoContext =
  createContext<FeedbackAdministracaoContextProps>(
    {} as FeedbackAdministracaoContextProps,
  );

export const FeedbackAdministracaoProvider: React.FC<GlobalLayoutProps> = ({ children }) => {
  const [id, setId] = useState<number | undefined>(undefined);
  const [feedbacks, setFeedbacks] = useState<IFeedback[]>([] as IFeedback[]);
  const [pages, setPages] = useState<number>(1);
  const [selectedFeedbacks, setSelectedFeedbacks] = useState<{
    [key: number]: IFeedback;
  }>({});
  // this object takes a long time to load, it is used for searches and filters
  const [allFeedbackWithoutPagination, setAllFeedbackWithoutPagination] =
    useState<IFeedback[]>([] as IFeedback[]);

  const [filterByFeedbackType, setFilterByFeedbackType] = useState<string>('*');
  const [filterByFeedbackStatus, setFilterByFeedbackStatus] =
    useState<string>('*');
  const [alreadyDoPagination, setAlreadyDoPagination] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [feedbackDateFilter, setFeedbackDateFilter] = useState<{
    start_at: string;
    end_at: string;
  }>({
    start_at: '',
    end_at: '',
  });

  const [pagina, setPagina] = useState<number>(1);

  const handleProximaPagina = () => {
    setPagina(pagina + 1);
  };

  const handlePaginaAnterior = () => {
    setPagina(pagina - 1);
  };

  const formatsDateAndReturnsNewDate = async (str: string) => {
    const arr = str.split('/');
    return new Date(`${arr[1]}-${arr[0]}-${arr[2]}`);
  };

  const filterFeedbackByDate = useCallback(
    async (feedbacksToFilter: IFeedback[]) => {
      const start_at = await formatsDateAndReturnsNewDate(
        feedbackDateFilter.start_at,
      );
      const end_at = await formatsDateAndReturnsNewDate(
        feedbackDateFilter.end_at,
      );
      if (
        start_at.toString() !== 'Invalid Date' &&
        end_at.toString() !== 'Invalid Date'
      ) {
        return feedbacksToFilter.filter(feedback => {
          const start_atInFilterFunction = new Date(feedback.data_criacao);

          start_atInFilterFunction.setHours(0, 0, 0, 0);

          if (
            start_atInFilterFunction.getTime() >= start_at.getTime() &&
            start_atInFilterFunction.getTime() <= end_at.getTime()
          ) {
            return true;
          }

          return false;
        });
      }

      return feedbacksToFilter;
    },
    [feedbackDateFilter],
  );

  const fetchFeedbacksAndPagination = useCallback(
    async (page: number, size?: number) => {
      const response = await geral_api.get(
        `/feedbacks?size=${size || 10}&page=${page}`,
      );
      const feedbacksGot = response.data.data;
      const pagesAmount = response.data.pagination.pages;
      return { feedbacksGot, pagesAmount };
    },
    [],
  );

  const loadAllFeedbackWithoutPagination = useCallback(async () => {
    const { feedbacksGot } = await fetchFeedbacksAndPagination(
      1,
      1 * 10 * 100 * 1000 * 100000 * 1000000, // a giant random number
    );
    setAllFeedbackWithoutPagination(feedbacksGot);
    return;
  }, [fetchFeedbacksAndPagination]);

  const filterFeedbackByFeedbackType = useCallback(
    async (feedbacksToFilter: IFeedback[]) => {
      if (filterByFeedbackType === '*') {
        return feedbacksToFilter;
      }

      return feedbacksToFilter.filter(feedback => {
        return feedback.ds_tipo === filterByFeedbackType;
      });
    },
    [filterByFeedbackType],
  );

  const filterFeedbackByFeedbackStatus = useCallback(
    async (feedbacksToFilter: IFeedback[]) => {
      if (filterByFeedbackStatus === '*') {
        return feedbacksToFilter;
      }

      return feedbacksToFilter.filter(feedback => {
        return feedback.status === filterByFeedbackStatus;
      });
    },
    [filterByFeedbackStatus],
  );

  const applyPaginationOnArray = async (
    arr: any[],
    page: number,
    size: number,
  ) => {
    const totalPages = Math.ceil(arr.length / size);
    let newArr = [...arr].splice(size * (page - 1), size);
    setAlreadyDoPagination(true);
    return { data: newArr, totalPages: totalPages, nextPage: page + 1 };
  };

  const filterFeedbackBySearchTerm = useCallback(
    async (feedbacksToFilter: IFeedback[]) => {
      if (searchTerm.length === 0) {
        return feedbacksToFilter;
      }

      const soughtAfter = feedbacksToFilter.filter(
        feedback =>
          feedback.nome_pessoa
            .toLocaleLowerCase()
            .includes(searchTerm.toLocaleLowerCase()) ||
          feedback.conteudo
            .toLocaleLowerCase()
            .includes(searchTerm.toLocaleLowerCase()),
      );

      return soughtAfter;
    },
    [searchTerm],
  );

  const loadFilterFeedback = useCallback(
    async (feedbacks: IFeedback[], page?: number) => {
      const filteredFeedbackByFeedbackType = await filterFeedbackByFeedbackType(
        feedbacks,
      );
      const feedbacksFilteredByTermSearch = await filterFeedbackBySearchTerm(
        filteredFeedbackByFeedbackType,
      );
      const feedbacksFeaturedByDate = await filterFeedbackByDate(
        feedbacksFilteredByTermSearch,
      );
      const feedbacksFeaturedByStatus = await filterFeedbackByFeedbackStatus(
        feedbacksFeaturedByDate,
      );
      const paginatedFeedbacks = await applyPaginationOnArray(
        feedbacksFeaturedByStatus,
        page ? page : 1,
        10,
      );
      setPages(paginatedFeedbacks.totalPages);
      setFeedbacks(paginatedFeedbacks.data);
      setSelectedFeedbacks({});
    },
    [
      filterFeedbackByFeedbackType,
      filterFeedbackBySearchTerm,
      filterFeedbackByDate,
      filterFeedbackByFeedbackStatus,
      setFeedbacks,
      setPages,
      setSelectedFeedbacks,
    ],
  );

  const loadFeedbacks = useCallback(
    async (page: number) => {
      if (alreadyDoPagination) {
        loadFilterFeedback(allFeedbackWithoutPagination, page);
        return;
      }
      const { feedbacksGot, pagesAmount } = await fetchFeedbacksAndPagination(
        page,
      );
      setPages(pagesAmount);
      setFeedbacks(feedbacksGot);
      return;
    },
    [
      fetchFeedbacksAndPagination,
      alreadyDoPagination,
      loadFilterFeedback,
      allFeedbackWithoutPagination,
      setFeedbacks,
      setPages,
    ],
  );

  const handleSelectAllFeedbacks = useCallback(
    async (isTrue: boolean) => {
      if (isTrue) {
        for (let feedback of feedbacks) {
          setSelectedFeedbacks((item: any) => ({
            ...item,
            [feedback.id]: feedback,
          }));
        }
      } else {
        setSelectedFeedbacks({});
      }
    },

    // eslint-disable-next-line
    [feedbacks],
  );

  const schema = Yup.object().shape({});

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <FeedbackAdministracaoContext.Provider
      value={{
        id,
        setId,
        control,
        handleSubmit,
        reset,
        errors,
        setValue,
        getValues,
        pagina,
        feedbacks,
        setFeedbacks,
        pages,
        setPages,
        selectedFeedbacks,
        setSelectedFeedbacks,
        handleProximaPagina,
        handlePaginaAnterior,
        loadAllFeedbackWithoutPagination,
        loadFilterFeedback,
        loadFeedbacks,
        allFeedbackWithoutPagination,
        filterByFeedbackType,
        setFilterByFeedbackType,
        filterByFeedbackStatus,
        setFilterByFeedbackStatus,
        alreadyDoPagination,
        setAlreadyDoPagination,
        searchTerm,
        setSearchTerm,
        feedbackDateFilter,
        setFeedbackDateFilter,
        handleSelectAllFeedbacks,
      }}
    >
      {children}
    </FeedbackAdministracaoContext.Provider>
  );
};

export function useFeedbackAdministracao(): FeedbackAdministracaoContextProps {
  const context = useContext(FeedbackAdministracaoContext);

  if (!context) {
    throw new Error(
      'useFeedbackAdministracao must be used within an FeedbackAdministracaoProvider',
    );
  }

  return context;
}
