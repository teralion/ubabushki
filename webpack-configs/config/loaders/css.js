import path from 'path';
/* eslint-disable-next-line import/no-extraneous-dependencies */
import MiniCssPlugin from 'mini-css-extract-plugin';
import autoprefixer from 'autoprefixer';

function common(props) {
  const { DIR } = props;

  return [
    {
      loader: 'css-loader',
      options: {
        modules: true,
        sourceMap: true,
        localIdentName: '[name]-[local]-[hash:base64:5]',
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: false,
        plugins() { return [autoprefixer]; },
      },
    },
    {
      loader: 'stylus-loader',
      options: {
        import: [path.join(DIR, 'app', 'styles', 'import.styl')],
        sourceMap: false,
        preferPathResolver: 'webpack',
      },
    },
  ];
}

export function server(props) {
  return {
    test: /\.styl$/,
    use: [
      MiniCssPlugin.loader,
      ...common(props),
    ],
  };
}

export function browser(props) {
  const { production = true } = props;

  if (production) {
    return {
      test: /\.styl$/,
      use: [
        MiniCssPlugin.loader,
        ...common(props),
      ],
    };
  }

  return {
    test: /\.styl$/,
    use: [
      {
        loader: 'style-loader',
        options: {
          sourceMap: true,
        },
      },
      ...common(props),
    ],
  };
}
