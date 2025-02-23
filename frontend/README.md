# Krishi Connect

## 🌱 About Krishi Connect

Krishi Connect is a full-stack web platform designed to empower India's agricultural community by providing a space for farmers, traders, and agritech professionals to connect, share knowledge, and trade agricultural products.

## 🚀 Features

-   🧑‍🌾 **Farmer Profiles**: Farmers can create profiles to showcase their produce and expertise.
-   📢 **Discussion Forums**: Engage in conversations about best practices, market trends, and policies.
-   🛒 **Marketplace**: Buy and sell agricultural products directly within the platform.
-   🌾 **Weather & Market Updates**: Stay informed with real-time weather reports and commodity prices.
-   🤝 **Community Support**: Connect with experts, agronomists, and fellow farmers.

## 🏗 Tech Stack

-   **Frontend**: Next.js, Tailwind CSS
-   **Backend**: Express.js, Node.js
-   **Database**: MongoDB
-   **Real-time Communication**: Socket.io
-   **Hosting & Deployment**: Vercel (Frontend), Render/Heroku (Backend)

## 📌 Installation & Setup

1.  **Clone the repository**
    
    ```bash
    git clone https://github.com/kaushal-Prakash/krishi-connect.git
    cd krishi-connect
    
    ```
    
2.  **Install dependencies**
    
    ```bash
    npm install
    
    ```
    
3.  **Set up environment variables** Create a `.env` file in the root directory and add the following:
    
    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    NEXT_PUBLIC_API_URL=http://localhost:5000
    
    ```
    
4.  **Run the backend server**
    
    ```bash
    cd backend
    npm run dev
    
    ```
    
5.  **Run the frontend server**
    
    ```bash
    cd frontend
    npm run dev
    
    ```
    
6.  Open `http://localhost:3000` in your browser.

## 🛠 Contribution Guidelines

1.  Fork the repository.
2.  Create a new branch: `git checkout -b feature-branch`.
3.  Commit your changes: `git commit -m "Added new feature"`.
4.  Push the branch: `git push origin feature-branch`.
5.  Create a pull request.

## 📄 License

Krishi Connect is open-source and licensed under the MIT License.

## 📧 Contact

For queries or suggestions, feel free to reach out at [[LinkedIn](https://www.linkedin.com/in/devkaushalprakash/)].
