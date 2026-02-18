const { PrismaClient } = require("./generated");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");

const globalForPrisma = globalThis; // global cache
let prisma; // the prisma client we will export

if (!globalForPrisma.prisma) {
  // create pool once if not created yet
  console.log("🟢 Creating new Prisma client");
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  // instantiate the adapter and pass to newly made client
  const adapter = new PrismaPg(pool);
  prisma = new PrismaClient({ adapter });

  // cache Prisma globally
  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
  }
} else {
  // reuse existing prisma client if it already exists
  console.log("♻️ Reusing Prisma client");
  prisma = globalForPrisma.prisma;
}

module.exports = prisma;
