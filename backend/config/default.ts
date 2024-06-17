const EnvDb = process.env.DB_PORT

export default {
    port: 3000,
    dbPort: EnvDb,
    env: "development"
}