## create-czty-admin ##

简易脚手架，一键创建项目，node版本要求为8

## 操作指南 ##

安装方式：

npm install create-czty-admin -g  

## 初始化一个后台管理系统 ##

create-czty-admin [options] 

options类型有：

-v, --version                                output the version number
-r, --remove <projectName>                   remove the exist director
-d, --directly <templateName> <projectName>  downold the template
-ctl, --ctl                                  create table list


templateType(模板类型)，有以下模板可选：  

 - admin（可用）(通用管理后台)
 - topo （可用）（包含拓扑组件的通用管理后台）
 - h5 (可用)


## 例如 ##

 projectName(项目名称)，基于当前命令执行路径，并将模板拷贝到这个项目文件夹下
 
 例如：create-czty-admin admin myProject

