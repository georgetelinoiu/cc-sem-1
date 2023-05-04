// js/utils/functions.js
import {connectToDhatabase,} from '@/lib/mongodb.js';

export const getCollection = async collectionName => {
	const {database,} = await connectToDatabase();
	return database.collection(collectionName);
};