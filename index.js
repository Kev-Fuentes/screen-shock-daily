const webshot = require("node-webshot");
const {
  buildBody,
  optionsEmployeer,
  optionsHealth,
} = require("./webshotConfig");

const screenShock = ({ body, path, options = {}, messageErr = {} }) => {
  webshot(
    body,
    path,
    options,

    function (err) {
      if (err) {
        new Error(messageErr);
      }
    }
  );
};

(async () => {
  const employers = [667, 559, 719, 689];

  for (const employerId of employers) {
    const bodyEmployer = await buildBody({
      service: "employer",
      id: employerId,
    });
    screenShock({
      body: bodyEmployer,
      path: `./images/employers/${employerId}.jpg`,
      options: optionsEmployeer,
      messageErr: "Error con la peticion al posthire-api",
    });
  }

  const bodyHealth = await buildBody({ service: "healt" });
  screenShock({
    body: bodyHealth,
    path: `./images/healt/posthire-api-health.jpg`,
    options: optionsHealth,
    messageErr: "Error con la peticion al health",
  });
})();
