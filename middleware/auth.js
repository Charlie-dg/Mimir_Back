import passport from 'passport'
import jsonwebtoken from 'jsonwebtoken'

export const login = (req, res, next) => {
  passport.authenticate('login', { session: false }, (err, user, info) => {
    // console.log(err)
    // console.log(user)
    // console.log(req.body)
    if (err || !user) {
      if (info.message === 'Missing credentials') info.message = '驗證錯誤(login)'
      return res.status(401).send({ success: false, message: info.message })
    }
    req.user = user
    next()
  })(req, res, next)
}

export const jwt = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, data, info) => {
    if (err || !data) {
      if (info instanceof jsonwebtoken.JsonWebTokenError) {
        return res.status(401).send({ success: false, message: '驗證錯誤(jwt)' })
      } else {
        console.log('err: ', err)
        console.log('data: ', data)
        console.log('req.token: ', req.token)
        return res.status(401).send({ success: false, message: info.message })
      }
    }
    // console.log('jwt data.user: ', data.user)
    req.user = data.user
    req.token = data.token
    next()
  })(req, res, next)
}
