const baseUrl = process.env.NODE_ENV === "production"
  ? 'https://mask-up.vercel.app'
  : 'http://localhost:3000';

  export default baseUrl;