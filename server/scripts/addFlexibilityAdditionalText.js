const { sequelize } = require('../models');

async function migrate() {
    try {
        const queryInterface = sequelize.getQueryInterface();
        const tableInfo = await queryInterface.describeTable('production_facility_page_content');

        if (!tableInfo.flexibility_additional_text) {
            console.log('Adding flexibility_additional_text column...');
            await queryInterface.addColumn('production_facility_page_content', 'flexibility_additional_text', {
                type: sequelize.Sequelize.TEXT,
                allowNull: true,
            });
            console.log('Migration completed successfully.');
        } else {
            console.log('Column flexibility_additional_text already exists.');
        }
        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

migrate();

