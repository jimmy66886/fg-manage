fg-manage

**有食做后台管理系统**

主要功能：

1. 用户管理
   - 禁用/启用用户
2. 分类管理
   - 大类以及分类的增删改查
3. 菜谱管理
   - 新增菜谱数量
4. 轮播图管理
   - 首页轮播图修改

---

**先把基本环境搭建起来**

1. 封装axios接口

---

启用禁用用户的要修改数据库，加上一个状态的字段，

0表示禁用

1表示启用

---

分类管理的话,应该包括哪些内容?

有必要新建一张表,之前的category表是用于记录菜谱的分类的,其中有一个大类id,把它删掉,然后从新建一张表,专门用于展示分类

---

菜谱管理应该包含哪些功能呢?

1. 搜索菜谱列表
   - 根据分类名,标题分页查询
2. 修改菜谱可见状态

---

首页概览内容:

1. ~~用户数量概览~~
2. ~~菜谱数量~~概览
3. ~~查看当天点赞最多的菜谱~~
4. ~~查看当天收藏最多的菜谱~~
5. ~~查看今日新增菜谱数~~
6. ~~查看今日新增评论数~~
7. ~~查看点赞数量前十~~
8. ~~查看收藏数量前十~~
