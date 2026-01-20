const { sequelize } = require('../models');

async function migrate() {
    try {
        const queryInterface = sequelize.getQueryInterface();
        
        // Check and add global_reach_heading to about_page_content
        const contentTableInfo = await queryInterface.describeTable('about_page_content');
        if (!contentTableInfo.global_reach_heading) {
            console.log('Adding global_reach_heading column to about_page_content...');
            await queryInterface.addColumn('about_page_content', 'global_reach_heading', {
                type: sequelize.Sequelize.STRING(255),
                allowNull: true
            });
            console.log('Global reach heading column added successfully.');
        } else {
            console.log('Column global_reach_heading already exists in about_page_content.');
        }

        // Check if about_page_global_reach_cards table exists
        const tables = await queryInterface.showAllTables();
        if (!tables.includes('about_page_global_reach_cards')) {
            console.log('Creating about_page_global_reach_cards table...');
            await queryInterface.createTable('about_page_global_reach_cards', {
                id: {
                    type: sequelize.Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                icon_class: {
                    type: sequelize.Sequelize.STRING(100),
                    allowNull: true
                },
                content: {
                    type: sequelize.Sequelize.TEXT,
                    allowNull: false
                },
                order_index: {
                    type: sequelize.Sequelize.INTEGER,
                    defaultValue: 0
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
            console.log('about_page_global_reach_cards table created successfully.');
        } else {
            console.log('Table about_page_global_reach_cards already exists.');
        }

        console.log('Migration completed successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

migrate();

