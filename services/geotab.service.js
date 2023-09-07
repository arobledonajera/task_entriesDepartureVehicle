const GeotabApi = require("mg-api-js");

class GeotabService {
    apiReference = null;

  validateCredentials = async (credentials) => {
    try {
      const api = await this.getApi(credentials);
      const resp = await api.call('Get', {
        typeName: 'Device',
        resultsLimit: 1,
      });
      if (resp) {
        this.apiReference = api;
        return true;
      }
    } catch (ex) {
      return false;
    }
  };

  async getApi({ userName, password, database, server, sessionId }) {
    try {
      const authentication = {
        credentials: {
          database: database,
          userName: userName,
          password: password,
          sessionId: sessionId ? sessionId : null,
        },
        path: server,
      };
      try {
        const api = await new GeotabApi(authentication);
        return api;
      } catch (err) {
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }

  async getDevices(parentId){
    try {
        const response = await this.apiReference.call( "Get", {
            "typeName": "Device",
            "propertySelector":{
                fields: ["id","name","groups"],
                isIncluded: true
            },
            "search":{
                "groups":[{
                    "id": parentId
                }]
            }
        })
        if(response){
            return response.map(device => device.id)
        }

        return [];
    } catch (err) {
        throw err;
    }
  }
}

module.exports = new GeotabService();
