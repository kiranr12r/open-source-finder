const config = {
    apiUrl: process.env.NODE_ENV === 'production'
        ? 'https://your-render-api-domain.onrender.com/api'
        : 'http://localhost:3000/api'
};

export default config;