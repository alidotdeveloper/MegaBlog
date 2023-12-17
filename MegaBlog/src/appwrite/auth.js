import conf from "../config/conf";

import { Client, Account, ID } from "appwrite";

export class Authservice {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwrite_url)
      .setEndpoint(conf.appwrite_project_id);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique,
        email,
        password,
        name
      );
      if (userAccount) {
        return this.loginAccount(email, password);
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async loginAccount({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      console.log("getting error while login user", error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("getting error on gettimg user", error);
    }
    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("error while logout user", error);
    }
  }
}

const Authservice = new Authservice();

export default Authservice;
