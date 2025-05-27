## HR Dashboard

This is a mini HR performance dashboard project built with Next.js, React, and Tailwind CSS. It allows HR managers to track employee performance, manage bookmarks, and view basic analytics.

## Getting Started
![alt text](<images/Screenshot 2025-05-27 142948.png>) ![alt text](<images/Screenshot 2025-05-27 143010.png>) ![alt text](<images/Screenshot 2025-05-27 143018.png>) ![alt text](<images/Screenshot 2025-05-27 143032.png>) ![alt text](<images/Screenshot 2025-05-27 143047.png>) ![alt text](<images/Screenshot 2025-05-27 143059.png>)

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Using the Application

Upon opening the application, you will be directed to a login page.

Use the following demo credentials to log in:

*   **Admin:** admin@hr.com / `admin123`
*   **HR Manager:** hr@hr.com / `hr123`

After logging in, you can navigate through the different sections of the dashboard using the navigation bar.

## Implemented Features

*   **Dashboard Homepage (`/`)**: Displays a list of employees with key information, performance ratings, and actions.
*   **Search & Filter**: Filter employees by name, email, department, and performance rating.
*   **Dynamic User Details Page (`/employee/[id]`)**: View detailed employee profiles, performance history, and assigned projects. Includes a tabbed interface.
*   **Bookmark Manager (`/bookmarks`)**: See a list of bookmarked employees and remove them.
*   **Analytics Page (`/analytics`)**: Provides basic charts for department performance and bookmark trends.
*   **Create User**: Add new employees to the system via a modal form.
*   **Pagination**: Navigate through the employee list on the dashboard.
*   **Mock Authentication**: A simple login system with protected routes for demonstration purposes.

## Tech Stack

*   React (with Next.js App Router)
*   Tailwind CSS
*   JavaScript (ES6+)
*   State Management: Context API
*   Chart.js (for Analytics)


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
