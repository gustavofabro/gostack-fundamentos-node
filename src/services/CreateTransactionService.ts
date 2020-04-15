import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const totalIncome = this.transactionsRepository.getTotalIncome();
    const totalOutcome = this.transactionsRepository.getTotalOutcome();
    const depositedAmmount = totalIncome - totalOutcome;

    if (type === 'outcome' && value > depositedAmmount) {
      throw Error('No cash on hand');
    }

    return this.transactionsRepository.create({ title, value, type });
  }
}

export default CreateTransactionService;
