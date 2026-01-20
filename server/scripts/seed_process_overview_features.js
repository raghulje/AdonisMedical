const { Sequelize } = require('sequelize');
const config = require('../config/config.json')['development'];

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    logging: console.log,
});

async function seedProcessOverviewFeatures() {
    try {
        await sequelize.authenticate();
        console.log('Connection established successfully.');

        // Check if features 4-6 exist (Process Overview features)
        const [results] = await sequelize.query(
            'SELECT * FROM production_facility_features WHERE order_index >= 3 ORDER BY order_index'
        );

        if (results.length >= 3) {
            console.log('Process Overview features already exist. Updating them...');

            const features = [
                {
                    heading: 'Initial Material Inspection:',
                    description: 'Every raw material undergoes a thorough inspection.',
                    orderIndex: 3
                },
                {
                    heading: 'In-Process Quality Checks:',
                    description: 'Multiple checkpoints during production.',
                    orderIndex: 4
                },
                {
                    heading: 'Final Testing:',
                    description: 'Comprehensive testing in our in-house quality lab.',
                    orderIndex: 5
                }
            ];

            for (let i = 0; i < features.length; i++) {
                await sequelize.query(
                    `UPDATE production_facility_features 
           SET heading = ?, description = ? 
           WHERE order_index = ?`,
                    {
                        replacements: [features[i].heading, features[i].description, features[i].orderIndex]
                    }
                );
            }
            console.log('Process Overview features updated successfully.');
        } else {
            console.log('Creating Process Overview features...');

            const features = [
                {
                    heading: 'Initial Material Inspection:',
                    description: 'Every raw material undergoes a thorough inspection.',
                    orderIndex: 3
                },
                {
                    heading: 'In-Process Quality Checks:',
                    description: 'Multiple checkpoints during production.',
                    orderIndex: 4
                },
                {
                    heading: 'Final Testing:',
                    description: 'Comprehensive testing in our in-house quality lab.',
                    orderIndex: 5
                }
            ];

            for (const feature of features) {
                await sequelize.query(
                    `INSERT INTO production_facility_features (heading, description, order_index, icon_id, icon_class) 
           VALUES (?, ?, ?, NULL, NULL)`,
                    {
                        replacements: [feature.heading, feature.description, feature.orderIndex]
                    }
                );
            }
            console.log('Process Overview features created successfully.');
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await sequelize.close();
    }
}

seedProcessOverviewFeatures();
