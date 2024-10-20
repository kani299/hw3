import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

function Child1({ data }) {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();  


    const width = 500;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 50, left: 50 };

    const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => parseFloat(d.total_bill))])
      .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => parseFloat(d.tip))])
      .range([height - margin.bottom, margin.top]);

    const xAxis = svg.append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    const yAxis = svg.append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y));

      svg.append('text')
      .attr('x', -height / 2)
      .attr('y', 15)
      .attr('text-anchor', 'middle')
      .attr('transform', 'rotate(-90)')
      .text('Tip');

    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height - 10)
      .attr('text-anchor', 'middle')
      .text('Bill');


    svg.append('g')
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr('cx', d => x(parseFloat(d.total_bill)))
      .attr('cy', d => y(parseFloat(d.tip)))
      .attr('r', 7)
      .attr('fill', '#69b3a2');


    svg.append('text')
      .attr('x', width / 2)
      .attr('y', margin.top)
      .attr('text-anchor', 'middle')
      .attr('font-size', '16px')
      .text('Bill vs Tips');
  }, [data]);

  return <svg ref={svgRef} width={500} height={500}></svg>;
}

export default Child1;
