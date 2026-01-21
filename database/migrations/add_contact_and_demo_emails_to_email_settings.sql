-- Add contact_form_email and request_demo_email columns to email_settings table
ALTER TABLE email_settings
  ADD COLUMN contact_form_email VARCHAR(255) NULL COMMENT 'Email to receive contact form submissions' AFTER from_name,
  ADD COLUMN request_demo_email VARCHAR(255) NULL COMMENT 'Email to receive request demo form submissions' AFTER contact_form_email;


