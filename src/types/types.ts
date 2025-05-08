export type Transaction = {
  TransactionId: string;
  FromAddress: string;
  ToAddress: string;
  TokenName: string;
  Amount: string;
  Status: string;
};
export type TransactionUpdateType = {
  oldStatus: string;
  newStatus: string;
};
