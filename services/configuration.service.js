// Repositories
const { configurationRepository } = require('../repositories/index.repository');

// Class
class ConfigurationService {
  getConfiguration = async () => {
    try {
      const data = await configurationRepository.getConfiguration();
      return data;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = new ConfigurationService();
