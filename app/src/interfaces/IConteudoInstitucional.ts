export interface IConteudoInstitucional {
  title: string;
  user_type: string;
  conversion_rate?: number | null;
  duration: number;
  id?: number;
  created_at?: string;
  character: string;
  description: string;
  isRequired: boolean;
  start_at: string | Date;
  status?: string;
}
