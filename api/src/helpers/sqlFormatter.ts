// from: https://github.com/magnuslundstrom/test-db-orm-setup/blob/master/api/src/utils/helperFunctions/sqlFormatter.ts
/** Allows to use multiline sql strings using backticks */
export const sqlFormatter = (sql: string) => {
    const regex = /[\s]{2,}|[\n]/g;
    return sql.replace(regex, ' ');
};
