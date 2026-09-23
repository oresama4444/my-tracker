export interface Income {
  id: string;
  date: number;
  amount: number;
  description: string;
  category?: string;
}

interface DailyIncomeMeta {
  count: number;
  total: number;
}

export interface DailyIncome {
  id: string;
  date: number;
  meta: DailyIncomeMeta;
  transactions: Income[];
}

export interface GetIncomesResponse {
  incomes: {
    raw: Income[];
    groupedByDay: DailyIncome[];
  };
}

export interface CreateIncomeResponse {
  created: boolean;
}

export interface DeleteIncomeResponse {
  deleted: boolean;
}

export interface NewIncomeFormData {
  date: number;
  amount: number;
  description: string;
  category?: string;
}
