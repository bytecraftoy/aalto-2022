# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

Docusaurus is essentially a set of npm packages.

#### Requirements

Node.js version 16.14 or above (which can be checked by running `node -v`). You can use nvm for managing multiple Node versions on a single machine installed.
When installing Node.js, you are recommended to check all checkboxes related to dependencies.

### Running the development server

To preview your changes as you edit the files, you can run a local development server that will serve your website and reflect the latest changes.

`cd my-website`
`npm run start`

By default, a browser window will open at http://localhost:3000.

Congratulations! You have just created your first Docusaurus site! Browse around the site to see what's available.

### Deployment

To build the static files of your website for production, run:

`npm run build`

Once it finishes, the static files will be generated within the build directory.

You can deploy your site to static site hosting services such as [Vercel]https://vercel.com/, [GitHub]https://pages.github.com/, [Netlify]https://www.netlify.com/, [Render]https://render.com/docs/static-sites, [Surge]https://surge.sh/help/getting-started-with-surge etc.

A Docusaurus site is statically rendered, and it can generally work without JavaScript!
