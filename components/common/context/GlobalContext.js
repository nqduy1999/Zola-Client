import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

import PropTypes from 'prop-types';

const globalIcon = require('assets/images/zola-logo.png');

const GlobalContext = React.createContext();
const GlobalConsumer = GlobalContext.Consumer;

const defaultMeta = {
  title: 'Zola',
  image: globalIcon
};

const renderHelmet = meta => (
  <Helmet
    htmlAttributes={{ lang: 'en' }}
    title={meta.title}
    meta={[
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
      },
      {
        name: 'format-detection',
        content: 'yes'
      }
    ]}
    link={[
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: meta.image
      },
      // GOOGLE FONT
      {
        rel: 'stylesheet',
        type: 'text/css',
        href:
          'https://fonts.googleapis.com/css?family=Hind:400,300,500,600%7cMontserrat:400,700'
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://fonts.googleapis.com/css?family=Hind:300,400,500,600,700'
      }
    ]}
    script={[
      {
        src: 'https://kit.fontawesome.com/4cc95513a0.js'
      },
      {
        src: 'https://code.jquery.com/jquery-3.5.1.slim.min.js'
      },
      {
        src: 'https://unpkg.com/react-tabs/dist/react-tabs.development.js'
      },
      {
        src: 'https://unpkg.com/react-tabs/dist/react-tabs.production.min.js'
      }
    ]}
  />
);

const GlobalProvider = props => {
  const [meta, setMeta] = useState(defaultMeta);
  return (
    <GlobalContext.Provider
      value={{
        meta,
        setMeta
      }}
    >
      {meta && renderHelmet(meta)}
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;

export { GlobalContext, GlobalConsumer, GlobalProvider };

GlobalProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};
GlobalProvider.defaultProps = {
  children: {}
};
