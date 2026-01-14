const fs = require('fs');
const path = require('path');

const products = [
  { table: 'fpd_c_arm', model: 'FpdCArm' },
  { table: 'hf_c_arm_1k', model: 'HfCArm1k' },
  { table: 'line_frequency', model: 'LineFrequency' },
  { table: 'digital_radiography', model: 'DigitalRadiography' },
  { table: 'dream_series', model: 'DreamSeries' }
];

const modelsDir = path.join(__dirname, '../models');
const templateDir = path.join(__dirname, '../models');

// Read templates
const pageContentTemplate = fs.readFileSync(path.join(templateDir, 'hf_mobile_page_content.js'), 'utf8');
const imageTemplate = fs.readFileSync(path.join(templateDir, 'hf_mobile_image.js'), 'utf8');
const featureTemplate = fs.readFileSync(path.join(templateDir, 'hf_mobile_feature.js'), 'utf8');
const variantTemplate = fs.readFileSync(path.join(templateDir, 'hf_mobile_variant.js'), 'utf8');

products.forEach(({ table, model }) => {
  // Page Content
  let content = pageContentTemplate
    .replace(/HfMobile/g, model)
    .replace(/hf_mobile/g, table);
  fs.writeFileSync(path.join(modelsDir, `${table}_page_content.js`), content);
  
  // Image
  content = imageTemplate
    .replace(/HfMobile/g, model)
    .replace(/hf_mobile/g, table);
  fs.writeFileSync(path.join(modelsDir, `${table}_image.js`), content);
  
  // Feature
  content = featureTemplate
    .replace(/HfMobile/g, model)
    .replace(/hf_mobile/g, table);
  fs.writeFileSync(path.join(modelsDir, `${table}_feature.js`), content);
  
  // Variant
  content = variantTemplate
    .replace(/HfMobile/g, model)
    .replace(/hf_mobile/g, table);
  fs.writeFileSync(path.join(modelsDir, `${table}_variant.js`), content);
  
  console.log(`✓ Created 4 models for ${model}`);
});

console.log(`\n✅ All ${products.length * 4} product models created!`);

