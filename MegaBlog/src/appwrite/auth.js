import conf from "../config/conf";
import { Client, Account, ID } from "appwrite";

export class Authservice {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject("657c886c4b12d971d777");
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
      const Account = await this.account.get();
      return Account;
    } catch (error) {
      console.log("getting error on getting user", error);
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

Authservice = new Authservice();
export const { createAccount, loginAccount, getCurrentUser, logout } =
  Authservice;
