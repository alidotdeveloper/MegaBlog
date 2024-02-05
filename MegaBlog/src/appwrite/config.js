import conf from "../config/conf";

import {
  Client,
  Account,
  Storage,
  ID,
  Databases,
  Query,
  Teams,
} from "appwrite";

const teams = new Teams(Client);
export class Service {
  client = new Client();
  databases;
  storage;
  constructor() {
    this.client
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject("657c886c4b12d971d777");
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, slug, content, fileId, userId, statusbar }) {
    try {
      return await this.databases.createDocument(
        "657c891b0065fa7a6a86",
        "657c89409e291365ef8e",
        slug,
        {
          TITLE: title,
          CONTENT: content,
          status: statusbar,
          feature_key: fileId,
          user_id: userId,
        }
      );
    } catch (error) {
      console.log("error while creating", error);
    }
  }

  async updatePost(slug, { TITLE, CONTENT, feature_key, statusbar }) {
    try {
      return await this.databases.updateDocument(
        "657c891b0065fa7a6a86",
        "657c89409e291365ef8e",
        slug,
        {
          TITLE,
          CONTENT,
          feature_key,
          statusbar,
        }
      );
    } catch (err) {
      console.log("error while updating...", err);
      throw error;
    }
  }
  async deletePost({ postid }) {
    console.log("post id is:", postid);
    try {
      await this.databases.deleteDocument(
        "657c891b0065fa7a6a86",
        "657c89409e291365ef8e",
        postid
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
        "657c891b0065fa7a6a86",
        "657c89409e291365ef8e",
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
        "657c891b0065fa7a6a86",
        "657c89409e291365ef8e",
        queries
      );
    } catch (error) {
      console.log("error while getting posts", error);
      return false;
    }
  }

  // file upload
  async uploadImage(fileId) {
    try {
      return await this.storage.createFile(
        "657c8be4a1f331738cf3",
        ID.unique(),
        fileId
      );
    } catch (error) {
      console.log("error in file uploading..." + error);
      return false;
    }
  }

  async deleteImage(fileId) {
    try {
      await this.storage.deleteFile("657c8be4a1f331738cf3", fileId);
      return true;
    } catch (error) {
      console.log("error in file delete", error);
      return false;
    }
  }

  async getFilePreview(fileId) {
    try {
      return this.storage.getFilePreview("657c8be4a1f331738cf3", fileId);
    } catch (error) {
      console.log("eror while prevewing", error);
    }
  }
}

const AppwriteService = new Service();

export default AppwriteService;
