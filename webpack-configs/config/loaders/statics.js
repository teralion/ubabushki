
export default function getStatics() {
  return {
    test: /\.(png|jpe?g|woff|pdf|ttf|otf)$/,
    use: {
      loader: 'file-loader',
      options: {
        name: '[name]@[hash:base64:5].[ext]',
      },
    },
  };
}
