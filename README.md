# OneMusic

OneMusic is a polished React + Vite web app that signs in to Microsoft and streams audio files directly from OneDrive using Microsoft Graph.

## Run locally

- `npm install`
- `npm run dev`

## Connect OneDrive

The app is preconfigured with the requested Microsoft Entra app registration client ID and tenant, so opening it locally is enough to start the sign-in flow:

- `http://localhost:3000/OneMusic/`
- Or the deployed GitHub Pages URL.

If you need to use a different app registration, you can still override the defaults with query parameters such as `?clientId=YOUR_APP_ID&tenant=common`.

The app requests the delegated scopes `User.Read`, `Files.Read.All`, and `offline_access` and uses silent token refresh when possible. It signs in with the Microsoft **redirect** flow (not a popup) so it works reliably on GitHub Pages, and uses the `common` authority so personal Microsoft accounts resolve to their own OneDrive.

## Choose a folder and sync

Scanning an entire OneDrive can be slow, so after signing in you pick which folder to scan:

- A fixed `My files /` prefix (the OneDrive root) is shown, and you type the rest of the path, e.g. `Music/Melody`.
- Press **Sync** (or Enter) to scan just that folder and its subfolders for audio files.
- Leave the field blank to scan the whole OneDrive (slower).
- The last folder you used is remembered for next time, and **Refresh library** re-syncs it.
