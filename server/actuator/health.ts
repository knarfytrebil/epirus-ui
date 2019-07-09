export default (_, reply) => reply.send({ status: 'up', buildId: process.env.CI_COMMIT_SHA });
