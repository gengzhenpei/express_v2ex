/*
 Navicat Premium Data Transfer

 Source Server         : 本机mysql
 Source Server Type    : MySQL
 Source Server Version : 50740
 Source Host           : localhost:3306
 Source Schema         : my_database

 Target Server Type    : MySQL
 Target Server Version : 50740
 File Encoding         : 65001

 Date: 14/04/2023 12:08:45
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for articles
-- ----------------------------
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '文章主键ID',
  `user_id` int(10) UNSIGNED NOT NULL COMMENT '发布人ID',
  `category_id` int(10) UNSIGNED NOT NULL COMMENT '关联分类ID',
  `title` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '文章标题',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '文章简介',
  `img_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '文章封面图',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '文章内容',
  `seo_keyword` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '文章SEO关键字',
  `status` tinyint(4) NULL DEFAULT 1 COMMENT '文章展示状态：0-隐藏,1-正常',
  `sort_order` int(10) UNSIGNED NULL DEFAULT 1 COMMENT '排序编号',
  `browse` int(10) UNSIGNED NULL DEFAULT 0 COMMENT '文章浏览次数',
  `favorite_num` int(10) UNSIGNED NULL DEFAULT 0 COMMENT '文章点赞次数',
  `created_at` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  INDEX `category_id`(`category_id`) USING BTREE,
  CONSTRAINT `articles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `articles_ibfk_10` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `articles_ibfk_11` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `articles_ibfk_12` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `articles_ibfk_13` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `articles_ibfk_14` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `articles_ibfk_15` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `articles_ibfk_16` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `articles_ibfk_17` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `articles_ibfk_18` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `articles_ibfk_19` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `articles_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `articles_ibfk_20` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `articles_ibfk_21` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `articles_ibfk_22` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `articles_ibfk_23` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `articles_ibfk_24` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `articles_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `articles_ibfk_4` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `articles_ibfk_5` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `articles_ibfk_6` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `articles_ibfk_7` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `articles_ibfk_8` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `articles_ibfk_9` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 32 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of articles
-- ----------------------------
INSERT INTO `articles` VALUES (8, 1, 2, '的方式反复', NULL, NULL, '手动阀舒服舒服是', NULL, 1, 1, 0, 0, '2023-04-03 15:11:09');
INSERT INTO `articles` VALUES (9, 1, 3, '手动阀舒服舒服', NULL, NULL, '鼎折覆餗发发斯蒂芬', NULL, 1, 1, 0, 0, '2023-04-03 15:11:58');
INSERT INTO `articles` VALUES (10, 1, 4, '手动阀舒服舒服', NULL, NULL, '鼎折覆餗发发斯蒂芬', NULL, 1, 1, 0, 0, '2023-04-03 15:12:56');
INSERT INTO `articles` VALUES (11, 1, 5, '懂法守法是否第三方', NULL, NULL, '的说法是发生范德萨范德萨范德萨', NULL, 1, 1, 0, 0, '2023-04-03 15:13:22');
INSERT INTO `articles` VALUES (12, 1, 6, '第三方身份', NULL, NULL, '傻傻的方法', NULL, 1, 1, 0, 0, '2023-04-03 15:14:11');
INSERT INTO `articles` VALUES (13, 1, 18, '的说法是发生范德萨发生', NULL, NULL, '士大夫身份第三方第三方师傅', NULL, 1, 1, 0, 0, '2023-04-05 06:44:07');
INSERT INTO `articles` VALUES (14, 1, 18, '范德萨发放是否', NULL, NULL, '第三方第三方士大夫身份', NULL, 1, 1, 0, 0, '2023-04-05 06:44:23');
INSERT INTO `articles` VALUES (15, 1, 18, '方式是防守打法', NULL, NULL, '水电费水电费水电费', NULL, 1, 1, 0, 0, '2023-04-05 08:06:00');
INSERT INTO `articles` VALUES (16, 1, 18, '发送到发发斯蒂芬斯蒂芬', NULL, NULL, '的说法胜多负少的', NULL, 1, 1, 0, 0, '2023-04-05 08:09:08');
INSERT INTO `articles` VALUES (17, 1, 18, '胜多负少的发大水发斯蒂芬', NULL, NULL, '是东方卫视是', NULL, 1, 1, 0, 0, '2023-04-05 08:09:17');
INSERT INTO `articles` VALUES (18, 1, 18, '上手动阀大声道', NULL, NULL, '水电费发的', NULL, 1, 1, 0, 0, '2023-04-05 08:09:24');
INSERT INTO `articles` VALUES (19, 1, 18, ' 手动阀手动阀', NULL, NULL, '手动阀所发生的发', NULL, 1, 1, 0, 0, '2023-04-05 08:09:30');
INSERT INTO `articles` VALUES (20, 1, 18, '第三方士大夫', NULL, NULL, '打打杀杀发是否', NULL, 1, 1, 0, 0, '2023-04-05 08:09:39');
INSERT INTO `articles` VALUES (21, 1, 18, '佛挡杀佛', NULL, NULL, ' 是的方法', NULL, 1, 1, 0, 0, '2023-04-05 08:10:42');
INSERT INTO `articles` VALUES (22, 1, 18, '第三方士大夫', NULL, NULL, '定时发送打发大水', NULL, 1, 1, 0, 0, '2023-04-05 08:10:49');
INSERT INTO `articles` VALUES (23, 1, 14, '是的法师发送', NULL, NULL, '<p>是的发生飞洒发顺丰</p>', NULL, 1, 1, 0, 0, '2023-04-09 08:03:36');
INSERT INTO `articles` VALUES (24, 1, 1, '发送方师傅撒发送', NULL, NULL, '<p>撒旦法师法师法师的第三方</p>', NULL, 1, 1, 0, 0, '2023-04-09 08:05:01');
INSERT INTO `articles` VALUES (25, 1, 14, '是的发送到发送', NULL, NULL, '<p><strong><em><u>撒旦法法师法师法第三方士大<span class=\"ql-cursor\">﻿</span>夫地方发顺丰到付 鼎折覆餗 房贷是否发生发神鼎飞丹砂是 的方式发生</u></em></strong></p>', NULL, 1, 1, 0, 0, '2023-04-09 08:24:26');
INSERT INTO `articles` VALUES (26, 1, 14, '撒旦法法师法师法', NULL, NULL, '<p>阿斯顿发撒旦法发顺丰都是</p>', NULL, 1, 1, 0, 0, '2023-04-09 08:30:42');
INSERT INTO `articles` VALUES (27, 1, 14, '发顺丰到付是否是', NULL, NULL, '# 第三方舒舒服服\n### 内容\n```\n内容部分\n```', NULL, 1, 1, 0, 0, '2023-04-09 08:47:00');
INSERT INTO `articles` VALUES (28, 1, 14, '房贷是否发生发', NULL, NULL, '<p>撒旦法发顺丰发但是法发顺丰</p>\n', NULL, 1, 1, 0, 0, '2023-04-09 09:12:23');
INSERT INTO `articles` VALUES (29, 1, 14, '的方式方法', NULL, NULL, '<h1><a id=\"_0\"></a>标题</h1>\n<h3><a id=\"_1\"></a>内容</h3>\n<pre><code class=\"lang-\">内容的范德萨发发发\n</code></pre>\n', NULL, 1, 1, 0, 0, '2023-04-09 09:13:17');
INSERT INTO `articles` VALUES (30, 1, 19, 'fdsfsfs ', NULL, NULL, '<p>sdfsdfsffasffss</p>', NULL, 1, 1, 0, 0, '2023-04-14 04:02:18');
INSERT INTO `articles` VALUES (31, 1, 19, '范德萨发顺丰是否', NULL, NULL, '<h1><a id=\"_0\"></a>一级标题</h1>\n<h3><a id=\"_1\"></a>三级标题</h3>\n<pre><code class=\"lang-\">财政部部长刘昆提到，今年要实施“积极的财政政策”，“积极”的表现之一是“在推动财力下沉上加力，进一步增强中央对地方的转移支付，并向困难地区和欠发达地区倾斜”。\n\n根据今年中央财政预算，2023年中央对地方转移支付的预算总数为100625亿元，在去年的基础上又增长了3.6%，还首次突破了10万亿元的关口。\n\n事实上，为缓解地方财政收支矛盾、支持地方减税降费和兜底基层“三保”支出等，中央对地方的转移支付一直在增加。2020年以来，在中央一般公共预算支出中，对地方转移支付的占比一直保持在70%以上。\n\n今年，10万亿元的资金“再分配”，会撒向哪些领域、哪些地区，城叔翻开了中央的“账本”。\n</code></pre>\n', NULL, 1, 1, 0, 0, '2023-04-14 04:03:15');

-- ----------------------------
-- Table structure for categories
-- ----------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '分类主键ID',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '分类名称',
  `name_en` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '分类名称_英文 用做动态路由',
  `status` tinyint(4) NULL DEFAULT 1 COMMENT '类别状态,0-隐藏,1-正常',
  `sort_order` int(10) UNSIGNED NULL DEFAULT 1 COMMENT '排序编号',
  `parent_id` int(10) UNSIGNED NULL DEFAULT 0 COMMENT '父类别id,id=0代表根节点',
  `created_at` datetime NOT NULL DEFAULT '2023-04-12 15:35:43' COMMENT '创建时间',
  `subtitle` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '副标题',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of categories
-- ----------------------------
INSERT INTO `categories` VALUES (1, '技术', '', 1, 1, 0, '2023-04-01 13:27:48', '');
INSERT INTO `categories` VALUES (2, '创意', '', 1, 1, 0, '2023-04-01 13:27:48', '');
INSERT INTO `categories` VALUES (3, '好玩', '', 1, 1, 0, '2023-04-01 13:27:48', '');
INSERT INTO `categories` VALUES (4, 'Apple', '', 1, 1, 0, '2023-04-01 13:27:48', '');
INSERT INTO `categories` VALUES (5, '酷工作', '', 1, 1, 0, '2023-04-01 13:27:48', '');
INSERT INTO `categories` VALUES (6, '交易', '', 1, 1, 0, '2023-04-01 14:04:04', '');
INSERT INTO `categories` VALUES (7, '城市', '', 1, 1, 0, '2023-04-01 14:04:04', '');
INSERT INTO `categories` VALUES (8, '问与答', '', 1, 1, 0, '2023-04-01 14:04:04', '');
INSERT INTO `categories` VALUES (9, '最热', '', 1, 1, 0, '2023-04-01 14:04:04', '');
INSERT INTO `categories` VALUES (10, '全部', '', 1, 1, 0, '2023-04-01 14:04:04', '');
INSERT INTO `categories` VALUES (11, 'R2', '', 1, 1, 0, '2023-04-01 14:04:04', '');
INSERT INTO `categories` VALUES (12, '节点', '', 1, 1, 0, '2023-04-01 14:04:04', '');
INSERT INTO `categories` VALUES (13, '关注', '', 1, 1, 0, '2023-04-01 14:04:04', '');
INSERT INTO `categories` VALUES (14, '程序员', 'programmer', 1, 1, 1, '2023-04-01 14:04:04', '');
INSERT INTO `categories` VALUES (15, 'Python', 'python', 1, 1, 1, '2023-04-01 14:04:04', '');
INSERT INTO `categories` VALUES (16, '分享创造', 'create', 1, 1, 2, '2023-04-01 14:04:04', '');
INSERT INTO `categories` VALUES (17, '分享发现', 'share', 1, 1, 3, '2023-04-01 14:04:04', '');
INSERT INTO `categories` VALUES (18, '酷工作', 'jobs', 1, 1, 5, '2023-04-01 14:04:04', '做有趣的有意义的事情。');
INSERT INTO `categories` VALUES (19, '求职', 'cv', 1, 1, 5, '2023-04-01 14:04:04', '');

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '评论主键ID',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '评论内容',
  `status` tinyint(4) NULL DEFAULT 0 COMMENT '评论状态：0-审核中,1-审核通过,2-审核不通过',
  `article_id` int(10) UNSIGNED NOT NULL COMMENT '关联的评论文章ID',
  `user_id` int(10) UNSIGNED NULL DEFAULT 0 COMMENT '评论用户ID,0-代表匿名回复',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '0' COMMENT '匿名评论时填的邮箱',
  `created_at` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `article_id`(`article_id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  CONSTRAINT `comments_ibfk_10` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_12` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_14` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_16` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_18` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_20` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_22` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_23` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_24` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_4` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_6` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_8` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 32 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of comments
-- ----------------------------
INSERT INTO `comments` VALUES (19, '第三方顺丰到付第三方士大夫', 0, 10, 1, '0', '2023-04-03 15:13:07');
INSERT INTO `comments` VALUES (20, '士大夫身份发送到', 0, 10, 1, '0', '2023-04-03 15:13:11');
INSERT INTO `comments` VALUES (21, '的说法是发生发发斯蒂芬', 0, 11, 1, '0', '2023-04-03 15:13:27');
INSERT INTO `comments` VALUES (22, '的说法是发生方法', 0, 11, 1, '0', '2023-04-03 15:13:31');
INSERT INTO `comments` VALUES (23, '胜多负少方式', 0, 12, 1, '0', '2023-04-03 15:14:14');
INSERT INTO `comments` VALUES (24, '师德师风丰富的非', 0, 9, 1, '0', '2023-04-04 15:49:06');
INSERT INTO `comments` VALUES (25, '地方双宿双飞', 0, 9, 1, '0', '2023-04-04 15:49:12');
INSERT INTO `comments` VALUES (26, '东方闪电方式是发送到发顺丰的方式', 0, 9, 1, '0', '2023-04-04 15:49:16');
INSERT INTO `comments` VALUES (27, '懂法守法是否第三方胜多负少的地方', 0, 9, 1, '0', '2023-04-04 15:49:26');
INSERT INTO `comments` VALUES (28, '的说法是发生飞洒发顺丰所谓的封', 0, 8, 1, '0', '2023-04-04 15:49:46');
INSERT INTO `comments` VALUES (29, '四大分卫大范围的地方', 0, 8, 1, '0', '2023-04-04 15:49:52');
INSERT INTO `comments` VALUES (30, '第三方胜多负少的', 0, 12, 1, '0', '2023-04-04 15:51:09');
INSERT INTO `comments` VALUES (31, '打多少分第三方胜多负少的访问此方法', 0, 8, 1, '0', '2023-04-05 03:46:55');

-- ----------------------------
-- Table structure for posts
-- ----------------------------
DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of posts
-- ----------------------------

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '用户主键',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '登录密码',
  `profile` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'geng', '928022763@qq.com', '$2a$10$VM7OyeY7PvQKUtrnEb89i.prSpXm/shGAjqHNfYB1uerd61V0LTN6', '/public/images/1676947295226.jpg');

SET FOREIGN_KEY_CHECKS = 1;
