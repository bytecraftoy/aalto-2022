const backendURL: string =
    process.env.NODE_ENV === 'development'
        ? `${
              window.location.origin.endsWith(window.location.port)
                  ? window.location.origin.split(':').slice(0, -1).join(':')
                  : window.location.origin
          }:3030`
        : '';

export { backendURL };
