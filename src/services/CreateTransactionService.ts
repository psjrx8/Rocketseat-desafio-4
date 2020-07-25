import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface createTransactionDTO {
  title:string,
  value:number,
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type } : createTransactionDTO ): Transaction {

    const balance = this.transactionsRepository.getBalance();

    if(type === 'outcome' && value > balance.total) {
      throw Error ('There is not enough balance for this operation.')
    };

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type
    });

    this.transactionsRepository.updateBalance({value, type});

    return transaction;
  }
}

export default CreateTransactionService;
