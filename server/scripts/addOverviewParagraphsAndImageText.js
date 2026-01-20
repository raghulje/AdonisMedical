const { sequelize } = require('../models');

async function migrate() {
    try {
        const queryInterface = sequelize.getQueryInterface();
        
        // Check and add overview_image_overlay_text to about_page_content
        const contentTableInfo = await queryInterface.describeTable('about_page_content');
        if (!contentTableInfo.overview_image_overlay_text) {
            console.log('Adding overview_image_overlay_text column to about_page_content...');
            await queryInterface.addColumn('about_page_content', 'overview_image_overlay_text', {
                type: sequelize.Sequelize.TEXT,
                allowNull: true
            });
            console.log('Overview image overlay text column added successfully.');
        } else {
            console.log('Column overview_image_overlay_text already exists in about_page_content.');
        }

        // Check if about_page_overview_paragraphs table exists
        const tables = await queryInterface.showAllTables();
        if (!tables.includes('about_page_overview_paragraphs')) {
            console.log('Creating about_page_overview_paragraphs table...');
            await queryInterface.createTable('about_page_overview_paragraphs', {
                id: {
                    type: sequelize.Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                content: {
                    type: sequelize.Sequelize.TEXT,
                    allowNull: false
                },
                order_index: {
                    type: sequelize.Sequelize.INTEGER,
                    defaultValue: 0
                },
                position: {
                    type: sequelize.Sequelize.STRING(20),
                    allowNull: true
                },
                created_at: {
                    type: sequelize.Sequelize.DATE,
                    allowNull: false,
                    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
                },
                updated_at: {
                    type: sequelize.Sequelize.DATE,
                    allowNull: false,
                    defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
                }
            });
            console.log('about_page_overview_paragraphs table created successfully.');
        } else {
            console.log('Table about_page_overview_paragraphs already exists.');
        }

        console.log('Migration completed successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

migrate();

