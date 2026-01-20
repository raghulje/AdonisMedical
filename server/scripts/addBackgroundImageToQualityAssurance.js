const { sequelize } = require('../models');

async function migrate() {
    try {
        const queryInterface = sequelize.getQueryInterface();
        const tableInfo = await queryInterface.describeTable('quality_assurance_page_content');

        if (!tableInfo.background_image_id) {
            console.log('Adding background_image_id column...');
            await queryInterface.addColumn('quality_assurance_page_content', 'background_image_id', {
                type: sequelize.Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'media',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
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

