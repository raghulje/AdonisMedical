const { sequelize } = require('../models');

async function migrate() {
    try {
        const queryInterface = sequelize.getQueryInterface();
        const tableInfo = await queryInterface.describeTable('home_about_section');

        if (!tableInfo.background_image_id) {
            console.log('Adding background_image_id column...');
            await queryInterface.addColumn('home_about_section', 'background_image_id', {
                type: sequelize.Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'media',
                    key: 'id'
                },
                onDelete: 'SET NULL'
            });
            console.log('Migration completed successfully.');
        } else {
            console.log('Column background_image_id already exists.');
        }
        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

migrate();

