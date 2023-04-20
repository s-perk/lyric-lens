import Plot from 'react-plotly.js';

function ScatterPlot ({plotData}) {
  // const data = [{ x: [1, 2, 3], y: [4, 5, 6], type: 'scatter' }];
  const layout = { title: 'My Plot' };
  return (
    <Plot
      data={plotData}
      layout={layout}
      config={{ displayModeBar: false }}
      style={{ width: '100%', height: '100%' }}
    />
  );
}

export default ScatterPlot
