/* eslint-disable-next-line */
import MiniCssPlugin from 'mini-css-extract-plugin';

export default function extractStyl(props) {
  const { development = true } = props;

  // server/utils/allowedBuildFiles.js
  const filename = development
    ? '[name].css'
    : '[name]@[hash:12].css';

  return new MiniCssPlugin({ filename });
}
