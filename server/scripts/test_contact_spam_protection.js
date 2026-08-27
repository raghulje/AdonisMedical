/**
 * Manual verification for contact-form spam protection.
 * Run: node scripts/test_contact_spam_protection.js
 */

const {
  evaluateContactSpam,
  markAcceptedSubmission,
  isDisposableOrTestEmail,
  isSuspiciousPhone,
  containsXssOrHtml,
  _resetDuplicateWindowForTests,
} = require('../helpers/contactFormSpamProtection');

function assert(cond, msg) {
  if (!cond) {
    console.error('FAIL:', msg);
    process.exitCode = 1;
  } else {
    console.log('PASS:', msg);
  }
}

_resetDuplicateWindowForTests();

// --- XSS / HTML ---
assert(containsXssOrHtml("<script>alert('1')</script>"), 'detect script tag');
assert(containsXssOrHtml('<h1>Testing Injection</h1>'), 'detect h1 injection');
assert(containsXssOrHtml('<img src=x onerror=alert(1)>'), 'detect onerror XSS');
assert(!containsXssOrHtml('Looking for HF Mobile demo in Chennai'), 'allow normal message');

assert(
  evaluateContactSpam({ message: "<h1>Testing Injection</h1>" }, { email: 'buyer@hospital.com', mobile: '+919876543210', name: 'Ravi Kumar', message: "<h1>Testing Injection</h1>" }).reason === 'xss_or_html_payload',
  'block XSS message payload'
);

// --- Disposable / test emails ---
assert(isDisposableOrTestEmail('test@gmail.com'), 'block test@gmail.com');
assert(isDisposableOrTestEmail('TestingInjection@gmail.com'), 'block TestingInjection@gmail.com');
assert(isDisposableOrTestEmail('testing@yahoo.com'), 'block testing@...');
assert(isDisposableOrTestEmail('spam@mailinator.com'), 'block disposable domain');
assert(!isDisposableOrTestEmail('rajesh.kumar@apollohospitals.com'), 'allow real hospital email');
assert(!isDisposableOrTestEmail('contest@company.com'), 'allow contest@ (not test@)');
assert(!isDisposableOrTestEmail('latest.updates@company.com'), 'allow latest@...');

assert(
  evaluateContactSpam({}, { email: 'TestingInjection@gmail.com', mobile: '+919811223344', name: 'Ravi Kumar', message: 'Need a quote for FPD C-Arm' }).reason === 'disposable_or_test_email',
  'block TestingInjection email via evaluate'
);

// --- Suspicious phones ---
assert(isSuspiciousPhone('918234567890'), 'block 918234567890');
assert(isSuspiciousPhone('8234567890'), 'block 8234567890');
assert(isSuspiciousPhone('919876542123'), 'block 919876542123');
assert(isSuspiciousPhone('+91 98765 42123'), 'block formatted 919876542123');
assert(isSuspiciousPhone('9999999999'), 'block all-nines');
assert(!isSuspiciousPhone('+919811223344'), 'allow normal Indian mobile');
assert(!isSuspiciousPhone('9876512345'), 'allow real-looking 98765 number without long sequence');
assert(isSuspiciousPhone('9876543210'), 'block classic 9876543210 sequence');

assert(
  evaluateContactSpam({}, { email: 'buyer@hospital.com', mobile: '919876542123', name: 'Ravi Kumar', message: 'Interested in Digital Radiography' }).reason === 'suspicious_phone',
  'block suspicious phone via evaluate'
);

// --- Valid submission ---
const valid = evaluateContactSpam(
  { product: 'HF Mobile', city: 'Chennai, Tamil Nadu', source: 'contact-us' },
  {
    name: 'Ravi Kumar',
    email: 'ravi.kumar@apollohospitals.com',
    mobile: '+919811223344',
    message: 'We need a quotation for HF Mobile units for our radiology department.',
  }
);
assert(!valid.blocked, 'allow legitimate customer submission');

// --- Duplicate within 10 minutes ---
markAcceptedSubmission('ravi.kumar@apollohospitals.com');
const dup = evaluateContactSpam(
  {},
  {
    name: 'Ravi Kumar',
    email: 'ravi.kumar@apollohospitals.com',
    mobile: '+919811223344',
    message: 'Following up on my earlier enquiry.',
  }
);
assert(dup.blocked && dup.reason === 'duplicate_within_10_minutes', 'block duplicate within 10 minutes');

// Different email still allowed
const other = evaluateContactSpam(
  {},
  {
    name: 'Priya Sharma',
    email: 'priya.sharma@fortis.in',
    mobile: '+919900112233',
    message: 'Please share brochure for Dream Series.',
  }
);
assert(!other.blocked, 'allow different email after another user submitted');

console.log('\nDone.');
