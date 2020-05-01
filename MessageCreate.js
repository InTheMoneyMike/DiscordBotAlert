'use strict';

const Action = require('./Action');
const { Events } = require('../../util/Constants');

class MessageCreateAction extends Action {
  handle(data) {
    const client = this.client;
    const channel = client.channels.cache.get(data.channel_id);
    if (channel) {
      const existing = channel.messages.cache.get(data.id);
      if (existing) return { message: existing };
      const message = channel.messages.add(data);
      const user = message.author;
      let member = message.member;
      channel.lastMessageID = data.id;
      if (user) {
        user.lastMessageID = data.id;
        user.lastMessageChannelID = channel.id;
      }
      if (member) {
        member.lastMessageID = data.id;
        member.lastMessageChannelID = channel.id;
      }
      var alertedby = null;
      if(message.includes("BTO"))
          {
              //API
              const {google} = require('googleapis');
              const sheets = google.sheets('v4');

              async function main () {
              const authClient = await authorize();
              const request = {
                // The ID of the spreadsheet to update.
                spreadsheetId: '1d3vXRy69a2BsuyvxJ5FXaNjH4DF9U8_dsX4og-_A1Gw',  // TODO: Update placeholder value.

                // The A1 notation of a range to search for a logical table of data.
                // Values are appended after the last row of the table.
                range: 'Sheets1',  // TODO: Update placeholder value.

                // How the input data should be interpreted.
                valueInputOption: 'RAW',  // TODO: Update placeholder value.

                // How the input data should be inserted.
                //insertDataOption: '',  // TODO: Update placeholder value.
                
                
                resource: {
                  // TODO: Add desired properties to the request body.
                  "values": [
                    [
                      Date.now(),
                      user,
                      message
                    ]
                  ]
                },

                auth: authClient,
              };

              try {
                const response = (await sheets.spreadsheets.values.append(request)).data;
                // TODO: Change code below to process the `response` object:
                console.log(JSON.stringify(response, null, 2));
              } catch (err) {
                console.error(err);
              }
          }
            main();

            async function authorize() {
              // TODO: Change placeholder below to generate authentication credentials. See
              // https://developers.google.com/sheets/quickstart/nodejs#step_3_set_up_the_sample
              //
              // Authorize using one of the following scopes:
              //   'https://www.googleapis.com/auth/drive'
              //   'https://www.googleapis.com/auth/drive.file'
              //   'https://www.googleapis.com/auth/spreadsheets'
              let authClient = null;

              if (authClient == null) {
                throw Error('authentication failed');
              }

              return authClient;
            }
          }
          else if(message.includes("STC"))
          {
              //API
              const {google} = require('googleapis');
              const sheets = google.sheets('v4');

              async function main () {
              const authClient = await authorize();
              const request = {
                // The ID of the spreadsheet to update.
                spreadsheetId: '1d3vXRy69a2BsuyvxJ5FXaNjH4DF9U8_dsX4og-_A1Gw',  // TODO: Update placeholder value.

                // The A1 notation of a range to search for a logical table of data.
                // Values are appended after the last row of the table.
                range: 'Sheets2',  // TODO: Update placeholder value.

                // How the input data should be interpreted.
                valueInputOption: 'RAW',  // TODO: Update placeholder value.

                // How the input data should be inserted.
                //insertDataOption: '',  // TODO: Update placeholder value.
                
                
                resource: {
                  // TODO: Add desired properties to the request body.
                  "values": [
                    [
                      Date.now(),
                      user,
                      message
                    ]
                  ]
                },

                auth: authClient,
              };

              try {
                const response = (await sheets.spreadsheets.values.append(request)).data;
                // TODO: Change code below to process the `response` object:
                console.log(JSON.stringify(response, null, 2));
              } catch (err) {
                console.error(err);
              }
          }
            main();

            async function authorize() {
              // TODO: Change placeholder below to generate authentication credentials. See
              // https://developers.google.com/sheets/quickstart/nodejs#step_3_set_up_the_sample
              //
              // Authorize using one of the following scopes:
              //   'https://www.googleapis.com/auth/drive'
              //   'https://www.googleapis.com/auth/drive.file'
              //   'https://www.googleapis.com/auth/spreadsheets'
              let authClient = null;

              if (authClient == null) {
                throw Error('authentication failed');
              }

              return authClient;
            }
          }

      /**
       * Emitted whenever a message is created.
       * @event Client#message
       * @param {Message} message The created message
       */
      client.emit(Events.MESSAGE_CREATE, message);
      return { message };
    }

    return {};
  }
}

module.exports = MessageCreateAction;
