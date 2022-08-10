const fetch = require("node-fetch");

async function getEmployer(id) {
  const response = await fetch(
    `https://posthire.evercheck.com/upload/status?employerId=${id}&limit=1`
  );
  const { 0: employer } = await response.json();

  if (employer.status === "queued") {
    console.error({
      employerId: employer.employer_id,
      status: employer.status,
      type: "EL ARCHIVO CONTINUA EN QUEUED",
    });
    return;
  }
  return employer;
}

const getHealth = async () => {
  const response = await fetch(`https://posthire.evercheck.com/health`);
  const health = await response.json();
  if (health.status === "fail") {
    console.error({
      service: health.service,
      status: health.status,
      type: "HEALTH FALLIDO",
    });
    return;
  }
  return health;
};
module.exports = { getEmployer, getHealth };
