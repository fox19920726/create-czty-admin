const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const utils = require('./utils')

const { red, green, blackBright } = chalk.red

const { currentPath, downloadByGit } = utils
let tempName = ''
let projectName = ''
// const defaultName = 'aaa'
// const rootPath = path.resolve(__dirname, '../')

// 移动文件
async function removeFile(oldPath, newPath) {
  try {
    await fs.move(`${currentPath}/${oldPath}`, `${currentPath}/${newPath}`)
    console.log('success!')
  } catch (err) {
    console.error(red(err))
  }
}

// 创建文件夹
async function createFolder() {
  try {
    await fs.mkdir(`${currentPath}src/views/demo`)
    console.log('success!')
  } catch (err) {
    console.error(red(err))
  }
}

// 重写package.json
async function rewriteJson() {
  try {
    const jsonPath = currentPath + projectName + '/package.json'
    const isExist = await fs.pathExists(jsonPath)
    if (!isExist) {
      return
    }
    const json = await fs.readJson(jsonPath)
    json.name = projectName
    json.description = `this project is based on ${tempName}`
    await fs.writeJson(jsonPath, json, { spaces: '\t' })
    console.log(green('format package.json success!'))
  } catch (err) {
    console.error(red(err))
  }
}

// 删除不相关的文件
async function unrelatedFileRemove(parentFile, callback) {
  try {
    await fs.remove(parentFile + '/.git')
    await fs.remove(parentFile + '/package-lock.json')
    callback && callback()
    rewriteJson()
    console.log(green('remove unrelated file success!'))
  } catch (err) {
    console.error(red(err))
  }
}

// 重命名gitClone下来的文件为项目文件名
async function renameFile() {
  const oldPath = currentPath + tempName
  const nowPath = currentPath + projectName
  try {
    await fs.rename(oldPath, nowPath)
    unrelatedFileRemove(nowPath)
  } catch (error) {
    console.error(red(error))
  }
}

async function create(temp, project) {
  tempName = temp
  projectName = project
  const file = currentPath + projectName
  try {
    // 检测项目文件夹是否已存在， 若存在，判断命令类型，-f就删除后重新下载，否则单纯文字提示
    const res = await fs.pathExists(file)
    if (res) {
      console.log(chalk.red('Error, In this directory, the project name already exsits !'))
      return
    }
    // 若不存在，直接从git下载
    downloadByGit(renameFile, tempName)
  } catch (err) {
    console.error(red(err))
  }
}

async function clear(projectName) {
  const file = currentPath + projectName
  try {
    // 检测项目文件夹是否已存在， 若存在，判断命令类型，-f就删除后重新下载，否则单纯文字提示
    const res = await fs.pathExists(file)
    if (res) {
      console.log(blackBright('remove the exist directory...'))
      await fs.remove(file)
      console.log(green('remove the exist directory success'))
      return 
    } 
    console.log(green('In this directory, the project name does not exsit !'))
  } catch (err) {
    console.error(red(err))
  }
}

async function addList(type) {
  // 先清除目录
  await clear('aaa')
  tempName = 'czty-admin'
  projectName = 'aaa'
  try {
    // 再重新下载
    downloadByGit(renameFile, 'czty-admin')
    // 下载完毕后，在项目目录view目录下新建demo目录，并且把vue文件放进去，再到api目录把api-demo.js放进去
    await createFolder()
    await removeFile('aaa/src/views/topo/topo.vue', 'src/views/demo/topo.vue')
    await removeFile('aaa/src/api/api.js', 'src/api/demo/api.js')
    console.log(green('Add the module success'))
    clear('aaa')
  } catch (err) {
    console.error(red(err))
  }
}

module.exports = { create, clear, addList }