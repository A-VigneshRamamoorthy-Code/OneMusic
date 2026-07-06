import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { InteractionRequiredAuthError, PublicClientApplication } from '@azure/msal-browser';
import { DEFAULT_CLIENT_ID, DEFAULT_TENANT_ID, SCOPES } from '../config/constants';
import { getErrorMessage } from '../utils/errors';
import type { AuthState, MsalAccount, MsalConfig } from '../types';

export interface UseAuthParams {
  setStatus: (status: string) => void;
  setIsLoading: (loading: boolean) => void;
}

export interface UseAuthResult {
  account: MsalAccount | null;
  authState: AuthState;
  ensureAccessToken: (accountToUse?: MsalAccount | null) => Promise<string>;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

function readConfig(): MsalConfig {
  const params = new URLSearchParams(window.location.search);
  return {
    clientId: params.get('clientId') || DEFAULT_CLIENT_ID,
    tenant: params.get('tenant') || DEFAULT_TENANT_ID,
    redirectUri: params.get('redirectUri') || `${window.location.origin}${window.location.pathname}`,
  };
}

/** Microsoft sign-in (redirect flow) and silent Graph token acquisition via MSAL. */
export function useAuth({ setStatus, setIsLoading }: UseAuthParams): UseAuthResult {
  const [account, setAccount] = useState<MsalAccount | null>(null);
  const [authState, setAuthState] = useState<AuthState>('idle');
  const msalRef = useRef<PublicClientApplication | null>(null);
  const config = useMemo(readConfig, []);

  useEffect(() => {
    const initialize = async () => {
      if (!config.clientId) {
        setAuthState('config');
        setStatus('Add your Microsoft Entra app registration client ID using ?clientId=... to connect OneDrive.');
        setIsLoading(false);
        return;
      }

      const instance = new PublicClientApplication({
        auth: {
          clientId: config.clientId,
          authority: `https://login.microsoftonline.com/${config.tenant}`,
          redirectUri: config.redirectUri,
        },
        cache: {
          cacheLocation: 'sessionStorage',
        },
      });

      msalRef.current = instance;
      try {
        await instance.initialize();
        let redirectResult = null;
        try {
          redirectResult = await instance.handleRedirectPromise();
        } catch {
          // A stale or interrupted interaction (e.g. left over from a previous
          // popup-based build) can leave the temporary cache in a bad state such
          // as no_token_request_cache_error. Clear it and continue so the user can
          // simply sign in again instead of being stuck on an error.
          try {
            await instance.clearCache();
          } catch {
            /* best effort */
          }
          redirectResult = null;
        }
        const activeAccount = redirectResult?.account || instance.getAllAccounts()[0] || null;
        if (activeAccount) {
          instance.setActiveAccount(activeAccount);
          setAccount(activeAccount);
          setStatus(`Signed in as ${activeAccount.username}. Enter a folder under "My files" and hit Sync.`);
          setAuthState('ready');
          setIsLoading(false);
        } else {
          setAuthState('ready');
          setStatus('Sign in with Microsoft to browse your OneDrive music library.');
          setIsLoading(false);
        }
      } catch (error) {
        setAuthState('error');
        setStatus(`MSAL initialization failed: ${getErrorMessage(error)}`);
        setIsLoading(false);
      }
    };

    initialize();
  }, [config.clientId, config.redirectUri, config.tenant, setStatus, setIsLoading]);

  const ensureAccessToken = useCallback(
    async (accountToUse: MsalAccount | null = account): Promise<string> => {
      if (!msalRef.current) {
        throw new Error('Authentication is not ready yet.');
      }
      if (!accountToUse) {
        throw new Error('Please sign in first.');
      }
      try {
        const response = await msalRef.current.acquireTokenSilent({ account: accountToUse, scopes: SCOPES });
        return response.accessToken;
      } catch (error) {
        const errorCode = (error as { errorCode?: string }).errorCode;
        if (error instanceof InteractionRequiredAuthError || errorCode === 'consent_required' || errorCode === 'interaction_required') {
          await msalRef.current.acquireTokenRedirect({ account: accountToUse, scopes: SCOPES });
          return '';
        }
        throw error;
      }
    },
    [account],
  );

  const signIn = useCallback(async () => {
    if (!msalRef.current) {
      setStatus('Authentication is still loading.');
      return;
    }
    setIsLoading(true);
    try {
      setStatus('Redirecting to Microsoft sign-in…');
      await msalRef.current.loginRedirect({ scopes: SCOPES, prompt: 'select_account' });
    } catch (error) {
      setStatus(`Sign-in failed: ${getErrorMessage(error)}`);
      setAuthState('error');
      setIsLoading(false);
    }
  }, [setStatus, setIsLoading]);

  const signOut = useCallback(async () => {
    setAccount(null);
    setStatus('Signed out. Connect again when you are ready.');
    setAuthState('idle');
    if (!msalRef.current) {
      return;
    }
    try {
      msalRef.current.setActiveAccount(null);
      await msalRef.current.clearCache();
    } catch {
      /* best effort — clearing local cache should not block sign-out */
    }
  }, [setStatus]);

  return { account, authState, ensureAccessToken, signIn, signOut };
}
