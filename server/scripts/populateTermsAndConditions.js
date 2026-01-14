const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const config = require('../config/config.json').development;

const termsAndConditionsContent = {
  title: 'Terms and Conditions',
  subtitle: 'Please read these terms carefully before using our services',
  paragraphs: [
    {
      content: 'This terms and condition ("Terms"/ "Agreement") is an agreement between Adonis Medical Systems Private Limited which shall mean and include its parent company/holding company, subsidiaries, affiliates, associate companies and Refex Group of Companies ("Adonis", "us", "we" or "our") and you ("User", "you" or "your"). This Agreement sets forth the general terms and conditions of your use of our main website "www.adonismedical.com" including any sub-domains of this website, unless excluded by their own terms (collectively referred to as "Website").'
    },
    {
      content: 'ACCURACY OF INFORMATION\n\nOccasionally there may be information on the Website that contains typographical errors, inaccuracies or omissions that may relate to promotions and offers. We reserve the right to correct any errors, inaccuracies or omissions, and to change or update information or cancel orders if any information on the Website is inaccurate at any time without prior notice (including after you have submitted your order) to you. We undertake no obligation to update, amend or clarify information on the Website including, without limitation, pricing information, except as required by law. No specified update or fresh date applied on the Website should be taken to indicate that all information on the Website has been modified or updated.'
    },
    {
      content: 'LINKS TO OTHER WEBSITES\n\nAlthough this Website may be linked to other websites, we are not, directly or indirectly, implying any approval, association, sponsorship, endorsement, or affiliation with any linked website, unless specifically stated herein. We are not responsible for examining or evaluating, and we do not warrant the offerings of any businesses or individuals or the content of their websites. We do not assume any responsibility or liability for the actions, products, services and content of any other third parties. You should carefully review the legal statements and other conditions of use of any website that you access through a link from our Website. Your linking to any other off-site websites is at your own risk.'
    },
    {
      content: 'PROHIBITED USES\n\nIn addition to other terms as set forth in the Agreement, you are prohibited from using our Website or its content: (a) for any unlawful purpose; (b) to solicit others to perform or participate in any unlawful acts; (c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances; (d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others; (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability; (f) to submit false or misleading information; (g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Website or of any related website, other websites, or the Internet; (h) to collect or track the personal information of others; (i) to spam, phish, pharm, pretext, spider, crawl, or scrape; (j) for any obscene or immoral purpose; or (k) to interfere with or circumvent the security features of the Website or any related website, other websites, or the Internet. We reserve the right to terminate your use of the Website or any related website for violating any of the prohibited uses.'
    },
    {
      content: 'INTELLECTUAL PROPERTY RIGHTS\n\nThis Agreement does not transfer from Adonis to you, any of Adonis\'s or third-party intellectual property, and all right, title, and interest in and to such property will remain (as between the parties) solely with Adonis. All trademarks, service marks, graphics and logos used in connection with our Website, are trademarks or registered trademarks of Adonis. Other trademarks, service marks, graphics and logos used in connection with our Website may be the trademarks of other third parties. Your use of our Website grants you no right or license to reproduce or otherwise use any of Adonis\'s or third-party trademarks.'
    },
    {
      content: 'DISCLAIMER OF WARRANTY\n\nYou agree that your use of our Website is solely at your own risk. You agree that such Website is provided on an "as is" and "as available" basis. We expressly disclaim all warranties of any kind, whether express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose and non-infringement. We make no warranty that our Website will meet your requirements, or that our Website will be uninterrupted, timely, secure, or error free; nor do we make any warranty as to the results that may be obtained from the use of our Website or as to the accuracy or reliability of any information obtained through our Website or that defects in the our Website will be corrected. You understand and agree that any material and/or data downloaded or otherwise obtained through the use of our Website is done at your own discretion and risk and that you will be solely responsible for any damage to your computer system or loss of data that results from the download of such material and/or data. We make no warranty regarding any goods or services purchased or obtained through our Website or any transactions entered into through the Service. No advice or information, whether oral or written, obtained by you from us or through our Website shall create any warranty not expressly made herein.'
    },
    {
      content: 'LIMITATION OF LIABILITY\n\nTo the fullest extent permitted by applicable law, in no event will Adonis, its affiliates, officers, directors, employees, agents, suppliers or licensors be liable to any person for (a): any indirect, incidental, special, punitive, cover or consequential damages (including, without limitation, damages for lost profits, revenue, sales, goodwill, use or content, impact on business, business interruption, loss of anticipated savings, loss of business opportunity) however caused, under any theory of liability, including, without limitation, contract, tort, warranty, breach of statutory duty, negligence or otherwise, even if Adonis has been advised as to the possibility of such damages or could have foreseen such damages.'
    },
    {
      content: 'INDEMNIFICATION\n\nYou agree to indemnify and hold Adonis and its affiliates, directors, officers, employees, and agents including its parent company/holding company, subsidiaries, affiliates, associate companies and Refex Group of Companies harmless from and against any liabilities, losses, damages or costs, including reasonable attorneys\' fees, incurred in connection with or arising from any third-party allegations, claims, actions, disputes, or demands asserted against any of them as a result of or relating to your content, your use of our Website or any willful misconduct on your part.'
    },
    {
      content: 'SEVERABILITY\n\nAll rights and restrictions contained in this Agreement may be exercised and shall apply and binding only to the extent that they do not violate any applicable laws and are intended to be limited to the extent necessary so that they will not render this Agreement illegal, invalid or unenforceable. If any provision or portion of any provision of this Agreement shall be held to be illegal, invalid or unenforceable by a court of competent jurisdiction, it is the intention of the parties that the remaining provisions or portions thereof shall constitute their agreement with respect to the subject matter hereof, and all such remaining provisions or portions thereof shall remain in full force and effect.'
    },
    {
      content: 'DISPUTE RESOLUTION\n\nThe Policy shall be governed by the laws of India and the Courts in Chennai shall have the exclusive jurisdiction to try any dispute arising thereof.'
    },
    {
      content: 'CHANGES AND AMENDMENTS\n\nWe reserve the right to modify this Agreement or its policies relating to our Website at any time, effective upon posting of an updated version of this Agreement on the Website. When we do we will post a notification on the main page of our Website. Continued use of the Website after any such changes shall constitute your consent to such changes.'
    },
    {
      content: 'ACCEPTANCE OF THESE TERMS\n\nYou acknowledge that you have read this Agreement and agree to all its terms and conditions. By using our Website you agree to be bound by this Agreement. If you do not agree to abide by the terms of this Agreement, you are not authorized to use or access our Website.'
    },
    {
      content: 'CONTACTING US\n\nIf you have any questions about this Agreement, please contact us at info@adonismedical.com. This document was last updated on 12th January, 2026.'
    }
  ]
};

async function populateTermsAndConditions() {
  let connection;
  
  try {
    console.log('Connecting to database...');
    connection = await mysql.createConnection({
      host: config.host,
      port: config.port,
      user: config.username,
      password: config.password,
      database: config.database
    });
    
    console.log('✓ Database connection established.\n');
    
    // Update page content
    console.log('Updating Terms and Conditions page content...');
    await connection.query(
      'UPDATE terms_and_conditions_page SET title = ?, subtitle = ? WHERE id = 1',
      [termsAndConditionsContent.title, termsAndConditionsContent.subtitle]
    );
    console.log('✓ Page content updated.');
    
    // Delete existing paragraphs
    console.log('Clearing existing paragraphs...');
    await connection.query('DELETE FROM terms_and_conditions_paragraphs WHERE terms_and_conditions_page_id = 1');
    console.log('✓ Existing paragraphs cleared.');
    
    // Insert new paragraphs
    console.log('Inserting paragraphs...');
    for (let i = 0; i < termsAndConditionsContent.paragraphs.length; i++) {
      const paragraph = termsAndConditionsContent.paragraphs[i];
      await connection.query(
        'INSERT INTO terms_and_conditions_paragraphs (terms_and_conditions_page_id, content, order_index) VALUES (?, ?, ?)',
        [1, paragraph.content, i]
      );
      console.log(`  ✓ Paragraph ${i + 1} inserted.`);
    }
    
    console.log('\n✓ Terms and Conditions content populated successfully!');
    console.log(`  Total paragraphs: ${termsAndConditionsContent.paragraphs.length}`);
    
  } catch (error) {
    console.error('✗ Error populating Terms and Conditions:');
    console.error(error.message);
    if (error.sql) {
      console.error('SQL Error:', error.sql);
    }
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n✓ Database connection closed.');
    }
  }
}

populateTermsAndConditions();

