import { Watchlist, WatchlistItem } from '@/types/watchlist';
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  query,
  where,
  updateDoc,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { User } from 'firebase/auth';

const COLLECTION = 'watchlists';

// Fetch all watchlists for a user
export async function fetchWatchlists(user: User): Promise<Watchlist[]> {
  const q = query(collection(db, COLLECTION), where('userId', '==', user.uid));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Watchlist));
}

// Fetch a single watchlist by ID
export async function fetchWatchlist(id: string, user: User): Promise<Watchlist> {
  const docRef = doc(db, COLLECTION, id);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists() || docSnap.data()?.userId !== user.uid) {
    throw new Error('Watchlist not found or access denied');
  }
  
  return { id: docSnap.id, ...docSnap.data() } as Watchlist;
}

// Create a new watchlist
export async function createWatchlist(name: string, user: User): Promise<Watchlist> {
  const newWatchlist: Omit<Watchlist, 'id'> = {
    name,
    items: [],
    userId: user.uid,
    createdAt: serverTimestamp() as any,
    updatedAt: serverTimestamp() as any,
  };

  const docRef = doc(collection(db, COLLECTION));
  await setDoc(docRef, newWatchlist);
  
  return { 
    ...newWatchlist, 
    id: docRef.id,
    createdAt: new Date().toISOString(), // Convert for immediate use
    updatedAt: new Date().toISOString()
  };
}

// Update an existing watchlist's items
export async function updateWatchlist(id: string, items: WatchlistItem[], user: User): Promise<Watchlist> {
  const docRef = doc(db, COLLECTION, id);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists() || docSnap.data()?.userId !== user.uid) {
    throw new Error('Watchlist not found or access denied');
  }

  const updates = {
    items,
    updatedAt: serverTimestamp()
  };
  
  await updateDoc(docRef, updates);
  
  return {
    id,
    ...docSnap.data(),
    ...updates,
    updatedAt: new Date().toISOString() // Convert for immediate use
  } as Watchlist;
}

// Delete a watchlist
export async function deleteWatchlist(id: string, user: User): Promise<void> {
  const docRef = doc(db, COLLECTION, id);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists() || docSnap.data()?.userId !== user.uid) {
    throw new Error('Watchlist not found or access denied');
  }
  
  await deleteDoc(docRef);
}

// Add an item to a watchlist
export async function addItemToWatchlist(id: string, item: WatchlistItem, user: User): Promise<Watchlist> {
  const docRef = doc(db, COLLECTION, id);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists() || docSnap.data()?.userId !== user.uid) {
    throw new Error('Watchlist not found or access denied');
  }
  
  const updates = {
    items: arrayUnion(item),
    updatedAt: serverTimestamp()
  };
  
  await updateDoc(docRef, updates);
  
  return {
    id,
    ...docSnap.data(),
    items: [...(docSnap.data()?.items || []), item],
    updatedAt: new Date().toISOString() // Convert for immediate use
  } as Watchlist;
}

// Remove an item from a watchlist by symbol
export async function removeItemFromWatchlist(id: string, symbol: string, user: User): Promise<Watchlist> {
  const docRef = doc(db, COLLECTION, id);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists() || docSnap.data()?.userId !== user.uid) {
    throw new Error('Watchlist not found or access denied');
  }
  
  const item = docSnap.data()?.items?.find((i: WatchlistItem) => i.symbol === symbol);
  if (!item) {
    throw new Error('Item not found in watchlist');
  }
  
  const updates = {
    items: arrayRemove(item),
    updatedAt: serverTimestamp()
  };
  
  await updateDoc(docRef, updates);
  
  return {
    id,
    ...docSnap.data(),
    items: docSnap.data()?.items?.filter((i: WatchlistItem) => i.symbol !== symbol) || [],
    updatedAt: new Date().toISOString() // Convert for immediate use
  } as Watchlist;
}