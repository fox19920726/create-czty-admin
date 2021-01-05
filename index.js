#!/usr/bin/env node

/**
 * Copyright (c) Jin.
 **/

const { Command } = require('commander')
const chalk = require('chalk')
const packageJson = require('./package.json')
const excute = require('./src/index')

// 四种模板。对应git仓库四个仓库地址
const tempIndex = {
  react: 'reactTemplate', // react 模板
  admin: 'czty-admin', // vue 模板
  topo: 'czty-admin-topo-component', // topo组件模版
  h5: 'czty-h5', // h5模板
}

let projectName = ''
let templateName = ''
let inputIndex = ''
const program = new Command()

program
  .version(`v${packageJson.version}`, '-v, --version')

program  
  .option('-d, --delete [projectName]', 'delete the exist director')

program  
  // .option('-d, --directly [templateName, projectName]', 'copy the not specified template')
  .description('create-czty-admin admin myProject')
  .action((options) => {
    const [index, name] = options.args

    inputIndex = index
    // 允许目标项目名和要复制的模板类型名顺序颠倒
    if (tempIndex[index] || tempIndex[name]) {
      if (tempIndex[index]) {
        templateName = tempIndex[index]
        projectName = name
      } else {
        templateName = tempIndex[name]
        projectName = index
      }
    }
    if (program.directly) {
      templateName = index
    }
  })

program
  .option('-ctl --createTableList', '22')
  .option('-cal --createAutoList', '33')

program.parse(process.argv)

const [, , type] = program.rawArgs
const notType = type !== '-ctl' &&  type !== '-cal' 

console.log('3222:', program)

if (notType) {
  if (program.args.length === 0) {
    console.log(chalk.red('syntax error'))
    program.help()
  }
  if (templateName) {
    excute(templateName, projectName, program.force)
    return
  }
  console.log(`the template ${inputIndex} you want download do not exist`)
}

