# OneMusic

OneMusic is a polished React + Vite web app that signs in to Microsoft and streams audio files directly from OneDrive using Microsoft Graph.

## Run locally

- `npm install`
- `npm run dev`

## Connect OneDrive

Open the app with a Microsoft Entra app registration client ID:

- `http://localhost:3000/?clientId=YOUR_APP_ID&tenant=common`
- Or the deployed GitHub Pages URL with the same query parameters.

The app requests the delegated scopes `User.Read`, `Files.Read.All`, and `offline_access` and uses silent token refresh when possible.
