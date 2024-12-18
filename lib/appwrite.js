import {Account, Avatars, Client, Databases, ID, Query} from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.lpm.aora',
    projectId:'674ff42d00290e956eb3',
    databaseId:'674ff67300016128c1d0',
    userCollectionId:'674ff69d0009e9cdc47b',
    videoCollectionId:'674ff6c5001a1f7caaaa',
    storageId:'674ff8800000837a0f0f'
}

const {
    endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    videoCollectionId,
    storageId
} = config;

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
   try {
       const newAccount = await account.create(
           ID.unique(),
           email,
           password,
           username
       )
       console.log('Account created:', newAccount);
       if(!newAccount) throw Error;

       const avatarUrl = avatars.getInitials(username)

       await signIn(email, password);
       console.log('User signed in.');

       const newUser = await databases.createDocument(
           config.databaseId,
           config.userCollectionId,
           ID.unique(),
           {
               accountId: newAccount.$id,
               email,
               username,
               avatar: avatarUrl
           }
       )
       console.log('Document created in database:', newUser);
       return newUser;
   } catch (error){
       console.log(error);
       //throw new Error(error);
   }
}

export const signIn = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        console.log('session created', session);
        return session;
    } catch (error) {
        throw new Error(error);
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();

        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currentAccount) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        console.error(error);
    }
}

export const getAllPosts = async () => {
    try {
        const post =  await databases.listDocuments(
            databaseId,
            videoCollectionId,
        )

        return post.documents;
    } catch (error){
        throw new Error(error);
    }
}

export const getLatestPosts = async () => {
    try {
        const post =  await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.orderDesc('$createdAt', Query.limit(7))]
        )
        return post.documents;
    } catch (error){
        throw new Error(error);
    }
}


