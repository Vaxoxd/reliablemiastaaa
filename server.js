
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware dla parsowania JSON (jeśli będzie potrzebne w przyszłości)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serwuj pliki statyczne z głównego katalogu
app.use(express.static(path.join(__dirname)));

// Serwuj specific folders
app.use('/miasta', express.static(path.join(__dirname, 'miasta')));
app.use('/attached_assets', express.static(path.join(__dirname, 'attached_assets')));

// Główna strona gry
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint dla przyszłych funkcji (opcjonalnie)
app.get('/api/status', (req, res) => {
    res.json({ 
        status: 'running', 
        game: 'Reliable Cities',
        timestamp: new Date().toISOString()
    });
});

// Obsługa wszystkich innych ścieżek - przekieruj na główną stronę (SPA routing)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Coś poszło nie tak!');
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🎮 Reliable Cities Game uruchomiona na porcie ${PORT}`);
    console.log(`🌐 Server dostępny na http://localhost:${PORT}`);
    console.log(`📁 Serwowanie plików z katalogu: ${__dirname}`);
});
