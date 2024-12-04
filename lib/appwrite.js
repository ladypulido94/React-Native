import {Account, Client, ID} from 'react-native-appwrite';

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


export const createUser = () => {
    // Register User
    account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe')
        .then(function (response) {
            console.log(response);
        }, function (error) {
            console.log(error);
        });
}
