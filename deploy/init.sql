SET NAMES utf8mb4;

CREATE DATABASE IF NOT EXISTS `demo`;
USE `demo`;

DROP TABLE IF EXISTS `demo_dict`;
CREATE TABLE `demo_dict` (
	`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
	`parent` VARCHAR(32) NOT NULL DEFAULT 'ROOT' COMMENT '父级编码',
	`code` VARCHAR(32) NOT NULL COMMENT '编码',
	`name_cn` VARCHAR(64) NOT NULL COMMENT '中文描述',
	`name_en` VARCHAR(64) NOT NULL COMMENT '英文描述',
	`create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
	`update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
	PRIMARY KEY (`id`),
	UNIQUE `uk_parent_code` (`parent`, `code`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT '字典表';

DROP TABLE IF EXISTS `demo_config`;
CREATE TABLE `demo_config` (
	`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
	`code` VARCHAR(32) NOT NULL COMMENT '配置代码',
	`config` VARCHAR(3000) NOT NULL COMMENT '配置',
	`create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
	`update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
	PRIMARY KEY (`id`),
	UNIQUE `uk_code` (`code`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT '配置表';

DROP TABLE IF EXISTS `demo_menu`;
CREATE TABLE `demo_menu` (
	`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
	`pid` INT(10) UNSIGNED COMMENT '上级菜单',
	`name` VARCHAR(20) NOT NULL COMMENT '菜单名',
	`path` VARCHAR(64) COMMENT '路径',
	`icon` VARCHAR(64) COMMENT '图标',
	`create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
	`update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
	PRIMARY KEY (`id`)
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT '用户信息表';

DROP TABLE IF EXISTS `demo_user`;
CREATE TABLE `demo_user` (
	`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
	`user_id` VARCHAR(64) NOT NULL COMMENT 'userId',
	`name` VARCHAR(64) COMMENT '名称',
	`alias` VARCHAR(32) COMMENT '别名',
	`mobile` VARCHAR(20) NOT NULL COMMENT '手机号',
	`email` VARCHAR(64) COMMENT '邮箱',
	`avatar` VARCHAR(255) COMMENT '头像',
	`role` VARCHAR(64) COMMENT '角色',
	`status` TINYINT(2) NOT NULL DEFAULT 0 COMMENT '用户状态(0无状态 1已激活 2已禁用 4未激活 5已删除)',
	`create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
	`update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
	PRIMARY KEY (`id`),
	UNIQUE `uk_user_id` (`user_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT '用户信息表';

INSERT INTO `demo_user` (`user_id`,`name`,`alias`,`mobile`,`status`) VALUES ("admin", "admin", "admin", "13000000000", 1);

INSERT INTO `demo_dict` (`code`,`name_cn`,`name_en`) VALUES ("gender", "性别", "Gender");
INSERT INTO `demo_dict` (`parent`,`code`,`name_cn`,`name_en`) VALUES ("gender", "male", "男", "Male");
INSERT INTO `demo_dict` (`parent`,`code`,`name_cn`,`name_en`) VALUES ("gender", "female", "女", "Female");
INSERT INTO `demo_dict` (`code`,`name_cn`,`name_en`) VALUES ("userStatus", "用户状态", "User Status");
INSERT INTO `demo_dict` (`parent`,`code`,`name_cn`,`name_en`) VALUES ("userStatus", "0", "无状态", "Active");
INSERT INTO `demo_dict` (`parent`,`code`,`name_cn`,`name_en`) VALUES ("userStatus", "1", "已激活", "Active");
INSERT INTO `demo_dict` (`parent`,`code`,`name_cn`,`name_en`) VALUES ("userStatus", "2", "已禁用", "Disable");
INSERT INTO `demo_dict` (`parent`,`code`,`name_cn`,`name_en`) VALUES ("userStatus", "4", "未激活", "Inactive");
INSERT INTO `demo_dict` (`parent`,`code`,`name_cn`,`name_en`) VALUES ("userStatus", "5", "已删除", "Dismiss");

