module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: "http://kastor.tsnigri.ru:8000",
  },
};
