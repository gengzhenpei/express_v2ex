const jwt = require('jsonwebtoken')
const captcha = require("svg-captcha");
/***
 *
 */
const findMembers = function (instance, {
  prefix,
  specifiedType,
  filter
}) {
  // 递归函数
  function _find(instance) {
    //基线条件（跳出递归）
    if (instance.__proto__ === null)
      return []

    let names = Reflect.ownKeys(instance)
    names = names.filter((name) => {
      // 过滤掉不满足条件的属性或方法名
      return _shouldKeep(name)
    })

    return [...names, ..._find(instance.__proto__)]
  }

  function _shouldKeep(value) {
    if (filter) {
      if (filter(value)) {
        return true
      }
    }
    if (prefix)
      if (value.startsWith(prefix))
        return true
    if (specifiedType)
      if (instance[value] instanceof specifiedType)
        return true
  }

  return _find(instance)
}

// 颁布令牌 这里token里用户的id
const generateToken = function (uid, scope) {
  const secretKey = global.config.security.secretKey;
  const expiresIn = global.config.security.expiresIn;
  const token = jwt.sign({
    uid,
    scope
  }, secretKey, {
    expiresIn: expiresIn
  })
  return token
}

//验证码生成
const createCaptcha = function(config = {}) {
  return captcha.create({
    size: 4,
    ignoreChars: "0o1iIl", // 避免生成容易混淆的字符
    noise: 3,
    color: true,
    background: "#f4f4f4",
    fontSize: 60,
    width: 320,
    height: 80,
    ...config,
  });
}


module.exports = {
  findMembers,
  generateToken,
  createCaptcha
}
