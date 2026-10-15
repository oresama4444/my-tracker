export type TransactionType = "expense" | "income" | "saving";

export interface Category {
  id: string;
  transaction_type: TransactionType;
  name: string;
  description: string;
  color: string;
  target?: number;
}

export interface FormStyles {
  form: string;
  field: string;
  label: string;
  input: string;
  button: string;
}
