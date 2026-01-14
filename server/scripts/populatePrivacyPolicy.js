const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const config = require('../config/config.json').development;

const privacyPolicyContent = {
  title: 'Privacy Policy',
  subtitle: 'Your privacy is important to us. Learn how we protect your information.',
  paragraphs: [
      {
        content: 'Adonis Medical Systems Private Limited, which shall mean and include its parent company, holding company, subsidiaries, affiliates, associate companies and Refex Group of Companies ("we", "our", and "Adonis") is fully committed to protecting your personal information. The protection of your privacy and personal data is an important concern to which we pay special attention in our business processes. We process your personal data, provided by you voluntarily during visits to our Website, as defined below, in accordance with the applicable laws, rules & regulations of India.'
      },
      {
        content: 'This Privacy Policy ("Policy") applies to the main Website "www.adonismedical.com". Please note that this Website may include links to the ancillary websites of Adonis and shall include its subsidiaries, affiliates, associate, parent, holding and group companies. Further, this Website may lead/ include links of third parties whose privacy practices differ from those of Adonis. If you provide your personal data to any of those websites, then your data is governed by their privacy policy/statements and not by this Policy. Your privacy is important to us. We take the privacy of your information seriously. This Policy only applies to information collected through this Website and not to any information collected offline.'
      },
      {
        content: 'The core objective of this Policy is to bring to your knowledge the nature of your personal data collected by us, the purpose of collecting such data and its use, the subsequent processing of such data and your rights pertaining to such personal data shared with us. This Policy further sets out your rights pertaining to the protection of your personal data. This Policy describes the information that Adonis collects through this Website, how that information is used, maintained, shared, protected and how you can update it.'
      },
      {
        content: 'We encourage you to read and understand this Policy in connection with the use of our Website.'
      },
      {
        content: '1. DEFINITIONS\n\nIn this Policy the following definitions are used:\n\n"Data" includes information including your personal information that you submit to via the Website and information that is accessed by Adonis pursuant to your visit to the Website except for your information that is or will be in the public domain.\n\n"Data Protection Laws" any applicable law relating to the processing of personal Data, including the Information Technology Act, 2000, as amended or substituted;\n\n"User or you" the natural person who accesses the Website\n\n"Website" is the website that you are currently using, www.adonismedical.com, and any sub-domains of this site, unless excluded by their own terms.'
      },
      {
        content: '2. SCOPE\n\nAdonis collects some of the Data directly from the Website, such as when you submit an entry (through the general query, or submission of a proposal). You can visit www.adonismedical.com without telling Adonis who you are.'
      },
      {
        content: '3. APPLICABILITY\n\nAdonis collects some of the Data directly from the Website, such as when you submit an entry (through the general query, or submission of a proposal). You can visit www.adonismedical.com without telling Adonis who you are.'
      },
      {
        content: '4. DATA COLLECTION\n\nI. We collect Data which you provide us, inter alia, in scenarios such as-\n\na. You voluntarily provide to Adonis when you express an interest in our services by submitting any information as may be requested on the Website.\n\nb. Responding to a survey, conducted by us.\n\nc. Registering for any events displayed on our Website.\n\nd. Requesting information about our product or use of our services or request for customer support etc.\n\nII. We do not track, collect or store any information automatically which includes IP address, browser type, browser cookies, location and device information.\n\nIII. We may ask you to provide your Data relevant to the scenarios such as your name, address, zip code, phone number, and email address, and collect your IP address, location data, information about your device, etc. Not all of the Data holds about you, will always come directly from you. It may, for example, come from your employer or other organizations to which you belong or through our retail network and preferred partners. However, Adonis collects Data about you when you interact with this Website and/or utilize products or services offered on this Website. iii) We keep your Data/information for as long as necessary to fulfill the purposes outlined in this Policy unless otherwise required by law.\n\nIV. We collect Data when the Data is given to us by you.\n\nV. We do not automatically capture any specific personal information from you, (like your name, phone number or e-mail address), that allows us to identify you individually. If the Website requests you to provide personal information, you will be informed of the particular purposes for which the information is gathered and adequate security measures will be taken to protect your personal information.\n\nVI. Any of your information/data available in the public domain shall not be protected under the purview of this Policy and Adonis shall not be held liable for any such disclosures.\n\nVII. By providing us with your Data or the Data pertaining to your relatives, friends or any other third parties, you give us your voluntary and unambiguous consent and also confirm and guarantee that you have received a similar voluntary and unambiguous consent from such of your relatives, friends or third parties for the processing of such Data by Adonis, as per the terms set out in this Policy.'
      },
      {
        content: '5. DATA USAGE\n\nBy entering your User Information, you accept that Adonis may retain your Data and that it may be held by Adonis. We, shall be entitled to use your Data/ personal Information for the following purposes:\n\na. Provide and communicate with you about feedback and follow up on queries submitted to us.\n\nb. Fulfill your requests regarding the services, including without limitation responding to your inquiries, and communicating with you about our products or services that we believe may be of interest to you.\n\nc. Enforce the legal terms (including without limitation our policies and terms of service) that govern your use of our Services, and/or for the purposes for which you provided the Information,\n\nd. Prevent fraud or potentially illegal activities (including, without limitation, copyright infringement) on or through Our Website or Services,\n\ne. In order to enable Adonis to comply with any requirements imposed on Adonis by law.'
      },
      {
        content: '6. DATA SHARING & DISCLOSURE\n\nWe may share your Data with:\n\na. Affiliates/associates/subsidiaries/holding and or parent company and other entities within the Refex Group of companies, to assist them in reaching out to you in relation to their programs or campaigns (including marketing and sales) and to process your query / requests;\n\nb. Our employees, service providers, business partners, and subcontractors, consultants/advisors working on our behalf for the purposes described in this Policy; and\n\nWe usually do not share other personal data collected from the Website with other third parties. However, this may happen if:\n\na. You request or authorize us to do so;\n\nb. We need to comply with applicable law or respond to valid legal processes.'
      },
      {
        content: '7. DATA SAFETY\n\nWe are committed to your privacy and security, we have implemented appropriate technical and organizational security measures to attempt to safeguard and help prevent unauthorized access, maintain data security and correctly use the information we collect online through the Website. You agree that no security measures are perfect or impenetrable and we cannot ensure or warrant the security of any information you transmit or provide to us through the Website and we shall not be held liable for any unveiling or disclosure of Data.'
      },
      {
        content: '8. INTELLECTUAL PROPERTY RIGHTS\n\nThis Policy does not transfer from Adonis to you any of Adonis\'s or any third-party intellectual property, and all rights, title, and interest in and to such property will remain (as between the parties) solely with Adonis. All trademarks, service marks, graphics and logos used in connection with our Website or services, are trademarks or registered trademarks of Adonis. Other trademarks, service marks, graphics and logos used in connection with our Website may be the trademarks of other third parties. Your use of our Website grants you no right or license to reproduce or otherwise use any Adonis\'s or third-party trademarks.'
      },
      {
        content: '9. POLICY CHANGES\n\nAdonis reserves the right to change this policy. When any changes are made to the Policy, we will post the current version on our Website. We encourage you to periodically review this Policy so that you will be aware of our updated privacy practices.\n\nYour continued use of the Website after these modifications will constitute your:\n\n(a) acknowledgment of the modified Policy; and\n\n(b) agreement to abide and be bound by the Policy.'
      },
      {
        content: '10. ACCEPTANCE OF THE POLICY\n\nBy visiting our Website, signing up or logging into the Website, and uploading information on our Website; you acknowledge and unconditionally accept the Policy. If you do not agree with this Policy, do not use our Website and services or provide here any of your personal data.'
      },
      {
        content: '11. RETENTION OF DATA\n\nAdonis retains Data for as long as necessary to provide the access to and use of the Website, or for other essential purposes such as complying with our legal obligations, resolving disputes and enforcing our agreements. Because these needs can vary for different data types and purposes, actual retention periods can vary significantly. Even if we delete your Data, it may persist on backup or archival media for audit, legal, tax or regulatory purposes.'
      },
      {
        content: '12. LINKS TO OTHER WEBSITES\n\nThis Website may, from time to time, provide links to other websites. We have no control over such websites and are not responsible for the content of these websites. This Policy does not extend to your use of such websites. You are advised to read the privacy policy or statements of other websites prior to using them.'
      },
      {
        content: '13. GENERAL\n\nIf any court or competent authority finds that any provision of this Policy (or part of any provision) is invalid, illegal or unenforceable, that provision or part-provision will, to the extent required, be deemed to be deleted, and the validity and enforceability of the other provisions of this Policy will not be affected.'
      },
      {
        content: '14. GOVERNING LAW AND JURISDICTION\n\nThe Policy shall be governed by the laws of India and the Courts in Chennai shall have the exclusive jurisdiction to try any dispute arising thereof.'
      },
      {
        content: '15. QUESTIONS/ CONTACT INFORMATION\n\nIf you have questions or comments regarding this Policy, please contact us at: info@adonismedical.com'
      }
  ]
};

async function populatePrivacyPolicy() {
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
    console.log('Updating Privacy Policy page content...');
    await connection.query(
      'UPDATE privacy_policy_page SET title = ?, subtitle = ? WHERE id = 1',
      [privacyPolicyContent.title, privacyPolicyContent.subtitle]
    );
    console.log('✓ Page content updated.');
    
    // Delete existing paragraphs
    console.log('Clearing existing paragraphs...');
    await connection.query('DELETE FROM privacy_policy_paragraphs WHERE privacy_policy_page_id = 1');
    console.log('✓ Existing paragraphs cleared.');
    
    // Insert new paragraphs
    console.log('Inserting paragraphs...');
    for (let i = 0; i < privacyPolicyContent.paragraphs.length; i++) {
      const paragraph = privacyPolicyContent.paragraphs[i];
      await connection.query(
        'INSERT INTO privacy_policy_paragraphs (privacy_policy_page_id, content, order_index) VALUES (?, ?, ?)',
        [1, paragraph.content, i]
      );
      console.log(`  ✓ Paragraph ${i + 1} inserted.`);
    }
    
    console.log('\n✓ Privacy Policy content populated successfully!');
    console.log(`  Total paragraphs: ${privacyPolicyContent.paragraphs.length}`);
    
  } catch (error) {
    console.error('✗ Error populating Privacy Policy:');
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

populatePrivacyPolicy();

