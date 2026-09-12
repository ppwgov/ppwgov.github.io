/**
 * 文章数据文件
 * 维护说明：
 *   - slug：唯一标识，用于加载 posts/{slug}.md
 *   - url：文章列表页点击后跳转的地址
 *   - 新增文章时，在此添加一条，并在 posts/ 目录创建对应的 {slug}.md
 */
const ARTICLES_DATA = [
    { slug: "wmh1", title: "亡冥灰教你不吃亏 1", subtitle: "本文探讨了“吃亏”这一话题，以及若干扯平吃亏、反败为胜的技巧。", tags: ["亡冥灰", "数学"], date: "2026-08-15", url: "/article/post.html?id=wmh1" },
];
