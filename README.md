# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/ad4085eb-482f-4c7b-baf8-b281a822810f

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/ad4085eb-482f-4c7b-baf8-b281a822810f) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Design Guidelines

Our application follows a consistent design system based on the Timesheets page styling:

### Border Radius
- All external elements use a 10px border radius, including:
  - Buttons
  - Input fields
  - Timesheet elements
  - Invoice elements
  - Navigation menu items
  - New elements added to the system

### White Elements on Blue Backgrounds
When placing white background elements over blue backgrounds:
- Use a thin border (1px)
- Border color: #3f37c9
- Maintain existing shadows and styles

### Elements Inside White Sections
Elements contained within white background sections retain their original styling to maintain visual hierarchy and functionality.

### Reference Point
The Timesheets page serves as the primary reference for:
- Layout structure
- Component styling
- Content organization
- Visual hierarchy

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/ad4085eb-482f-4c7b-baf8-b281a822810f) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)
