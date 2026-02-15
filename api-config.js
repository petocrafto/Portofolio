/**
 * API Configuration untuk VPS
 * 
 * INSTRUKSI:
 * 1. Ganti 'your-vps-domain.com' dengan domain atau IP VPS Anda
 * 2. Pastikan VPS Anda sudah memiliki API endpoints yang sesuai
 * 3. Uncomment baris API call di script.js untuk menggunakan API dari VPS
 * 
 * Contoh struktur API yang diperlukan:
 * 
 * POST /api/contact
 * Body: { name, email, subject, message }
 * Response: { success: true, message: "..." }
 * 
 * GET /api/blog
 * Response: [{ id, title, excerpt, date, icon, content }]
 * 
 * GET /api/stats
 * Response: { projects, clients, hours, coffee }
 */

const API_CONFIG = {
    // Ganti dengan URL VPS Anda
    baseURL: 'https://your-vps-domain.com/api',
    
    // Atau jika menggunakan IP:
    // baseURL: 'http://123.456.789.0/api',
    
    endpoints: {
        contact: '/contact',
        blog: '/blog',
        stats: '/stats'
    },
    
    // Timeout untuk request (dalam milliseconds)
    timeout: 10000,
    
    // Headers yang akan dikirim dengan setiap request
    headers: {
        'Content-Type': 'application/json',
        // Tambahkan header lain jika diperlukan (API key, dll)
        // 'Authorization': 'Bearer YOUR_API_KEY'
    }
};

// Export untuk digunakan di script.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = API_CONFIG;
}

