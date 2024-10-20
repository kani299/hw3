import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

function Child2({ data }) {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); 
    const groupedData = d3.groups(data, d => d.day)
      .map(([day, values]) => ({
        day,
        avgTip: d3.mean(values, d => parseFloat(d.tip)), 
      }));

    const width = 500;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 50, left: 50 };

    const x = d3.scaleBand()
      .domain(groupedData.map(d => d.day))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(groupedData, d => d.avgTip)]).nice()
      .range([height - margin.bottom, margin.top]); 

    svg.append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg.append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y));

    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height - 10)
      .attr('text-anchor', 'middle')
      .text('Day');

    svg.append('text')
      .attr('x', -(height / 2))
      .attr('y', 15)
      .attr('text-anchor', 'middle')
      .attr('transform', 'rotate(-90)')
      .text('Avg tip');

    svg.append('g')
      .selectAll('rect')
      .data(groupedData)
      .join('rect')
      .attr('x', d => x(d.day))
      .attr('y', d => y(d.avgTip))
      .attr('width', x.bandwidth())
      .attr('height', d => height - margin.bottom - y(d.avgTip)) 
      .attr('fill', '#69b3a2');

    svg.append('text')
      .attr('x', width / 2)
      .attr('y', margin.top)
      .attr('text-anchor', 'middle')
      .attr('font-size', '16px')
      .text('Avg tips by day');
  }, [data]);

  return <svg ref={svgRef} width={500} height={400}></svg>;
}

export default Child2;
