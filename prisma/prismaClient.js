const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");

// create pool
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// instantiate the adapter
const adapter = new PrismaPg(pool);

// pass adapter to newly created client
const prisma = new PrismaClient({ adapter });

// export the client
module.exports = prisma;
