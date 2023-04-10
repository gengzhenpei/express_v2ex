const { redisClient: client } = require('../database')
// 操作方法封装 get set expire 过期时间 默认3分钟过期
function setString(key, value, expire=60*3) {
    return new Promise((resolve, reject) => {
      client
        .set(key, value)
        .then((res) => {
          if (expire) {
            client.expire(key, expire);
          }
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  function getString(key) {
    return new Promise((resolve, reject) => {
      if (key) {
        client
          .get(key)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  }

  module.exports = {
    setString,
    getString,
  };