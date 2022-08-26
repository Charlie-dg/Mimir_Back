import designers from '../models/designers.js'

export const createDesigner = async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      description: req.body.description,
      avatar: req.files?.avatar[0].path || '',
      portfolio: [],
      publish: req.body.publish
    }
    if (req.files.portfolio) {
      for (const i in req.files.portfolio) {
        data.portfolio[i] = req.files.portfolio[i].path
      }
    }
    const result = await designers.create(data)
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      return res.status(400).send({ success: false, message })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤(createDesigner)' })
    }
  }
}

export const deleteDesigner = async (req, res) => {
  try {
    const result = await designers.findByIdAndDelete(req.params.id)
    if (result === null) {
      res.status(404)
      res.send({ success: false, message: '找不到資料' })
    } else {
      res.status(200)
      res.send({ success: true, message: '' })
    }
  } catch (error) {
    // 若 ID 格式不是 mongodb 格式
    if (error.name === 'CastError') {
      res.status(404)
      res.send({ success: false, message: '找不到資料' })
    } else {
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤(deleteDesigner)' })
    }
  }
}

export const updateDesigner = async (req, res) => {
  try {
    if (req.files.portfolio) {
      const data = {
        name: req.body.name,
        description: req.body.description,
        publish: req.body.publish,
        portfolio: []
      }
      if (req.files.avatar) data.avatar = req.files.avatar[0].path
      for (const i in req.files.portfolio) {
        data.portfolio[i] = req.files.portfolio[i].path
      }
      console.log('data: ', data)
      const result = await designers.findByIdAndUpdate(req.params.id, data, { new: true })
      res.status(200).send({ success: true, message: '', result })
      console.log('result: ', result)
    } else {
      const data = {
        name: req.body.name,
        description: req.body.description,
        publish: req.body.publish
      }
      if (req.files.avatar) data.avatar = req.files.avatar[0].path
      console.log('data: ', data)
      const result = await designers.findByIdAndUpdate(req.params.id, data, { new: true })
      res.status(200).send({ success: true, message: '', result })
      console.log('result: ', result)
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      return res.status(400).send({ success: false, message })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤(updateDesigner)' })
    }
  }
}

export const getAllDesigners = async (req, res) => {
  try {
    const result = await designers.find()
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤(getAllDesigners)' })
  }
}

export const getDesigner = async (req, res) => {
  try {
    const result = await designers.findById(req.params.id)
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤(getDesigner)' })
  }
}

export const getDesigners = async (req, res) => {
  try {
    const result = await designers.find({ publish: true })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤(getDesigners)' })
  }
}
