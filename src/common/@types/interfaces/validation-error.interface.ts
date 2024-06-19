export interface validationErrors {
  message: string[];
  error: string;
  statusCodex: number;
}

export interface filterResponseOnError {
  success: boolean;
  message: string;
  customCode?: number;
  validationErr?: string[];
  stack?: any;
}
