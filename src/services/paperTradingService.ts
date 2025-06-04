import { db } from '@/lib/firebase';
import { collection, doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { Portfolio, Position, Transaction } from '@/types/trading';

const PORTFOLIOS_COLLECTION = 'paperTradingPortfolios';
const TRANSACTIONS_COLLECTION = 'paperTradingTransactions';

export const createPortfolio = async (userId: string, initialCash: number): Promise<void> => {
  const portfolio: Portfolio = {
    userId,
    cash: initialCash,
    totalValue: initialCash,
    positions: [],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  await setDoc(doc(db, PORTFOLIOS_COLLECTION, userId), portfolio);
};

export const getPortfolio = async (userId: string): Promise<Portfolio | null> => {
  const portfolioDoc = await getDoc(doc(db, PORTFOLIOS_COLLECTION, userId));
  return portfolioDoc.exists() ? (portfolioDoc.data() as Portfolio) : null;
};

export const updatePortfolio = async (
  userId: string,
  updates: Partial<Portfolio>
): Promise<void> => {
  const portfolioRef = doc(db, PORTFOLIOS_COLLECTION, userId);
  await updateDoc(portfolioRef, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
};

export const recordTransaction = async (
  userId: string,
  transaction: Omit<Transaction, 'id' | 'timestamp'>
): Promise<void> => {
  const transactionsRef = collection(db, PORTFOLIOS_COLLECTION, userId, TRANSACTIONS_COLLECTION);
  await setDoc(doc(transactionsRef), {
    ...transaction,
    timestamp: serverTimestamp(),
  });
};

export const getTransactions = async (
  userId: string,
  options?: { limit?: number; startAfter?: Date }
): Promise<Transaction[]> => {
  const transactionsRef = collection(db, PORTFOLIOS_COLLECTION, userId, TRANSACTIONS_COLLECTION);
  const transactionsDocs = await getDoc(doc(transactionsRef));
  return transactionsDocs.exists() ? Object.values(transactionsDocs.data()) as Transaction[] : [];
};
