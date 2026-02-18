const { sequelize } = require('./models');

async function fixFeaturesTable() {
    try {
        const queryInterface = sequelize.getQueryInterface();
        let tableInfo = {};
        try {
            tableInfo = await queryInterface.describeTable('production_facility_features');
        } catch (e) {
            console.log('Table does not exist, creating it...');
            await queryInterface.createTable('production_facility_features', {
                id: { allowNull: false, autoIncrement: true, primaryKey: true, type: sequelize.Sequelize.INTEGER },
                heading: { type: sequelize.Sequelize.STRING(255), allowNull: false },
                description: { type: sequelize.Sequelize.TEXT, allowNull: true },
                icon_id: { type: sequelize.Sequelize.INTEGER, allowNull: true, references: { model: 'media', key: 'id' } },
                icon_class: { type: sequelize.Sequelize.STRING(100), allowNull: true },
                order_index: { type: sequelize.Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
                is_active: { type: sequelize.Sequelize.BOOLEAN, defaultValue: true },
                created_at: { allowNull: false, type: sequelize.Sequelize.DATE },
                updated_at: { allowNull: false, type: sequelize.Sequelize.DATE }
            });
            console.log('Table created.');
            process.exit(0);
        }

        const columns = [
            { name: 'heading', type: sequelize.Sequelize.STRING(255), allowNull: false },
            { name: 'description', type: sequelize.Sequelize.TEXT },
            { name: 'icon_id', type: sequelize.Sequelize.INTEGER },
            { name: 'icon_class', type: sequelize.Sequelize.STRING(100) },
            { name: 'order_index', type: sequelize.Sequelize.INTEGER, defaultValue: 0 },
            { name: 'is_active', type: sequelize.Sequelize.BOOLEAN, defaultValue: true },
            { name: 'created_at', type: sequelize.Sequelize.DATE, allowNull: false, defaultValue: sequelize.Sequelize.literal('CURRENT_TIMESTAMP') },
            { name: 'updated_at', type: sequelize.Sequelize.DATE, allowNull: false, defaultValue: sequelize.Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') }
        ];

        for (const col of columns) {
            if (!tableInfo[col.name]) {
                console.log(`Adding column ${col.name}...`);
                await queryInterface.addColumn('production_facility_features', col.name, {
                    type: col.type,
                    allowNull: col.allowNull !== undefined ? col.allowNull : true,
                    defaultValue: col.defaultValue
                });
            }
        }

        console.log('All columns ensured.');
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}
fixFeaturesTable();
