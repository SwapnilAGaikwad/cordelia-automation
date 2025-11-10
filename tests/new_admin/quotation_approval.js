require('dotenv').config();
const Imap = require('imap');
const { simpleParser } = require('mailparser');
const fs = require('fs');

// Utility to open IMAP connection
function openImapConnection(config) {
  return new Imap(config);
}

// Search unread emails with specific criteria
function searchUnreadEmails(imap, searchCriteria) {
  return new Promise((resolve, reject) => {
    imap.search(searchCriteria, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
}

// Fetch and parse the latest email by UID
function fetchLatestEmail(imap, uids) {
  return new Promise((resolve, reject) => {
    if (!uids || uids.length === 0) {
      resolve(null);
      return;
    }

    const f = imap.fetch(uids.slice(-1), { bodies: '' });

    f.on('message', (msg) => {
      msg.on('body', async (stream) => {
        let buffer = '';
        stream.on('data', (chunk) => { buffer += chunk.toString('utf8'); });
        stream.once('end', async () => {
          fs.writeFileSync('latest_email_raw.eml', buffer);
          try {
            const parsed = await simpleParser(buffer);
            resolve(parsed);
          } catch (parseError) {
            reject(parseError);
          }
        });
      });
    });

    f.once('error', (fetchError) => reject(fetchError));
  });
}

// Main function to get the Approve URL
async function getLatestQuotationEmail() {
  const imapConfig = {
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASS,
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false },
  };

  return new Promise((resolve, reject) => {
    const imap = openImapConnection(imapConfig);

    imap.once('ready', () => {
      imap.openBox('INBOX', true, async (err) => {
        if (err) return reject(err);

        try {
          const uids = await searchUnreadEmails(imap, ['UNSEEN', ['SUBJECT', 'Quotation Approval']]);
          const email = await fetchLatestEmail(imap, uids);
          imap.end();

          if (!email) return reject('No Quotation Approval email found.');

          console.log('📧 Quotation Email Subject:', email.subject);

          const body = email.html || email.textAsHtml || '';
          fs.writeFileSync('latest_email_body.html', body);

          // Match the approve URL pattern
          const approveMatch = body.match(
            /(https?:\/\/[^\s]+\/approved\/[^\s"']+)/
          );

          if (approveMatch) {
            const approveUrl = approveMatch[1].trim();
            console.log('✅ Approve URL found:', approveUrl);
            resolve(approveUrl);
          } else {
            reject('Approve URL not found in email.');
          }
        } catch (error) {
          reject(error);
        }
      });
    });

    imap.once('error', (err) => reject(err));
    imap.once('end', () => console.log('IMAP connection ended.'));
    imap.connect();
  });
}

module.exports = { getLatestQuotationEmail };
