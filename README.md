WebApp deployed on: https://cow-catalog-system.web.app/

How to Install & Run Locally

1. Clone the repo
   git clone https://github.com/tarungrg0001/cow-catalog-system.git
   cd cow-catalog-system

2. Install dependencies
   npm install

3. Run the app
   npm start

The app will start on: http://localhost:4200/

My Approach & Design Choices

1. Component + Store based architecture
   I used a small custom store with BehaviorSubject (avoiding NgRx due to project size).
   UI consumes cows$ (observable) while services use value for fast checks like duplicate IDs.

2. Clean separation between UI & Data
   All data goes through CowService → then into CowStore.
   This helps avoid circular dependencies and makes debugging easier.

3. PrimeNG
   I used the PrimeUIX as per mentioned but was not familiar much.

4. Trade-offs I made
   Didn’t use NgRx because the app is not big enough.
   I kept the API responses very simple ({ cows: Cow[] }) to reduce boilerplate.

Known Limitations / Future Improvements
Formly alignment: still needs some spacing and layout polish.
No real backend.
Missing Unit tests.
More Validation
The timeline feature is not implemented because I was not fully sure how to design and display it.
