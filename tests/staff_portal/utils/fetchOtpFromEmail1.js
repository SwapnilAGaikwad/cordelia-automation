require('dotenv').config();
const Imap = require('imap');
const { simpleParser } = require('mailparser');

function fetchOtpFromEmail() {
  return new Promise((resolve, reject) => {
    const imap = new Imap({
      user: process.env.EMAIL_USER,
      password: process.env.EMAIL_PASS,
      host: process.env.IMAP_HOST,
      port: process.env.IMAP_PORT,
      tls: true
    });

    function openInbox(cb) {
      imap.openBox('INBOX', true, cb);
    }

    imap.once('ready', () => {
      openInbox((err, box) => {
        if (err) throw err;

        // Search for unseen emails from Cordelia Cruises (adjust FROM if needed)
        imap.search(['UNSEEN', ['FROM', 'no-reply@cordeliacruises.com']], (err, results) => {
          if (err) throw err;
          if (!results || !results.length) {
            return reject('No new OTP email found');
          }

          const f = imap.fetch(results, { bodies: '' });
          f.on('message', msg => {
            msg.on('body', async stream => {
              const parsed = await simpleParser(stream);
              const body = parsed.text;

              // Extract OTP using regex (assuming 6 digits)
              const match = body.match(/\b\d{6}\b/);
              if (match) {
                resolve(match[0]);
                imap.end();
              }
            });
          });

          f.once('error', err => reject(err));
        });
      });
    });

    imap.once('error', err => reject(err));
    imap.connect();
  });
}

module.exports = fetchOtpFromEmail;
