const { getEmployer, getHealth } = require("./services");

const optionsEmployeer = {
  screenSize: {
    width: 720,
    height: 330,
  },
  shotSize: {
    width: 720,
    height: "all",
  },
  quality: 1080,
  defaultWhiteBackground: true,
  siteType: "html",
};

const optionsHealth = {
  screenSize: {
    width: 1080,
    height: 530,
  },
  shotSize: {
    width: 720,
    height: 1100,
  },
  quality: 1080,
  defaultWhiteBackground: true,
  siteType: "html",
};

async function buildBody({ service, id }) {
  const getSevices = {
    employer: getEmployer,
    healt: getHealth,
  };
  const handler = getSevices[service];
  const result = await handler(id);

  return `<pre><h1>${JSON.stringify(result, undefined, 5)}</h1></pre>`;
}

module.exports = {
  optionsEmployeer,
  buildBody,
  optionsHealth,
};
