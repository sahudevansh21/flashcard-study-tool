# Flashcard Study Tool

This is a Next.js 14 App Router project designed as an interactive flashcard study tool. It allows users to create, organize, and study custom flashcard decks, tracking their learning progress all client-side in the browser.

## Problem Solved

Students and lifelong learners often struggle with effectively memorizing new information and tracking progress across subjects. Traditional flashcards are hard to manage, and it's difficult to prioritize review topics. This tool addresses these issues by providing a digital, interactive, and personalized study experience.

## Features

-   **Create & Organize Decks:** Easily create new flashcard decks for any subject.
-   **Custom Flashcards:** Add custom front and back content to each flashcard.
-   **Study Sessions:** Engage in interactive study sessions with chosen decks.
-   **Progress Tracking:** Mark cards as 'learned' or 'needs review' to track mastery.
-   **Client-Side Data:** All data (decks, cards, progress) is stored securely in your browser's local storage.
-   **Stunning UI:** A dark-themed, glassmorphic design with vibrant gradients and smooth animations.

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

Make sure you have Node.js (v18.x or later) and npm (or yarn/pnpm) installed on your machine.

### Installation

1.  **Clone the repository (or create the files from the JSON output):**

    ```bash
    git clone <repository-url>
    cd flashcard-study-tool
    ```

    *If you've received this as a JSON, ensure all files are created in the correct directories.* Then navigate into the root directory of the project.

2.  **Install dependencies:**

    ```bash
    npm install
    # or yarn install
    # or pnpm install
    ```

### Running the Development Server

To start the development server:

```bash
npm run dev
# or yarn dev
# or pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

To build the application for production:

```bash
npm run build
# or yarn build
# or pnpm build
```

This command creates an optimized production build in the `.next` directory.

### Running the Production Server

To start the production server after building:

```bash
npm run start
# or yarn start
# or pnpm start
```

Open [http://localhost:3000](http://localhost:3000) to view the production application.

## Project Structure

-   `app/`: The root directory for the App Router, containing pages and global layout/styles.
    -   `layout.js`: Root layout component.
    -   `page.js`: Home page.
    -   `globals.css`: Global styles for the application.
    -   `my-decks/page.js`: Page for managing flashcard decks.
    -   `study-session/page.js`: Page for conducting study sessions.
    -   `progress-tracker/page.js`: Page for viewing study progress.
-   `components/`: Reusable React components.
    -   `Navbar.js`: Navigation bar.
    -   `Flashcard.js`: Individual flashcard component.
    -   `DeckList.js`: Component to display and interact with a list of decks.
    -   `CreateFlashcardForm.js`: Form for creating new flashcards.
-   `lib/`: Utility functions.
    -   `client-storage.js`: Functions for interacting with `localStorage`.

## Technologies Used

-   Next.js 14 (App Router)
-   React 18
-   HTML5, CSS3
-   Client-side `localStorage` for data persistence
