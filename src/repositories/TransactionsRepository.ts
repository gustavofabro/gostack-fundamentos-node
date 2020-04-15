import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions
  }

  public getBalance(): Balance {
    const income = this.getTotalIncome()
    const outcome = this.getTotalOutcome()

    return {
      income,
      outcome,
      total: income - outcome
    }
  }

  public create({title,value, type}: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({title, value, type});

    this.transactions.push(transaction);

    return transaction;
  }

  public getTotalIncome() {
    return this.transactions.
            filter(transaction => transaction.type=='income')
            .reduce((acc, {value}) => acc + value, 0)
  }

  public getTotalOutcome() {
    return this.transactions
            .filter(transaction => transaction.type=='outcome')
            .reduce((acc, {value}) => acc + value, 0)
  }
}

export default TransactionsRepository;
