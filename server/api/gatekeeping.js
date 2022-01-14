// store all functions that act as middleware between our request and our response
const { models: { User }} = require ('../db')

const requireToken = async (req, res, next) => {
  try {

    const token = req.headers.authorization
    const user = await User.findByToken(token)
    req.user = user
    console.log('requireToken running', user)
    next()
  } catch (error) {
    next(error)
  }
}

const isAdmin = async (req, res, next) => {
  if(!req.user.isAdmin){
    return res.status(403).send('You are not an admin and do not have permission to do this.')
  }
  else {
    next()
  }
}


module.exports = { requireToken, isAdmin }
