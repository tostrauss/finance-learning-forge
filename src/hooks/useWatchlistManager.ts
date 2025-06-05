import { useState, useEffect, useCallback } from 'react';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
// MODIFIED: Import necessary Firestore functions for subcollections
import {
  doc,
  setDoc,
  // getDoc, // No longer needed for primary loading if using onSnapshot for collection
  serverTimestamp,
  collection,
  onSnapshot, // For real-time updates from the subcollection
  Timestamp, // To handle Firestore Timestamps correctly
  FieldValue, // ADD THIS IMPORT
  deleteDoc, // MODIFIED: Uncomment this
  updateDoc, // MODIFIED: Uncomment this
  arrayUnion, // MODIFIED: Add this for adding items to an array
  arrayRemove // MODIFIED: Add this for removing items from an array
} from 'firebase/firestore';
import { WatchlistItem, AssetType } from '../types/watchlist';

export interface WatchlistBoard {
  id: string;
  title: string;
  items: WatchlistItem[];
  createdAt?: Timestamp | Date | FieldValue; // MODIFIED: Allow FieldValue
  updatedAt?: Timestamp | Date | FieldValue; // MODIFIED: Allow FieldValue
  userId?: string; // Keep userId if it was part of newBoardData
}

export function useWatchlistManager() {
  const { user, loading: authLoading } = useAuth();
  const [boards, setBoards] = useState<WatchlistBoard[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Effect to load watchlists from Firestore subcollection when user changes or auth state settles
  useEffect(() => {
    if (authLoading) {
      setIsLoading(true);
      return;
    }

    if (!user) {
      setBoards([]);
      setIsLoading(false);
      setIsInitialized(true);
      setError(null);
      return () => {}; // Return an empty cleanup function
    }

    setIsLoading(true);
    setIsInitialized(false);
    setError(null);

    // MODIFIED: Listen to the user's watchlists subcollection
    const watchlistsCollectionRef = collection(db, `users/${user.uid}/watchlists`);
    
    const unsubscribe = onSnapshot(
      watchlistsCollectionRef,
      (querySnapshot) => {
        const fetchedBoards: WatchlistBoard[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedBoards.push({
            id: doc.id,
            title: data.title,
            items: data.items || [],
            // Convert Firestore Timestamps to JS Dates if necessary for your components
            // Or handle Timestamps directly in your components/logic
            createdAt: data.createdAt, // Keep as is, or convert: data.createdAt?.toDate(),
            updatedAt: data.updatedAt, // Keep as is, or convert: data.updatedAt?.toDate(),
            userId: data.userId,
          } as WatchlistBoard); // Type assertion might be needed depending on strictness
        });
        setBoards(fetchedBoards);
        setIsLoading(false);
        setIsInitialized(true);
        setError(null);
      },
      (err) => {
        console.error("Error loading watchlists from Firestore subcollection:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
        setBoards([]);
        setIsLoading(false);
        setIsInitialized(true); // Still initialized, but with an error
      }
    );

    return () => unsubscribe(); // Cleanup subscription on unmount or when user changes
  }, [user, authLoading]);

  // REMOVED: Effect to save watchlists to Firestore when boards array changes
  // This is no longer needed as we manage individual documents in the subcollection.
  /*
  useEffect(() => {
    if (user && isInitialized && !isLoading && !authLoading) {
      const userWatchlistRef = doc(db, 'userWatchlists', user.uid);
      setDoc(userWatchlistRef, { boards }, { merge: true })
        .catch((err) => {
          console.error("Error saving watchlists to Firestore:", err);
          setError(err instanceof Error ? err : new Error(String(err)));
        });
    }
  }, [boards, user, isInitialized, isLoading, authLoading]);
  */

  const canPerformMutation = useCallback(() => {
    if (!user || !isInitialized || isLoading || authLoading) {
      console.warn("useWatchlistManager: Cannot perform operation - not ready or not authenticated.", {
        hasUser: !!user,
        isAuthLoading: authLoading,
        isWatchlistLoading: isLoading,
        isWatchlistInitialized: isInitialized,
      });
      return false;
    }
    return true;
  }, [user, isInitialized, isLoading, authLoading]);

  const addBoard = useCallback(async (title: string): Promise<string | null> => {
    if (!canPerformMutation() || !user) return null; // Added !user check for type safety

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      console.warn("Attempted to add a board with an empty title.");
      return null;
    }

    const newBoardRef = doc(collection(db, `users/${user.uid}/watchlists`));
    const newBoardData: Omit<WatchlistBoard, 'id'> & { createdAt: any, userId: string } = { // More precise type for data sent to Firestore
      title: trimmedTitle,
      items: [],
      createdAt: serverTimestamp(),
      userId: user.uid,
    };

    try {
      await setDoc(newBoardRef, newBoardData);
      // No need for optimistic update of setBoards here if onSnapshot is working,
      // as onSnapshot will provide the new state from Firestore.
      // If you want to keep optimistic update for immediate UI feedback before onSnapshot fires:
      // const localNewBoard: WatchlistBoard = {
      //   id: newBoardRef.id,
      //   ...newBoardData,
      //   createdAt: new Date(), // Represent serverTimestamp as Date locally
      // };
      // setBoards(prev => [...prev, localNewBoard]);
      return newBoardRef.id;
    } catch (err) {
      console.error("Error adding new board to Firestore:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
      return null;
    }
  }, [canPerformMutation, user]); // Added user to dependencies

  // --- Other functions (removeBoard, updateBoardTitle, etc.) ---
  // These will also need to be updated to use Firestore operations
  // on the `users/{userId}/watchlists/{boardId}` documents.
  // For example, removeBoard would use deleteDoc, updateBoardTitle would use updateDoc.

  const removeBoard = useCallback(async (boardId: string) => { // Make async
    if (!canPerformMutation() || !user) return;
    try {
      const boardRef = doc(db, `users/${user.uid}/watchlists`, boardId);
      await deleteDoc(boardRef); // MODIFIED: Uncomment Firestore operation
      // onSnapshot will handle the local state update.
      // Optimistic update (optional, if onSnapshot latency is noticeable):
      // setBoards(prev => prev.filter(b => b.id !== boardId)); // You might remove this if onSnapshot is quick enough
      console.log(`Board ${boardId} deleted from Firestore.`);
    } catch (err) {
      console.error("Error removing board from Firestore:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  }, [canPerformMutation, user]);

  const updateBoardTitle = useCallback(async (boardId: string, newTitle: string) => { // Make async
    if (!canPerformMutation() || !user) return;
    const trimmedTitle = newTitle.trim();
    if (!trimmedTitle) {
      console.warn("Attempted to update board with an empty title.");
      return;
    }
    try {
      const boardRef = doc(db, `users/${user.uid}/watchlists`, boardId);
      await updateDoc(boardRef, { title: trimmedTitle, updatedAt: serverTimestamp() }); // MODIFIED: Uncomment Firestore operation
      // onSnapshot will handle the local state update.
      // Optimistic update (optional):
      // setBoards(prev =>
      //   prev.map(b => (b.id === boardId ? { ...b, title: trimmedTitle, updatedAt: new Date() } : b))
      // ); // You might remove this if onSnapshot is quick enough
    } catch (err) {
      console.error("Error updating board title in Firestore:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  }, [canPerformMutation, user]);

  const addItemToBoard = useCallback(async (boardId: string, symbol: string, assetType: AssetType) => {
    if (!canPerformMutation() || !user) return;

    const newItem: WatchlistItem = {
      symbol: symbol.trim().toUpperCase(), // Ensure symbol is trimmed and uppercase
      assetType,
      name: symbol.trim().toUpperCase(),     // fill in `name`
      addedAt: serverTimestamp(),            // fill in `addedAt`
    };

    // Check if item already exists (optional, arrayUnion handles duplicates by not adding them)
    const board = boards.find(b => b.id === boardId);
    if (board && board.items.some(item => item.symbol === newItem.symbol && item.assetType === newItem.assetType)) {
        console.log("Item already exists in the watchlist.");
        // Optionally, provide feedback to the user
        return;
    }


    // Optimistic update can be kept if desired for immediate UI feedback
    // setBoards(prevBoards => ... ); // Your existing optimistic update

    try {
      const boardRef = doc(db, `users/${user.uid}/watchlists`, boardId);
      await updateDoc(boardRef, {
        items: arrayUnion(newItem), // Use arrayUnion to add the item
        updatedAt: serverTimestamp()
      });
      // onSnapshot should update the local state.
      // If you keep the optimistic update, ensure it's consistent or remove it.
    } catch (err) {
      console.error("Error adding item to board in Firestore:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
      // Potentially revert optimistic update here if you implemented one
    }
  }, [canPerformMutation, user, boards]); // Added boards to deps if using it for pre-check

  const removeItemFromBoard = useCallback(async (
    boardId: string,
    symbol: string,
    assetType: AssetType
  ) => {
    if (!canPerformMutation() || !user) return;

    // find the full item (with name & addedAt) in your local cache
    const board = boards.find(b => b.id === boardId);
    if (!board) return;
    const itemToRemove = board.items.find(
      i => i.symbol === symbol && i.assetType === assetType
    );
    if (!itemToRemove) return;

    try {
      const boardRef = doc(db, `users/${user.uid}/watchlists`, boardId);
      await updateDoc(boardRef, {
        items: arrayRemove(itemToRemove),
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      console.error('Error removing item from board:', err);
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  }, [boards, canPerformMutation, user]);

  return {
    boards,
    isLoading,
    error,
    isInitialized,
    addBoard,
    removeBoard,
    updateBoardTitle,
    addItemToBoard,
    removeItemFromBoard,
  };
}