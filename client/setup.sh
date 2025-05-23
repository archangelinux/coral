#!/bin/bash
echo "Setting up Coral Platform development environment..."

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

echo "✅ Setup complete!"
echo "🔧 Please update .env.local with your actual API keys"
echo "🚀 Run 'npm run dev' to start the development server"
