import KDBush from './index.js';
import * as turf from '@turf/turf';

// 初始为空的源数据数组
let points = [];

// 函数用于在给定范围内随机生成指定数量的点坐标
function generateRandomPoints(minX, minY, maxX, maxY, count) {
    points = []; // 清空之前的点
    for (let i = 0; i < count; i++) {
        const x = Math.random() * (maxX - minX) + minX; // 生成随机x坐标
        const y = Math.random() * (maxY - minY) + minY; // 生成随机y坐标
        points.push([x, y]); // 将点添加到数组中
    }
}


generateRandomPoints(0, 0, 1000, 1000, 10000000);

function makeIndex() {
    const index = new KDBush(points.length);
    for (const [x, y] of points) index.add(x, y);
    return index.finish();
}



const makeIndexStartTime = new Date();
const index = makeIndex();
const makeIndexEndTime = new Date();
console.log(` ${points.length / 10000} 万个点,构建kd-index ${makeIndexEndTime - makeIndexStartTime} 毫秒`);

const rangeSearchStartTime = new Date();
const range = index.range(0, 0, 100, 100); // 矩形范围查询
const rangeSearchEndTime = new Date();
console.log(` ${points.length / 10000} 万个点,kd-index,矩形范围查询 ${rangeSearchEndTime - rangeSearchStartTime} 毫秒,查询结果数量 ${range.length}`);

const withinSearchStartTime = new Date();
const within = index.within(50, 50, 50);    // 缓冲区查询
const withinSearchEndTime = new Date();
console.log(` ${points.length / 10000} 万个点,kd-index,缓冲区查询 ${withinSearchEndTime - withinSearchStartTime} 毫秒,查询结果数量 ${within.length}`);


const searchWithin = turf.polygon([[
    [0, 0],
    [100, 0],
    [100, 100],
    [0, 100],
    [0, 0],
]]);
const pointsWithinPolygonStartTime = new Date();
const ptsWithin = turf.pointsWithinPolygon(turf.points(points), searchWithin);
const pointsWithinPolygonEndTime = new Date();
console.log(` ${points.length / 10000} 万个点,turf,矩形范围查询 ${pointsWithinPolygonEndTime - pointsWithinPolygonStartTime} 毫秒,查询结果数量 ${ptsWithin.features.length}`);


/**
 * 虽然构建索引较慢，但是优点是只需要构建一次，在源数据没有改变的情况下，可以执行任意次数的快速查询。而不构建索引，则需要每次都执行较慢查询
 *
 * 总结：
 * 是否构建KD-Tree索引，取决于如下因素
 * 1. 源数据是否频繁改变
 * 2. 查询次数是否频繁
 *
 * 可以在源数据改变后更新其索引
 */