import { Client, Account, ID } from "appwrite";
import confi from '../confi/confi.js'

class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(confi.appwriteUrl)
        .setProject(confi.appwriteProjectId)

        this.account = new Account();
    }

    async createUserAccount({email,password,name}){
        try {
            const userAccount = await this.account.create(ID.unique(),email,password,name);

            if(userAccount){
                return this.login({email,password});
            }
            else{
                return userAccount;
            }
            
        } catch (error) {
            throw new Error(`Failed to create account :${error.message}`)
        }
    }


    async login({email,password}){
        try {
            return await this.account.createEmailSession(email,password)
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            throw new Error(`Appwrite service getcurrentuser: error: ${error.message}`);
        }
        return null;
    }

    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            throw new Error(`Failed to logout:: ${error.message}`)
        }
    }
}

const authService = new AuthService();
export default authService