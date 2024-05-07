## KDBush

- 基于flat KD-tree实现的一个针对2d点的静态空间索引
- [RBush](https://github.com/mourner/rbush)

### 如何实现
- 索引是存储在单个数组缓冲区(array buffer)内,因此，您可以在线程之间[传输](https://developer.mozilla.org/en-US/docs/Glossary/Transferable_objects)它,或将其存储为紧凑文件
### 特点
- 目标是点：索引对象只能是点
  - 如果需要rectangles的静态索引，而不仅仅是点的，需要[Flatbush](https://github.com/mourner/flatbush)，在索引点时，KDBush 的优点是占用的内存比 Flatbush 少 ~2 倍
- 静态：在建立索引之后不能添加或删除元素
- 快速：索引和查询，内存占用更少


[![Build Status](https://github.com/mourner/kdbush/workflows/Node/badge.svg?branch=master)](https://github.com/mourner/kdbush/actions)
[![Simply Awesome](https://img.shields.io/badge/simply-awesome-brightgreen.svg)](https://github.com/mourner/projects)

## Usage

```js
// 初始化1000个点的 KDBush 索引
const index = new KDBush(1000);

// 填充 1000 个点
for (const {x, y} of items) {
    index.add(x, y);
}

// 执行索引
index.finish();

// 执行bbox查询
const foundIds = index.range(minX, minY, maxX, maxY);

// 将 ID 映射到原始数据
const foundItems = foundIds.map(i => items[i]);

// 执行半径查询
const neighborIds = index.within(x, y, 5);

// 立即将索引从worker传输到主线程
postMessage(index.data, [index.data]);

// 从原始数组缓冲区重建索引
const index = KDBush.from(e.data);
```

## Install

Install with NPM: `npm install kdbush`, then import as a module:

```js
import KDBush from 'kdbush';
```

Or use as a module directly in the browser with [jsDelivr](https://www.jsdelivr.com/esm):

```html
<script type="module">
    import KDBush from 'https://cdn.jsdelivr.net/npm/kdbush/+esm';
</script>
```

Alternatively, there's a browser bundle with a `KDBush` global variable:

```html
<script src="https://cdn.jsdelivr.net/npm/kdbush"></script>
```

## API
### Properties
- `data`: array buffer that holds the index.
- `numItems`: number of stored items.
- `nodeSize`: number of items in a KD-tree node.
- `ArrayType`: array type used for internal coordinates storage.
- `IndexArrayType`: array type used for internal item indices storage.
