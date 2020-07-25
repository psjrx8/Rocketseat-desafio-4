import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface createTransactionDTO {
  title:string,
  value:number,
  type: 'income' | 'outcome';
}

interface updateBalanceDTO {
  value: number,
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];
  private balance: Balance = {
    income: 0,
    outcome: 0,
    total: 0
  };

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    const transactions = this.transactions;

    return transactions;
  }

  public getBalance(): Balance {
    const balance = this.balance;

    return balance;
  }

  public updateBalance({value, type}:updateBalanceDTO): void {
    if(type === 'income') {
      this.balance.income += value;
    } else if (type === 'outcome') {
      this.balance.outcome += value;
    }
    this.balance.total = this.balance.income - this.balance.outcome;
  }

  public create({ title, value, type } : createTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
