/**
 * 基于D3.js开发的流程图设计器
 * 作者：huanglicong
 * 时间：2016年6月7日
 */
 var select = "select";
 var showMessage = function(msg){
 	alert(msg);
 };
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
	var nodes = new Array();

	// 拖动效果
	function dragmove(){
		var obj = d3.select(this);
		var selecter = d3.select(this);
		var type = selecter.attr("type");
		if(type == 'begin' || type == "end"){
			selecter.attr("cx", d3.event.x).attr("cy", d3.event.y);
		}else if(type == 'process'){
			selecter.selectAll("rect").each(function(){
				d3.select(this).attr('x', d3.event.x - 70)
					.attr('y', d3.event.y - 30);
			});
			selecter.selectAll("text").each(function(){
				var text = d3.select(this);
				var textLength = text.text().length * 12;
				text.attr('x', d3.event.x - textLength/2)
					.attr('y', d3.event.y + 5);
			});
		}else if(type == 'condition'){
			selecter.selectAll("polygon").each(function(){
				var points = "";
					points += (d3.event.x-80)+","+d3.event.y+" ";
					points += (d3.event.x)+","+(d3.event.y-30)+" ";
					points += (d3.event.x+80)+","+d3.event.y+" ";
					points += (d3.event.x)+","+(d3.event.y+30);
				d3.select(this).attr('points', points);
			});
			selecter.selectAll("text").each(function(){
				var text = d3.select(this);
				var textLength = text.text().length * 12;
				text.attr('x', d3.event.x - textLength/2)
					.attr('y', d3.event.y + 5);
			});
		}
	};
	var drag = d3.behavior.drag().on("drag", dragmove);

	// 绘制流程
	var index = 0;
	function drawBegin(node){
		svg.append('circle')
			.attr('id', node.id)
			.attr('type', node.type)
			.attr('cx', node.x)
			.attr('cy', node.y)
			.attr('r', 20)
			.attr('fill', "#afde89")
			.attr('stroke', "#88c02a")
			.attr('stroke-width', 2)
			.attr('cursor', 'move')
			.call(drag);
	};
	function drawEnd(node){
		svg.append('circle')
			.attr('id', node.id)
			.attr('type', node.type)
			.attr('cx', node.x)
			.attr('cy', node.y)
			.attr('r', 15)
			.attr('fill', "#000")
			.attr('stroke', "#636363")
			.attr('stroke-width', 10)
			.attr('cursor', 'move')
			.call(drag);
	};
	function drawProcess(node){

		var textLength = node.text.length * 12;
		var g = svg.append('g')
			.attr('id', node.id)
			.attr('type', node.type)
			.attr('cursor', 'move')
			.call(drag);
		g.append('rect')
			.attr('x', node.x - 70)
			.attr('y', node.y - 30)
			.attr('width', 140)
			.attr('height', 60)
			.attr('rx', 8)
			.attr('ry', 8)
			.attr('fill', "#89dedb")
			.attr('stroke', "#25b8c2")
			.attr('stroke-width', 2);
		g.append('text')
			.attr('x', node.x - textLength/2)
			.attr('y', node.y + 5)
			.text("处理");
	};
	function drawCondition(node){

		var points = "";
			points += (node.x-80)+","+node.y+" ";
			points += (node.x)+","+(node.y-30)+" ";
			points += (node.x+80)+","+node.y+" ";
			points += (node.x)+","+(node.y+30);

		var textLength = node.text.length * 12;
		var g = svg.append('g')
			.attr('id', node.id)
			.attr('type', node.type)
			.attr('cursor', 'move')
			.call(drag);
		g.append('polygon')
			.attr('points', points)
			.attr('fill', "#fd8d3c")
			.attr('stroke', "#e6550d")
			.attr('stroke-width', 2);
		g.append('text')
			.attr('x', node.x - textLength/2)
			.attr('y', node.y + 5)
			.text("条件");
	};
	function drawFlow(){
		for(var i in nodes){
			if(document.getElementById(nodes[i].id)){
				continue;
			}
			if(nodes[i].type == "begin"){
				drawBegin(nodes[i]);
			}else if(nodes[i].type == "end"){
				drawEnd(nodes[i]);
			}else if(nodes[i].type == "process"){
				nodes[i].text = "处理";
				drawProcess(nodes[i]);
			}else if(nodes[i].type == "condition"){
				nodes[i].text = "条件";
				drawCondition(nodes[i]);
			}
		}
	};
	function addNode(node){

		var existsBegin = false;
		for(var i in nodes){
			if(nodes[i].type == 'begin'){
				existsBegin = true;
				break;
			}
		}
		if(node.type == 'begin'){
			if(existsBegin){
				showMessage("已存在开始节点，不能重复添加");
				return;
			}
		}else{
			if(!existsBegin){
				showMessage("不存在开始节点， 请先添加开始节点");
				return;
			}
		}
		node.id = "N"+index;
		index++;
		nodes.push(node);
		drawFlow();
		select = "select";
	};

	// 绑定事件
	function mousedown(){
		if(!select){
			return;
		}
		if(select == "select"){
			return;
		}

		// 添加节点
		svg.classed('active', true);
		var point = d3.mouse(this);
		addNode({
			type: select,
			x: point[0],
			y: point[1]
		});
	};
	function mousemove(){

	};
	function mouseup(){

	};
	svg.on('mousedown', mousedown).on('mousemove', mousemove).on('mouseup', mouseup);
});