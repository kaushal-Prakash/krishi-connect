import React from 'react';

function About() {
  return (
    <div className="about-container p-8 bg-green-50 rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-6 text-center text-green-800">🌱 About Krishi Connect</h1>
      <p className="text-lg mb-6 text-green-700">
        Krishi Connect is a full-stack web platform designed to empower India's agricultural community by providing a space for farmers, traders, and agritech professionals to connect, share knowledge, and trade agricultural products. Developed by <strong className="text-green-900">devShadow</strong>, this platform aims to bridge the gap between technology and agriculture, fostering growth and collaboration in the farming ecosystem.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-green-800">🚀 Features</h2>
      <ul className="list-disc list-inside mb-6 text-green-700">
        <li className="mb-2">🧑‍🌾 <strong>Farmer Profiles:</strong> Farmers can create profiles to showcase their produce and expertise.</li>
        <li className="mb-2">📢 <strong>Discussion Forums:</strong> Engage in conversations about best practices, market trends, and policies.</li>
        <li className="mb-2">🛒 <strong>Marketplace:</strong> Buy and sell agricultural products directly within the platform.</li>
        <li className="mb-2">🌾 <strong>Weather & Market Updates:</strong> Stay informed with real-time weather reports and commodity prices.</li>
        <li className="mb-2">🤝 <strong>Community Support:</strong> Connect with experts, agronomists, and fellow farmers.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4 text-green-800">🏗 Tech Stack</h2>
      <ul className="list-disc list-inside mb-6 text-green-700">
        <li className="mb-2">🌐 <strong>Frontend:</strong> Next.js, Tailwind CSS</li>
        <li className="mb-2">🔧 <strong>Backend:</strong> Express.js, Node.js</li>
        <li className="mb-2">🗃️ <strong>Database:</strong> MongoDB</li>
        <li className="mb-2">⚡ <strong>Real-Time Communication:</strong> Socket.io</li>
        <li className="mb-2">🚀 <strong>Hosting & Deployment:</strong> Vercel (Frontend), Render/Heroku (Backend)</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4 text-green-800">📌 Installation & Setup</h2>
      <div className="mb-6 text-green-700">
        <p className="mb-2">1. Clone the repository:</p>
        <pre className="bg-green-100 p-4 rounded-md text-sm mb-4">
          <code>git clone https://github.com/kaushal-Prakash/krishi-connect.git</code>
        </pre>
        <p className="mb-2">2. Install dependencies:</p>
        <pre className="bg-green-100 p-4 rounded-md text-sm mb-4">
          <code>npm install</code>
        </pre>
        <p className="mb-2">3. Set up environment variables:</p>
        <p className="mb-2">Create a <code>.env</code> file in the root directory and add the following:</p>
        <pre className="bg-green-100 p-4 rounded-md text-sm mb-4">
          <code>
            MONGO_URI=your_mongodb_connection_string<br />
            JWT_SECRET=your_jwt_secret<br />
            NEXT_PUBLIC_API_URL=http://localhost:5000
          </code>
        </pre>
        <p className="mb-2">4. Run the backend server:</p>
        <pre className="bg-green-100 p-4 rounded-md text-sm mb-4">
          <code>cd backend<br />npm run dev</code>
        </pre>
        <p className="mb-2">5. Run the frontend server:</p>
        <pre className="bg-green-100 p-4 rounded-md text-sm mb-4">
          <code>cd frontend<br />npm run dev</code>
        </pre>
        <p className="mb-2">6. Open <a href="http://localhost:3000" className="text-green-900 underline">http://localhost:3000</a> in your browser.</p>
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-green-800">🛠 Contribution Guidelines</h2>
      <ul className="list-disc list-inside mb-6 text-green-700">
        <li className="mb-2">Fork the repository.</li>
        <li className="mb-2">Create a new branch: <code>git checkout -b feature-branch</code>.</li>
        <li className="mb-2">Commit your changes: <code>git commit -m "Added new feature"</code>.</li>
        <li className="mb-2">Push the branch: <code>git push origin feature-branch</code>.</li>
        <li className="mb-2">Create a pull request.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4 text-green-800">📄 License</h2>
      <p className="text-lg mb-6 text-green-700">
        Krishi Connect is open-source and licensed under the <strong className="text-green-900">MIT License</strong>.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-green-800">📧 Contact</h2>
      <p className="text-lg text-green-700">
        For inquiries or support, please contact <strong className="text-green-900">devShadow</strong>.
      </p>
    </div>
  );
}

export default About;