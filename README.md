# RenoRight

RenoRight is an Expo / React Native starter app for iPhone and Android. It lets a user select a room photo, choose a design style, and submit it to a future AI redesign API.

## Included
- Expo Router app structure
- Room photo selection using Expo Image Picker
- Style selection: Modern, Scandinavian, Luxury, Farmhouse, Minimalist and Industrial
- Placeholder request to `POST /redesign`
- Product messaging for one free design and planned Premium at £2.99/month

## Run locally
1. Install Node.js (LTS) and a package manager.
2. Run `npm install`.
3. Copy `.env.example` to `.env` and set `EXPO_PUBLIC_API_URL` to your backend URL.
4. Run `npx expo start`.
5. Open the project using Expo Go or a development build.

## Important: not production-ready yet
The AI image-generation backend is not included or connected. The app expects a backend endpoint `POST /redesign` that accepts multipart fields `image` and `style` and returns JSON `{ "imageUrl": "https://..." }`.

Authentication, server-side enforcement of the one-free-design allowance, Apple/Google subscription billing, privacy policy, terms, account deletion, moderation, and production testing still need to be implemented. Never put AI provider API keys in the mobile app; keep them on the server.
