const url = 'https://api.medicaltalk.tube';
const webUrl = 'https://medicaltalk.tube/';
const tubeUrl = 'https://video.medicaltalk.tube/'

// const url = 'http://localhost:8080';
// const webUrl = 'http://localhost:4200/';

export const environment = {
  production: true,
  hmr: false,
  serverUrl: `${url}/api/v1/`,
  socketUrl: `${url}/`,
  webUrl: webUrl,
  tubeUrl: tubeUrl,
  domain: '.medicaltalk.tube'
};
