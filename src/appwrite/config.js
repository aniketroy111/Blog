import { Client,ID, Databases,Query,Storage } from "appwrite";
import confi from '../confi/confi.js'

export class Service{

    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(confi.appwriteUrl)
        .setProject(confi.appwriteProjectId)

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({slug,title,content,uploadedImage,status,userId}){
        try {
            const uniqueId = ID.unique();
            return await this.databases.createDocument(
                confi.appwriteDatabaseId,
                confi.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    uploadedImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite service :: CreatePost :: error",error);
        }
    }

    async updatePost(slug,{title,content,uploadedImage,status}){
        try {
            return await this.databases.updateDocument(
                confi.appwriteDatabaseId,
                confi.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    uploadedImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite service :: UpdatePost :: error",error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                confi.appwriteDatabaseId,
                confi.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("Appwrite service :: DeletePost :: error",error);
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                confi.appwriteDatabaseId,
                confi.appwriteCollectionId,
                slug
            )
            
        } catch (error) {
            console.log("Appwrite service :: getPost :: error",error);
            return false;
        }
    }

    async getAllPost(){
        try {
            return await this.databases.listDocuments(
                confi.appwriteDatabaseId,
                confi.appwriteCollectionId,
                [
                    Query.equal("statu","active")
                ]
            )
        } catch (error) {
            console.log("Appwrite service :: getAllPost :: error",error);
            return false;
        }
    }


    // file upload service
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                confi.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error",error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                confi.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error",error);
            return false;
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            confi.appwriteBucketId,
            fileId
        )
    }

}
const service = new Service();
export default service;