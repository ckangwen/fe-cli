#! /usr/bin/env node
const commander = require('commander')
const { red } = require('chalk')
// const log = require('tracer').colorConsole()
const version = require('../package.json').version

commander.version(version)
  .option('-c, --components', 'pull component')
  .option('-p, --pages', 'pull page')
  .option('-t, --templates', 'pull template')
  .option('-o, --output', 'file export path')
commander
  .command('pull <name> [options]')
  .description('添加组件 -c 添加页面 -p')
  .action((name, output) => {
    let category = ['components', 'templates', 'pages'].filter(item => {
      return !!(commander[item])
    })
    if (category.length > 1) {
      console.log(red('只能选择component, template, page中的一个'))
      return
    }
    require('../command/pull')(category[0], name, output)
  })

commander
  .command('ui')
  .description('打开UI界面')
  .action(args => {
    require('../command/ui')()
  })

commander.parse(process.argv)
