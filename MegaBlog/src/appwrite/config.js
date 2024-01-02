import conf from "../config/conf";

import { Client, Account, Storage, ID, Databases, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  storage;
  constructor() {
    this.client
      .setEndpoint(conf.appwrite_url)
      .setEndpoint(conf.appwrite_project_id);

    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }
  async createPost({ title, slug, content, featuredimage, userId, statusbar }) {
    try {
      return await this.databases.createDocument(
        conf.appwrite_db_id,
        conf.appwrite_collection_id,
        slug,
        {
          title,
          content,
          featuredimage,
          statusbar,
          userId,
        }
      );
    } catch (error) {
      console.log("error while crating");
    }
  }

  async updatePost(slug, { title, content, featuredimage, statusbar }) {
    try {
      return await this.databases.updateDocument(
        conf.appwrite_db_id,
        conf.appwrite_collection_id,
        slug,
        {
          title,
          content,
          featuredimage,
          statusbar,
        }
      );
    } catch (error) {
      console.log("error while updating...");
    }
  }
  async deletePost({ slug }) {
    try {
      await this.databases.deleteDocument(
        conf.appwrite_db_id,
        conf.appwrite_collection_id,
        slug
      );
      return true;
    } catch (error) {
      console.log("error while deleting post", error);
      return false;
    }
  }
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwrite_db_id,
        conf.appwrite_collection_id,
        slug
      );
    } catch (error) {
      console.log("error while getting post", error);
      return false;
    }
  }
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwrite_db_id,
        conf.appwrite_collection_id,
        queries
      );
    } catch (error) {
      console.log("error while getting posts", error);
      return false;
    }
  }

  // file upload
  async uploadImage(file) {
    try {
      return await this.storage.createFile(
        conf.appwrite_bucket_id,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("error in file uploading..." + error);
      return false;
    }
  }

  async deleteImage(fileId) {
    try {
      await this.storage.deleteFile(conf.appwrite_bucket_id, fileId);
      return true;
    } catch (error) {
      console.log("error in filr delete", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.storage.getFilePreview(conf.appwrite_bucket_id, fileId);
  }
}

const ServiceInsta = new Service();

export default ServiceInsta;
