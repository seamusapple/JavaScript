// DOM 的最小组成单位叫做节点（node）。文档的树形结构（DOM 树），
// 就是由各种不同类型的节点组成。每个节点可以看作是文档树的一片叶子。

// 节点的类型有七种
/*
Document：整个文档树的顶层节点
DocumentType：doctype标签（比如<!DOCTYPE html>）
Element：网页的各种HTML标签（比如<body>、<a>等）
Attr：网页元素的属性（比如class="right"）
Text：标签之间或标签包含的文本
Comment：注释
DocumentFragment：文档的片段
*/

// 文档的第一层有两个节点，第一个是文档类型节点（<!doctype html>），第二个是 HTML 网页的顶层容器标签<html>。
// 后者构成了树结构的根节点（root node），其他 HTML 标签节点都是它的下级节点。

// 除了根节点，其他节点都有三种层级关系。
/*
父节点关系（parentNode）：直接的那个上级节点
子节点关系（childNodes）：直接的下级节点
同级节点关系（sibling）：拥有同一个父节点的节点
*/
