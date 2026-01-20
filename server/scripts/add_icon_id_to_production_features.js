const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.json')['development']; // Adjust environment if needed

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    logging: console.log,
});

async function addIconIdColumn() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        const queryInterface = sequelize.getQueryInterface();
        const tableInfo = await queryInterface.describeTable('production_facility_features');

        if (!tableInfo.icon_id) {
            console.log('Adding icon_id column to production_facility_features table...');
            await queryInterface.addColumn('production_facility_features', 'icon_id', {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'media',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            });
            console.log('Column icon_id added successfully.');
        } else {
            console.log('Column icon_id already exists.');
        }

    } catch (error) {
        console.error('Unable to connect to the database or execute query:', error);
    } finally {
        await sequelize.close();
    }
}

addIconIdColumn();
