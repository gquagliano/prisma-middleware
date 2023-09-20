/**
 * Adds soft delete to Prisma Client.
 * @param {PrismaClient} PrismaClient - Prisma Client instance.
 * @returns {PrismaClient}
 */
function useSoftDelete(PrismaClient) {
    PrismaClient.$use(async (params, next) => {
        if(params.action == "delete") {
            params.action = "update";
            params.args.data = { deletedAt: new Date };
        }

        if(params.action == "deleteMany") {
            params.action = "updateMany";
            if(params.args.data) {
                params.args.data.deletedAt = new Date;
            } else {
                params.args.data = { deletedAt: new Date };
            }
        }

        if(params.action === "findUnique" || params.action === "findFirst") {
            params.action = "findFirst";
            params.args.where.deletedAt = null;
        }

        if(params.action === "findMany") {
            if(params.args.where) {
                params.args.where.deletedAt = null;
            } else {
                params.args.where = { deletedAt: null };
            }
        }

        if(params.action == "update") {
            params.action = "updateMany";
            params.args.where.deletedAt = null;
            return next(params);
        }

        if(params.action == "updateMany") {
            if(params.args.where) {
                params.args.where.deletedAt = null;
            } else {
                params.args.where = { deletedAt: null };
            }
        }
        
        return next(params);
    });

    return PrismaClient;
}

module.exports = {
    useSoftDelete
};