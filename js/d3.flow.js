/**
 * 基于D3.js开发的流程图设计器
 * 作者：huanglicong
 * 时间：2016年6月7日
 */
$(function(){

var width = $("#canvas").width();
var height = $("#canvas").height();
var colors = d3.scale.category10();

var svg = d3.select('#canvas')
  .append('svg')
  .attr('oncontextmenu', 'return false;')
  .attr('width', width)
  .attr('height', height);

// 定义箭头
svg.append('svg:defs').append('svg:marker')
    .attr('id', 'end-arrow')
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 6)
    .attr('markerWidth', 3)
    .attr('markerHeight', 3)
    .attr('orient', 'auto')
  .append('svg:path')
    .attr('d', 'M0,-5L10,0L0,5')
    .attr('fill', '#000');

svg.append('svg:defs').append('svg:marker')
    .attr('id', 'start-arrow')
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 4)
    .attr('markerWidth', 3)
    .attr('markerHeight', 3)
    .attr('orient', 'auto')
  .append('svg:path')
    .attr('d', 'M10,-5L0,0L10,5')
    .attr('fill', '#000');

// 数据节点
var nodes = [
  {
    "type": "begin",
    "x": 121,
    "y": 151,
    "id": 0
  },
  {
    "type": "process",
    "x": 232,
    "y": 149,
    "id": 1,
    "text": "处理"
  },
  {
    "type": "process",
    "x": 549,
    "y": 138,
    "id": 2,
    "text": "处理"
  },
  {
    "type": "condition",
    "x": 791,
    "y": 138,
    "id": 3,
    "text": "条件"
  },
  {
    "type": "process",
    "x": 770,
    "y": 284,
    "id": 4,
    "text": "处理"
  },
  {
    "type": "process",
    "x": 1009,
    "y": 155,
    "id": 5,
    "text": "处理"
  },
  {
    "type": "end",
    "x": 1002,
    "y": 283,
    "id": 6
  },
  {
    "type": "flow",
    "x": 1209,
    "y": 137,
    "id": 7
  },
  {
    "type": "end",
    "x": 1169,
    "y": 152,
    "id": 8
  },
  {
    "type": "process",
    "x": 777,
    "y": 31,
    "id": 9,
    "text": "处理"
  },
  {
    "type": "end",
    "x": 1015,
    "y": 43,
    "id": 10
  }
];

// 流程元素
var elements = svg.append('svg:g')
  .selectAll("g")
	.data(nodes)
	.enter()
  .append("svg:g")
  	.attr("id", function(d){ return d.id; })
  	.attr("type", function(d){ return d.type; })
  	.attr('transform', function(d) {
		return 'translate(' + d.x + ',' + d.y + ')';
	});

// 开始元素
var begins = elements.filter(function(d, i){ return d.type == "begin" ? this : null; });
begins.append('svg:circle')
	.attr('class', 'begin')
	.attr('r', 20)
	.style('fill', function(d) { return colors(d.id); })
	.style('stroke', function(d) { return d3.rgb(colors(d.id)).darker().toString(); })
	.classed('reflexive', function(d) { return d.reflexive; });

var processes = elements.filter(function(d, i){ return d.type == "process" ? this : null; });
processes.append('rect')
	.attr('class', 'begin')
	.attr('width', 140)
	.attr('height', 60)
	.attr('rx', 8)
	.attr('ry', 8)
	.style('fill', function(d) { return colors(d.id); })
	.style('stroke', function(d) { return d3.rgb(colors(d.id)).darker().toString(); })
	.classed('reflexive', function(d) { return d.reflexive; });
// begins.append('svg:text')
//       .attr('x', 0)
//       .attr('y', 4)
//       .attr('class', 'id')
//       .text(function(d) { return d.id; });
});