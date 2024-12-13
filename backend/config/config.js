const config = {
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb+srv://alaaata25:alaaata87@cluster0.6hmfl.mongodb.net/client?retryWrites=true&w=majority'
  },
  server: {
    port: process.env.PORT || 3000
  }
};

module.exports = config;
