const autoprefixer = require('autoprefixer')({ browsers: ['last 2 versions', '> 1% in IN', 'IE >= 8'] });

module.exports = {
    plugins: [
        autoprefixer
    ]
};
