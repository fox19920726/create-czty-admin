#!/usr/bin/env node

/**
 * Copyright (c) Jin.
 **/

const { Command } = require('commander')
const chalk = require('chalk')
const packageJson = require('./package.json')
const { create, clear, addList } = require('./src/index')

const { green, red } = chalk

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
  .option('-r, --remove <projectName>', 'remove the exist director')
  .option('-d, --directly <templateName> <projectName>', 'downold the template')
  .option('-ctl --ctl', 'create table list module')
  // .option('-cal --cal', 'create auto list module')
  .description('Example: create-czty-admin admin myProject')
  .action((options) => {
    const { remove, directly, rawArgs, args, ctl, cal } = options
    const [, , index, name] = rawArgs
    inputIndex = index

    if (ctl) {
      addList('ctl')
      console.log(green('success'))
      return
    }

    if (remove) {
      clear(remove)
      return
    }
    if (!args.length) {
      console.log(red('syntax error'))
      program.help()
      return
    }

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

    create(templateName, projectName)
  })

program.parse(process.argv)
