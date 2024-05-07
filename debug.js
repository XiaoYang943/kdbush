import KDBush from './index.js';

// 源数据
const points = [
    [2, 3], [5, 4], [7, 2], [8, 1], [4, 7], [9, 6]];

function makeIndex() {
    const index = new KDBush(points.length, 10);
    for (const [x, y] of points) index.add(x, y);
    return index.finish();
}
const index = makeIndex();
console.log(index);
console.log(index.range(5, 5, 10, 10)); // 矩形范围查询
console.log(index.within(5, 5, 1));    // 缓冲区查询
