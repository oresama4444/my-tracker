export interface MoneyLog {
  id: string;
  date: number;
  cash: number;
  account: number;
  payments: number;
}

export interface FormData {
  date: number;
  cash: number;
  account: number;
  payments: number;
}

export interface GetLogsResponse {
  moneyLogs: MoneyLog[];
}
