# Rick and Morty React Application

This project is a React application using TypeScript and Vite, designed to explore characters from the Rick and Morty universe. It leverages GraphQL for data fetching and Zustand for state management.

## Project Structure

- **src/**: Contains the main source code for the application.
  - **components/**: Reusable React components, such as `CharacterItem` and `Layout`.
  - **pages/**: Page components for routing, including `CharacterPage` and `NotFound`.
  - **api/**: GraphQL API queries and types.
  - **functions/**: Utility functions for character management.
  - **storage/**: Zustand store for managing favorite characters.
  - **common/**: Common utilities, such as local storage management.
  - **router/**: Application routing configuration.
- **public/**: Static assets like images and icons.

- **styles/**: Global styles and Tailwind CSS configuration.

- **config/**: Configuration files for ESLint, Tailwind, and Vite.

## Running the Project

To run the project locally, follow these steps:

1. **Install Dependencies**: Ensure you have Node.js installed, then run:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

2. **Start the Development Server**: Launch the Vite development server with:

   ```bash
   npm run dev
   ```

   or

   ```bash
   yarn dev
   ```

3. **Build for Production**: To create a production build, use:

   ```bash
   npm run build
   ```

   or

   ```bash
   yarn build
   ```

4. **Preview the Production Build**: You can preview the production build locally with:

   ```bash
   npm run preview
   ```

   or

   ```bash
   yarn preview
   ```

5. **Lint the Code**: To check for linting errors, run:

   ```bash
   npm run lint
   ```

   or

   ```bash
   yarn lint
   ```

## Additional Information

- **GraphQL**: The application uses Apollo Client to fetch data from a GraphQL API. Ensure the `VITE_GRAPHQL_URI` environment variable is set to the correct endpoint.

- **State Management**: Zustand is used for managing the state of favorite characters.

- **Styling**: Tailwind CSS is used for styling the application.

- **Routing**: React Router is used for navigating between different pages.

For more detailed information on the configuration and setup, refer to the respective configuration files in the project.

## Using the Rick and Morty API with GraphQL

This application uses the Rick and Morty GraphQL API to fetch character data. The API is integrated using Apollo Client, which allows for efficient data fetching and caching.

### Setup

1. **Environment Variable**: Ensure that the `VITE_GRAPHQL_URI` environment variable is set to the Rick and Morty GraphQL API endpoint. This is typically done in a `.env` file at the root of your project.

   ```plaintext
   VITE_GRAPHQL_URI=https://rickandmortyapi.com/graphql
   ```

2. **Apollo Client Configuration**: The Apollo Client is configured in the `src/main.tsx` file. It uses the `VITE_GRAPHQL_URI` to connect to the API.

   ```typescript:src/main.tsx
   startLine: 10
   endLine: 13
   ```

### Querying Data

The application uses GraphQL queries to fetch data. For example, the `getCharacters` query is used to retrieve character information based on a search term.

- **Query Definition**: The GraphQL query is defined using the `gql` template literal.

  ```typescript:src/api/graphql/getCharacters/getCharacters.ts
  startLine: 4
  endLine: 23
  ```

- **Using the Query**: The `useQuery` hook from Apollo Client is used to execute the query and manage the loading, error, and data states.

  ```typescript:src/api/graphql/getCharacters/getCharacters.ts
  startLine: 25
  endLine: 30
  ```

### Example Usage

To fetch characters, you can use the `getCharacters` function, which takes a search parameter and returns the loading state, any errors, and the data.

I use to implement this way because it's the most efficient way to fetch data from the API and it's easy to use. Also, i ussually implement a stub strategy to fetch data from the API in case the API is not available and i can use the stub data to render the UI.
