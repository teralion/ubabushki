
export default function resolver(props) {
  const { DIR } = props;

  return {
    modules: [DIR, 'node_modules'],
    mainFiles: [
      'index.js',
      'index.jsx',
    ],
    extensions: ['.js', '.jsx', '.styl', '.json'],
  };
}
