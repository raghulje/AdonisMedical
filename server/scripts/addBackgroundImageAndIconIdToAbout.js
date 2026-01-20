const { sequelize } = require('../models');

async function migrate() {
    try {
        const queryInterface = sequelize.getQueryInterface();
        
        // Check and add background_image_id to about_page_content
        const contentTableInfo = await queryInterface.describeTable('about_page_content');
        if (!contentTableInfo.background_image_id) {
            console.log('Adding background_image_id column to about_page_content...');
            await queryInterface.addColumn('about_page_content', 'background_image_id', {
                type: sequelize.Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'media',
                    key: 'id'
                },
                onDelete: 'SET NULL'
            });
            console.log('Background image column added successfully.');
        } else {
            console.log('Column background_image_id already exists in about_page_content.');
        }

        // Check and add icon_id to about_page_highlights
        const highlightsTableInfo = await queryInterface.describeTable('about_page_highlights');
        if (!highlightsTableInfo.icon_id) {
            console.log('Adding icon_id column to about_page_highlights...');
            await queryInterface.addColumn('about_page_highlights', 'icon_id', {
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
            console.log('Column icon_id already exists in about_page_highlights.');
        }

        console.log('Migration completed successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

migrate();

