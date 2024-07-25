const entDepVehiclesServices = require('./vehicles.service');
const sendEmail = require('./sendEmail.service');
const configurationService = require('./configuration.service');

module.exports = {
  entDepVehiclesServices,
  sendEmail,
  configurationService,
};
