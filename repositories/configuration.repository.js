const queryGenerator = require('../utils/queryGenerator');

class ConfigurationRepository {
  getConfiguration = async () => {
    try {
      const query = `select * from general_configuration_fn()`;
      const result = await queryGenerator.executePostgresQuery(query, {}, true);
      return result.general_configuration_fn.data[0];
    } catch (error) {
      throw error;
    }
  };
}

module.exports = new ConfigurationRepository();
