const { sequelize } = require('./models');

async function fixIssues() {
    try {
        const queryInterface = sequelize.getQueryInterface();

        console.log('--- Fixing HomeContactSection ---');
        const homeContactTableInfo = await queryInterface.describeTable('home_contact_section');
        if (!homeContactTableInfo.background_image_id) {
            console.log('Adding background_image_id to home_contact_section...');
            await queryInterface.addColumn('home_contact_section', 'background_image_id', {
                type: sequelize.Sequelize.INTEGER,
                allowNull: true,
                references: { model: 'media', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            });
        } else {
            console.log('Column background_image_id already exists in home_contact_section.');
        }

        console.log('\n--- Fixing ProductionFacilityFeature ---');
        try {
            await queryInterface.describeTable('production_facility_features');
            console.log('Table production_facility_features already exists.');
        } catch (error) {
            console.log('Creating table production_facility_features...');
            await queryInterface.createTable('production_facility_features', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: sequelize.Sequelize.INTEGER
                },
                heading: {
                    type: sequelize.Sequelize.STRING(255),
                    allowNull: false
                },
                description: {
                    type: sequelize.Sequelize.TEXT,
                    allowNull: true
                },
                icon_id: {
                    type: sequelize.Sequelize.INTEGER,
                    allowNull: true,
                    references: { model: 'media', key: 'id' },
                    onUpdate: 'CASCADE',
                    onDelete: 'SET NULL'
                },
                icon_class: {
                    type: sequelize.Sequelize.STRING(100),
                    allowNull: true
                },
                order_index: {
                    type: sequelize.Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0
                },
                is_active: {
                    type: sequelize.Sequelize.BOOLEAN,
                    defaultValue: true
                },
                created_at: {
                    allowNull: false,
                    type: sequelize.Sequelize.DATE
                },
                updated_at: {
                    allowNull: false,
                    type: sequelize.Sequelize.DATE
                }
            });
        }

        console.log('\n--- Verifying ProductionFacilityPageContent ---');
        const prodFacTableInfo = await queryInterface.describeTable('production_facility_page_content');
        const columnsToAdd = [
            { name: 'intro_background_image_id', type: sequelize.Sequelize.INTEGER },
            { name: 'flexibility_image_id', type: sequelize.Sequelize.INTEGER },
            { name: 'quality_background_image_id', type: sequelize.Sequelize.INTEGER },
            { name: 'quality_image_id', type: sequelize.Sequelize.INTEGER }
        ];

        for (const col of columnsToAdd) {
            if (!prodFacTableInfo[col.name]) {
                console.log(`Adding ${col.name} to production_facility_page_content...`);
                await queryInterface.addColumn('production_facility_page_content', col.name, {
                    type: col.type,
                    allowNull: true,
                    references: { model: 'media', key: 'id' },
                    onUpdate: 'CASCADE',
                    onDelete: 'SET NULL'
                });
            } else {
                console.log(`Column ${col.name} already exists.`);
            }
        }

        console.log('\nAll fixes completed successfully.');
        process.exit(0);
    } catch (error) {
        console.error('An error occurred during fixes:', error);
        process.exit(1);
    }
}

fixIssues();
