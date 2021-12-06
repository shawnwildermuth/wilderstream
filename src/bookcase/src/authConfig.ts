import { LogLevel, PublicClientApplication, Configuration } from '@azure/msal-browser';
import { reactive } from "vue";

const theState = reactive({
  isAuthenticated: false,
  userName: "",
  token: ""
});

// Config object to be passed to Msal on creation
export const msalConfig: Configuration = {
  auth: {
    clientId: 'cb32fdd7-9672-44d4-8027-1b2e71600456',
    redirectUri: 'http://localhost:3000', 
    postLogoutRedirectUri: 'http://localhost:3000',
    authority: "https://login.microsoftonline.com/consumers/" // Important for Just MS Accounts
  },
  cache: {
    cacheLocation: 'localStorage'
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: LogLevel, message: string, containsPii: boolean) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
      logLevel: LogLevel.Verbose
    }
  }
};

export const authInstance = new PublicClientApplication(msalConfig);

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
  scopes: ['User.Read'],
};


import { AuthenticationResult, EventType } from '@azure/msal-browser';

// Account selection logic is app dependent. Adjust as needed for different use cases.
const accounts = authInstance.getAllAccounts();
if (accounts.length > 0) {
  authInstance.setActiveAccount(accounts[0]);
}

authInstance.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
    const payload = event.payload as AuthenticationResult;
    const account = payload.account;
    authInstance.setActiveAccount(account);
    theState.isAuthenticated = true;
    theState.userName = account?.name ?? "";
    theState.token = payload?.accessToken ?? "";
    console.log("Login Succeeded");
  } else if(event.eventType === EventType.LOGOUT_SUCCESS) {
    theState.isAuthenticated = false;
    theState.userName = "";
    theState.token = "";
    console.log("Logout Succeeded");
  }
});

export const authState = theState;
