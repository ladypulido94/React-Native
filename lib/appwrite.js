import {Account, Avatars, Client, Databases, ID} from 'react-native-appwrite';
import signIn from "../app/(auth)/sign-in";

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.lpm.aora',
    projectId:'674ff42d00290e956eb3',
    databaseId:'674ff67300016128c1d0',
    userCollectionId:'674ff69d0009e9cdc47b',
    videoCollectionId:'674ff6c5001a1f7caaaa',
    storageId:'674ff8800000837a0f0f'
}

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
       if(!newAccount) throw Error;

       const avatarUrl = avatars.getInitials(username)

       await SignIn(email, password);

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

       return newUser;
   } catch (error){
       console.log(error);
       throw new Error(error);
   }
}

export async function SignIn(email, password) {
    try {
        const session = await account.createEmailPasswordSession(email, password);

        return session;
    } catch (error) {
        throw new Error(error);
    }
}
