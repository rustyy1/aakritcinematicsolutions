# Supabase Setup Guide for Portfolio Page

Follow these steps to connect your website to your Supabase database.

## Step 1: Get Your Credentials
1.  Log in to your [Supabase Dashboard](https://supabase.com/dashboard).
2.  Select your project.
3.  Go to **Project Settings** (gear icon at the bottom left).
4.  Click on **API**.
5.  Look for the **Project URL** and the **anon** / **public** key. Keep this tab open.

## Step 2: Connect Your Code
1.  In your project folder `c:\Users\hp\OneDrive\Desktop\ANIMATION\aakritcinematicsolutions`, look for a file named `.env`.
    -   *If it doesn't exist, create a new file named `.env`.*
2.  Open the `.env` file and paste your credentials like this:
    ```env
    VITE_SUPABASE_URL=https://your-project-url.supabase.co
    VITE_SUPABASE_ANON_KEY=your-long-anon-key-string
    ```
    *(Replace the values with the ones from Step 1).*

## Step 3: Create the 'portfolio' Table
1.  In Supabase, go to the **Table Editor** (icon looks like a table/grid on the left).
2.  Click **New Table**.
3.  **Name**: `portfolio`
4.  **Enable Row Level Security (RLS)**: Checked (recommended).
5.  **Columns**:
    -   `id`: Leave as is (`int8`, Primary Key).
    -   `created_at`: Leave as is (`timestamptz`).
    -   Click **Add Column**:
        -   **Name**: `title`
        -   **Type**: `text`
    -   Click **Add Column**:
        -   **Name**: `category`
        -   **Type**: `text`
        -   *(This is used for sorting, e.g., "Commercial", "Brand Film")*
    -   Click **Add Column**:
        -   **Name**: `youtube_url`
        -   **Type**: `text`
    -   Click **Add Column**:
        -   **Name**: `thumbnail_url`
        -   **Type**: `text`
        -   *(Optional: You can leave this empty if you want the app to try and fetch the YouTube thumbnail automatically).*
6.  Click **Save**.

## Step 4: Allow Public Access (RLS Policy)
*If you enabled RLS in Step 3, your data is hidden by default. You need to let everyone see it.*
1.  Go to **Authentication** > **Policies** (or click "No active policies" on your table).
2.  Find the `portfolio` table.
3.  Click **New Policy**.
4.  Choose **"Get started quickly"** -> **"Enable read access to everyone"**.
5.  Click **Use this template**.
6.  Click **Review** -> **Save policy**.

## Step 5: Add Your First Portfolio Item
1.  Go back to the **Table Editor** and open the `portfolio` table.
2.  Click **Insert** -> **Insert Row**.
3.  Fill in the fields:
    -   **title**: "My Amazing Video"
    -   **category**: "Commercial"
    -   **youtube_url**: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
4.  Click **Save**.

**That's it!** Restart your development server (if it's running) and your portfolio item should appear on the website.
