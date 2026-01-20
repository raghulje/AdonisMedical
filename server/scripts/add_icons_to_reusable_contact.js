
const { sequelize } = require('../models');

async function migrate() {
    try {
        const queryInterface = sequelize.getQueryInterface();
        const tableInfo = await queryInterface.describeTable('reusable_contact_section');

        if (!tableInfo.phone_icon_id) {
            console.log('Adding phone_icon_id column...');
            await queryInterface.addColumn('reusable_contact_section', 'phone_icon_id', {
                type: sequelize.Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'media',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            });
        }

        if (!tableInfo.email_icon_id) {
            console.log('Adding email_icon_id column...');
            await queryInterface.addColumn('reusable_contact_section', 'email_icon_id', {
                type: sequelize.Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'media',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            });
        }

        console.log('Migration completed successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

migrate();
