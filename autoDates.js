/**
 * Adds automatic create and update dates to Prisma Client.
 * @param {PrismaClient} PrismaClient - Prisma Client instance.
 * @returns {PrismaClient}
 */
function useAutoDates(PrismaClient) {
    PrismaClient.$use(async (params, next) => {
        if(params.action == "create") {
            params.args.data.createdAt = new Date;
            params.args.data.updatedAt = new Date;
        }

        if(params.action == "update" || params.action == "updateMany") {
            params.args.data.updatedAt = new Date;
        }

        return next(params);
    });

    return PrismaClient;
}

module.exports = {
    useAutoDates
};