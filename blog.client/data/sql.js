select article.*, IFNULL(subtable.subnum, 0) as comment_count from article
left join(select article_id, content, count(1) as subnum from comment group by article_id) subtable
on article.id = subtable.article_id;

//文章评论数量
select A.*, ifnull(AC.count, 0) as comment_count from article A
LEFT JOIN(select article_id, count(1) as count from comment group by article_id) AC
ON A.id = AC.article_id;

//首页-文章列表
SELECT `article`.*, `User`.
`id`
AS `User.id`, `User`.
`name`
AS `User.name`, `User`.
`email`
AS `User.email`, `Category`.
`id`
AS `Category.id`, `Category`.
`name`
AS `Category.name`, `comments`.
`id`
AS `comments.id`, `comments`.
`content`
AS `comments.content`, `comments->User`.
`id`
AS `comments.User.id`, `comments->User`.
`name`
AS `comments.User.name`
FROM(SELECT `article`.
	`id`, `article`.
	`user_id`, `article`.
	`category_id`, `article`.
	`title`, `article`.
	`description`, `article`.
	`img_url`, `article`.
	`content`, `article`.
	`seo_keyword`, `article`.
	`status`, `article`.
	`sort_order`, `article`.
	`browse`, `article`.
	`favorite_num`, `article`.
	`created_at`
	FROM `articles`
	AS `article`
	WHERE `article`.
	`category_id` = 1 ORDER BY `article`.
	`created_at`
	DESC LIMIT 0, 20) AS `article`
LEFT OUTER JOIN `Users`
AS `User`
ON `article`.
`user_id` = `User`.
`id`
LEFT OUTER JOIN `Categories`
AS `Category`
ON `article`.
`category_id` = `Category`.
`id`
LEFT OUTER JOIN `comments`
AS `comments`
ON `article`.
`id` = `comments`.
`article_id`
LEFT OUTER JOIN `Users`
AS `comments->User`
ON `comments`.
`user_id` = `comments->User`.
`id`
ORDER BY `article`.
`created_at`
DESC;

//获取文章的评论
SELECT `comment`.
`id`, `comment`.
`content`, `comment`.
`status`, `comment`.
`article_id`, `comment`.
`user_id`, `comment`.
`email`, `comment`.
`created_at`, `article`.
`id`
AS `article.id`, `article`.
`title`
AS `article.title`, `User`.
`id`
AS `User.id`, `User`.
`name`
AS `User.name`
FROM `comments`
AS `comment`
LEFT OUTER JOIN `articles`
AS `article`
ON `comment`.
`article_id` = `article`.
`id`
LEFT OUTER JOIN `Users`
AS `User`
ON `comment`.
`user_id` = `User`.
`id`
WHERE `comment`.
`article_id` = '5';

文章分页

SELECT `article`.*, `User`.
`id`
AS `User.id`, `User`.
`name`
AS `User.name`, `User`.
`email`
AS `User.email`, `Category`.
`id`
AS `Category.id`, `Category`.
`name`
AS `Category.name`, `comments`.
`id`
AS `comments.id`, `comments`.
`content`
AS `comments.content`, `comments->User`.
`id`
AS `comments.User.id`, `comments->User`.
`name`
AS `comments.User.name`
FROM(SELECT `article`.
	`id`, `article`.
	`user_id`, `article`.
	`category_id`, `article`.
	`title`, `article`.
	`description`, `article`.
	`img_url`, `article`.
	`content`, `article`.
	`seo_keyword`, `article`.
	`status`, `article`.
	`sort_order`, `article`.
	`browse`, `article`.
	`favorite_num`, `article`.
	`created_at`
	FROM `articles`
	AS `article`
	WHERE `article`.
	`category_id` = ''
	ORDER BY `article`.
	`created_at`
	DESC LIMIT 0, 20) AS `article`
LEFT OUTER JOIN `Users`
AS `User`
ON `article`.
`user_id` = `User`.
`id`
LEFT OUTER JOIN `Categories`
AS `Category`
ON `article`.
`category_id` = `Category`.
`id`
LEFT OUTER JOIN `comments`
AS `comments`
ON `article`.
`id` = `comments`.
`article_id`
LEFT OUTER JOIN `Users`
AS `comments->User`
ON `comments`.
`user_id` = `comments->User`.
`id`
ORDER BY `article`.
`created_at`
DESC;