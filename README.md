## create-czty-admin ##
简易脚手架，一键创建项目，node版本要求为8

## 操作指南 ##
npm install create-czty-admin -g  

create-czty-admin [options] ***templateType*** ***projectName***

templateType(模板类型)，有以下模板可选：  

 - admin（可用）(通用管理后台)
 - topo （可用）（包含拓扑组件的通用管理后台）
 - h5 (可用)

 projectName(项目名称)，基于当前命令执行路径，并将模板拷贝到这个项目文件夹下
 
 例如：create-czty-admin admin projectName

 options(可选参数)：
  - -f: 强制删除当前命令执行路径下已存在的projectName文件夹；
  - -h：帮助，commander原生提供

