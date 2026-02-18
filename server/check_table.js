const { sequelize } = require('./models');

async function check() {
    try {
        const queryInterface = sequelize.getQueryInterface();
        const info = await queryInterface.describeTable('production_facility_features');
        console.log(JSON.stringify(info, null, 2));
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}
check();
