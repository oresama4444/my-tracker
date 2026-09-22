export interface Income {
  id: string;
  date: number;
  amount: number;
  description: string;
  category?: string;
}

export interface GetIncomesResponse {
  incomes: Income[];
}

export interface CreateIncomeResponse {
  created: boolean;
}

export interface NewIncomeFormData {
  date: number;
  amount: number;
  description: string;
  category?: string;
}
