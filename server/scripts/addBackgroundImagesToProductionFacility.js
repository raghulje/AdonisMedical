const { sequelize } = require('../models');

async function migrate() {
    try {
        const queryInterface = sequelize.getQueryInterface();
        const tableInfo = await queryInterface.describeTable('production_facility_page_content');

        if (!tableInfo.intro_background_image_id) {
            console.log('Adding intro_background_image_id column...');
            await queryInterface.addColumn('production_facility_page_content', 'intro_background_image_id', {
                type: sequelize.Sequelize.INTEGER,
                allowNull: true,
            });
            // Add foreign key separately with shorter name
            await sequelize.query(`
                ALTER TABLE production_facility_page_content
                ADD CONSTRAINT fk_prod_fac_intro_bg_img
                FOREIGN KEY (intro_background_image_id) REFERENCES media(id)
                ON UPDATE CASCADE ON DELETE SET NULL;
            `);
        } else {
            console.log('Column intro_background_image_id already exists.');
        }

        if (!tableInfo.quality_background_image_id) {
            console.log('Adding quality_background_image_id column...');
            await queryInterface.addColumn('production_facility_page_content', 'quality_background_image_id', {
                type: sequelize.Sequelize.INTEGER,
                allowNull: true,
            });
            // Add foreign key separately with shorter name
            await sequelize.query(`
                ALTER TABLE production_facility_page_content
                ADD CONSTRAINT fk_prod_fac_quality_bg_img
                FOREIGN KEY (quality_background_image_id) REFERENCES media(id)
                ON UPDATE CASCADE ON DELETE SET NULL;
            `);
        } else {
            console.log('Column quality_background_image_id already exists.');
        }

        if (!tableInfo.highlighted_box_text) {
            console.log('Adding highlighted_box_text column...');
            await queryInterface.addColumn('production_facility_page_content', 'highlighted_box_text', {
                type: sequelize.Sequelize.TEXT,
                allowNull: true,
            });
        } else {
            console.log('Column highlighted_box_text already exists.');
        }

        console.log('Migration completed successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

migrate();

