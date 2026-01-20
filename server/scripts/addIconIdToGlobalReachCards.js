const { sequelize } = require('../models');

async function migrate() {
    try {
        const queryInterface = sequelize.getQueryInterface();
        
        // Check and add icon_id to about_page_global_reach_cards
        const cardsTableInfo = await queryInterface.describeTable('about_page_global_reach_cards');
        if (!cardsTableInfo.icon_id) {
            console.log('Adding icon_id column to about_page_global_reach_cards...');
            await queryInterface.addColumn('about_page_global_reach_cards', 'icon_id', {
                type: sequelize.Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'media',
                    key: 'id'
                },
                onDelete: 'SET NULL'
            });
            console.log('Icon ID column added successfully.');
        } else {
            console.log('Column icon_id already exists in about_page_global_reach_cards.');
        }

        console.log('Migration completed successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

migrate();

