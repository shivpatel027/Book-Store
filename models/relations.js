cat > models/index.js << 'EOF'
const { booksTable } = require('./book.model');
const { authorsTable } = require('./author.model');

module.exports = {
  booksTable,
  authorsTable,
};
EOF
