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

The app requests the delegated scopes `User.Read`, `Files.Read.All`, and `offline_access` and uses silent token refresh when possible.
