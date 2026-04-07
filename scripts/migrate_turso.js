require('dotenv').config({
  path: require('path').resolve(__dirname, '../.env'),
})
const { createClient } = require('@libsql/client')
const fs = require('fs')

const client = createClient({
  url: process.env.DATABASE_URL.split('?')[0],
  authToken: new URL(process.env.DATABASE_URL).searchParams.get('authToken'),
})

const sql = fs.readFileSync(
  'prisma/migrations/20260402204931_init/migration.sql',
  'utf8',
)
const statements = sql
  .split(';')
  .map((s) => s.trim())
  .filter((s) => s.length > 0)

async function run() {
  for (const stmt of statements) {
    try {
      await client.execute(stmt)
      console.log('OK:', stmt.slice(0, 70).replace(/\n/g, ' '))
    } catch (e) {
      if (e.message && e.message.includes('already exists')) {
        console.log('SKIP (exists):', stmt.slice(0, 70).replace(/\n/g, ' '))
      } else {
        console.error(
          'ERR:',
          e.message,
          '|',
          stmt.slice(0, 70).replace(/\n/g, ' '),
        )
      }
    }
  }
  console.log('Done.')
  process.exit(0)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
