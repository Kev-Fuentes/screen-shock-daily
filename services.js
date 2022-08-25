const fetch = require('node-fetch');
const { POSTHIRE_API } = process.env;
async function getEmployer(id) {
  const response = await fetch(
    `${POSTHIRE_API}/upload/status?employerId=${id}&limit=1`
  );
  const { 0: employer } = await response.json();

  if (employer.status === 'queued') {
    console.error({
      fileId: employer.id,
      employerId: employer.employer_id,
      status: employer.status,
      type: 'EL ARCHIVO CONTINUA EN QUEUED',
    });
    return;
  }
  return employer;
}

const getHealth = async () => {
  const response = await fetch(`${POSTHIRE_API}/health`);
  const health = await response.json();
  if (health.status === 'fail') {
    console.error({
      service: health.service,
      status: health.status,
      type: 'HEALTH FALLIDO',
    });
    return;
  }
  return health;
};
module.exports = { getEmployer, getHealth };
